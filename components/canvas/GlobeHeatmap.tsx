"use client";

import { useState, useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobeHeatmap() {
    const [activeRegion, setActiveRegion] = useState<{ name: string, status: string, latency: string } | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;
        let width = 0;

        if (!canvasRef.current) return;

        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener('resize', onResize);
        onResize();

        const rotate = () => {
            phi += 0.005;
        };

        const globe = createGlobe(canvasRef.current, {
            // ... (keep all props)
            onRender: (state: any) => {
                state.phi = phi;
                phi += 0.005;
                state.width = width * 2;
                state.height = width * 2;
            }
        } as any);

        const regions = [
            { name: "New York (Equinix NY4)", status: "Active", latency: "8ms", trigger: 300 },
            { name: "Singapore (SG1)", status: "Active", latency: "14ms", trigger: 800 },
            { name: "Tokyo (TY3)", status: "Active", latency: "11ms", trigger: 1200 },
            { name: "London (LD4)", status: "Active", latency: "22ms", trigger: 1800 },
        ];

        let regionCounter = 0;
        const regionInterval = setInterval(() => {
            setActiveRegion(regions[regionCounter]);
            regionCounter = (regionCounter + 1) % regions.length;
        }, 3000);

        return () => {
            window.removeEventListener('resize', onResize);
            clearInterval(regionInterval);
            globe.destroy();
        };
    }, []);

    return (
        <div className="relative w-full aspect-square flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-1000 max-w-[600px] mx-auto">
            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%", contain: "layout paint size" }}
                className="cursor-grabbing"
            />

            {/* Overlay Gradient to blend edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent pointer-events-none rounded-full" />

            <AnimatePresence>
                {activeRegion && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 p-4 glass-card border border-white/10 rounded-2xl whitespace-nowrap z-20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">{activeRegion.name}</span>
                            <span className="text-emerald-400 font-mono font-bold text-xs">{activeRegion.latency}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
