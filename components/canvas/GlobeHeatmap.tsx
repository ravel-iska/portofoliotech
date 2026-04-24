"use client";

import { useState, useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobeHeatmap() {
    const [activeRegion, setActiveRegion] = useState<{ name: string; status: string; latency: string } | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        if (!mounted || isMobile || !canvasRef.current) return;

        let phi = 0;
        let width = 0;

        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener("resize", onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            onRender: (state: any) => {
                state.phi = phi;
                phi += 0.005;
                state.width = width * 2;
                state.height = width * 2;
            },
        } as any);

        const regions = [
            { name: "New York (NY4)", status: "Active", latency: "8ms", trigger: 300 },
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
            window.removeEventListener("resize", onResize);
            clearInterval(regionInterval);
            globe.destroy();
        };
    }, [mounted, isMobile]);

    // Mobile: lightweight placeholder (always rendered first for SSR safety)
    if (!mounted || isMobile) {
        return (
            <div className="relative w-full aspect-square flex items-center justify-center max-w-[250px] mx-auto">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-accent/20 via-blue-900/30 to-transparent border border-white/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/30 font-mono text-[9px] uppercase tracking-widest">Global Network</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-square flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-1000 max-w-[600px] mx-auto">
            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%", contain: "layout paint size" }}
                className="cursor-grabbing"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent pointer-events-none rounded-full" />
            <AnimatePresence>
                {activeRegion && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 p-4 glass-card border border-white/10 rounded-2xl whitespace-nowrap z-20"
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
