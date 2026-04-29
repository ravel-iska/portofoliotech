"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, TerminalSquare } from "lucide-react";

export default function WelcomeRobot() {
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState("System Offline");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Delay opening robot slightly for cinematic effect
        const timer = setTimeout(() => {
            setIsVisible(true);
            setMessage("INIT: V2 Experience. Welcome.");
        }, 1500);

        const handleScroll = () => {
            if (window.scrollY > 300) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && !scrolled && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    className="fixed bottom-8 right-8 z-[100] flex items-end gap-3 pointer-events-none"
                >
                    {/* Chat Bubble */}
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl rounded-br-sm shadow-xl flex items-center gap-2"
                    >
                        <TerminalSquare size={14} className="text-accent" />
                        <span className="text-white/90 text-xs font-mono font-bold tracking-widest uppercase">
                            {message}
                        </span>
                    </motion.div>

                    {/* 3D Glass Robot / Avatar */}
                    <div className="w-12 h-12 md:w-16 md:h-16 relative cursor-pointer group pointer-events-auto shrink-0"
                        style={{ perspective: "1000px" }}>

                        {/* The Floating 3D Cube Core */}
                        <motion.div
                            animate={{
                                y: [-5, 5, -5],
                                rotateX: [60, 60],
                                rotateZ: [-45, -45],
                            }}
                            transition={{
                                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                rotateZ: { duration: 10, repeat: Infinity, ease: "linear" }
                            }}
                            className="absolute inset-0 w-full h-full"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Top Face */}
                            <div className="absolute w-full h-full bg-gradient-to-br from-accent/40 to-blue-500/20 glass backdrop-blur-md border border-white/30 flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(0,255,135,0.4)]" style={{ transform: "translateZ(12px)" }}>
                                <Cpu size={20} className="text-white drop-shadow-[0_0_5px_#00ff87] animate-pulse" />
                            </div>

                            {/* Pseudo 3D Sides */}
                            <div className="absolute top-0 right-full w-3 h-full bg-accent/20 border-y border-white/10 rounded-l-md origin-right" style={{ transform: "rotateY(-90deg)" }} />
                            <div className="absolute top-full left-0 w-full h-3 bg-blue-500/20 border-x border-white/10 rounded-b-md origin-top" style={{ transform: "rotateX(-90deg)" }} />

                        </motion.div>

                        {/* Ambient Shadow on the 'floor' */}
                        <motion.div
                            animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-6 bg-accent rounded-full blur-xl -z-10"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
