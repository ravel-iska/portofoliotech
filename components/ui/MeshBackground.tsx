"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MeshBackground() {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth < 768);
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    // Always render the simple version first (SSR-safe), then upgrade on desktop after mount
    if (!mounted || isMobile) {
        return (
            <div className="fixed inset-0 z-[-1] overflow-hidden bg-bg pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/10" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5" />
                <div className="absolute inset-0 bg-noise mix-blend-overlay" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-bg pointer-events-none">
            <motion.div
                animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[120px]"
            />
            <motion.div
                animate={{ x: [0, -80, 0], y: [0, 120, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[100px]"
            />
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, -100, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[110px]"
            />
            <div className="absolute inset-0 bg-noise mix-blend-overlay" />
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            />
        </div>
    );
}
