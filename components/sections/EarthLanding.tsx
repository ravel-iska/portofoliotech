"use client";

import { useState, useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobal } from "@/components/core/GlobalProvider";

export default function EarthLanding({ onUnlock }: { onUnlock: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const phiRef = useRef(1.0); // Start slightly offset so they have to spin
    const thetaRef = useRef(0.2); // Look slightly down

    const [isAligned, setIsAligned] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener("resize", onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: phiRef.current,
            theta: thetaRef.current,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.05, 0.08, 0.15],
            markerColor: [0.1, 1, 0.5], // Glow green
            glowColor: [0, 0.5, 1], // Blue atmospheric glow
            markers: [
                // Indonesia Map Marker (-0.789275, 113.921327)
                { location: [-0.7893, 113.9213], size: 0.15 }
            ],
            onRender: (state: any) => {
                // If not interacting, VERY slowly auto-rotate so user knows it's interactive
                if (pointerInteracting.current === null) {
                    phiRef.current += 0.001;
                }

                state.phi = phiRef.current + pointerInteractionMovement.current;
                state.theta = thetaRef.current;
                state.width = width * 2;
                state.height = width * 2;

                // Check Alignment with Indonesia
                // In Cobe, a phi of ~ -2.0 or ~4.2 usually points towards Asia/Indonesia 
                // Let's normalize current phi
                const currentPhi = state.phi % (Math.PI * 2);
                let normalizedPhi = currentPhi < 0 ? currentPhi + (Math.PI * 2) : currentPhi;

                // We will use a generous window [3.5, 4.4] -> Actually we'll give a wide window 
                // and rely more on the user discovering the glowing dot.
                const isNearIndonesia = normalizedPhi > 3.6 && normalizedPhi < 4.8;

                if (isNearIndonesia !== isAligned) {
                    setIsAligned(isNearIndonesia);
                }
            },
        } as any);

        return () => {
            window.removeEventListener("resize", onResize);
            globe.destroy();
        };
    }, []);

    const handlePointerDown = (e: any) => {
        pointerInteracting.current = e.clientX;
        canvasRef.current!.style.cursor = 'grabbing';
    };

    const handlePointerUp = () => {
        pointerInteracting.current = null;
        canvasRef.current!.style.cursor = 'grab';
    };

    const handlePointerMove = (e: any) => {
        if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
        }
    };

    const handleUnlock = () => {
        if (isAligned) {
            setIsExiting(true);
            setTimeout(() => {
                onUnlock();
            }, 1000);
        }
    };

    if (isExiting) {
        return (
            <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 5 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="fixed inset-0 z-[9999] bg-black pointer-events-none"
            />
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
            <div className="absolute top-10 left-0 w-full text-center z-20 pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white font-display font-black text-3xl md:text-5xl uppercase tracking-[0.3em] text-glow"
                >
                    Locate <span className="text-blue-500">Node</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-white/50 font-mono text-xs uppercase tracking-widest mt-4"
                >
                    Spin the globe. Find the glowing green marker (Indonesia).
                </motion.p>
            </div>

            <div className="relative w-full max-w-[800px] aspect-square">
                <canvas
                    ref={canvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerOut={handlePointerUp}
                    onPointerMove={handlePointerMove}
                    style={{ width: "100%", height: "100%", contain: "layout paint size", cursor: "grab" }}
                />

                {/* Target Reticle Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-32 h-32 flex items-center justify-center">
                    <div className={`absolute inset-0 border-2 rounded-full transition-all duration-500 ${isAligned ? 'border-emerald-400 scale-110 shadow-[0_0_30px_rgba(52,211,153,0.5)]' : 'border-white/20 scale-100'}`} />
                    <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isAligned ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-white/20'}`} />

                    {/* Crosshairs */}
                    <div className={`absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 transition-colors duration-500 ${isAligned ? 'bg-emerald-400/50' : 'bg-white/10'}`} />
                    <div className={`absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 transition-colors duration-500 ${isAligned ? 'bg-emerald-400/50' : 'bg-white/10'}`} />
                </div>
            </div>

            <div className="absolute bottom-20 left-0 w-full flex justify-center z-20">
                <AnimatePresence>
                    {isAligned && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            onClick={handleUnlock}
                            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-display font-black text-sm uppercase tracking-[0.5em] rounded-full shadow-[0_0_40px_rgba(52,211,153,0.6)] hover:shadow-[0_0_60px_rgba(52,211,153,0.8)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                        >
                            <span className="w-2 h-2 bg-black rounded-full animate-ping" />
                            Lock Target
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Dark gradient vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_100%)] pointer-events-none" />
        </div>
    );
}
