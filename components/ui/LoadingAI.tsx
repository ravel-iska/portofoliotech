"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingAI() {
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setIsLoading(false), 3800);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(40px)" }}
                    transition={{ duration: 1.2, ease: "circInOut" }}
                    className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden touch-none"
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    {/* Ambient Glows */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-accent/20 rounded-full blur-[80px] md:blur-[150px] pointer-events-none animate-pulse" />

                    {/* 3D Robot / Cubic Sequence */}
                    <div className="relative w-20 h-20 md:w-40 md:h-40 preserve-3d">
                        <motion.div
                            animate={{
                                rotateX: [45, 405],
                                rotateY: [45, 405],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute inset-0 preserve-3d"
                        >
                            {/* Cube Faces */}
                            {[
                                { rotateY: 0, translateZ: 40, color: "bg-accent/40" },
                                { rotateY: 90, translateZ: 40, color: "bg-blue-500/30" },
                                { rotateY: 180, translateZ: 40, color: "bg-purple-500/30" },
                                { rotateY: -90, translateZ: 40, color: "bg-accent/30" },
                                { rotateX: 90, translateZ: 40, color: "bg-blue-400/20" },
                                { rotateX: -90, translateZ: 40, color: "bg-purple-400/20" },
                            ].map((face, i) => (
                                <div
                                    key={i}
                                    style={{
                                        transform: `rotateX(${face.rotateX || 0}deg) rotateY(${face.rotateY || 0}deg) translateZ(${face.translateZ}px)`,
                                    }}
                                    className={`absolute inset-1 glass border border-white/20 flex items-center justify-center`}
                                >
                                    <div className={`w-1/2 h-1/2 rounded-full ${face.color} blur-xl animate-pulse`} />
                                    {/* Abstract Robot Eye */}
                                    {i === 0 && (
                                        <div className="w-8 h-8 rounded-full bg-accent relative flex items-center justify-center shadow-[0_0_20px_#818cf8]">
                                            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Loading Text */}
                    <div className="mt-12 text-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-base md:text-4xl font-display font-bold text-white tracking-widest uppercase mb-2"
                        >
                            Initializing <span className="text-accent">AI</span> Core
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
                            className="text-white/40 font-mono text-xs tracking-[0.5em] uppercase"
                        >
                            Constructing Premium Experience...
                        </motion.p>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-6 left-4 right-4 md:bottom-10 md:left-10 md:right-10 flex flex-col gap-2 max-w-lg mx-auto w-full px-4 md:px-6">
                        <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
                            <span>System Load</span>
                            <span>99%</span>
                        </div>
                        <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 3, ease: "easeInOut" }}
                                className="h-full bg-accent shadow-[0_0_10px_#818cf8]"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
