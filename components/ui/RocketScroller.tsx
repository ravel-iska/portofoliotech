"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Rocket, Sparkles } from "lucide-react";

export default function RocketScroller() {
    const [isClient, setIsClient] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const [isLaunched, setIsLaunched] = useState(false);
    const [isArmed, setIsArmed] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const unsubscribe = scrollYProgress.onChange((v) => {
            if (v > 0.95 && !isLaunched) {
                setIsArmed(true);
            } else {
                setIsArmed(false);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, isLaunched]);

    const handleLaunch = () => {
        if (!isArmed) return;
        setIsLaunched(true);

        // Add global shake effect to the body for impact visualization
        document.body.classList.add("shake-hard");

        // After a delay matching the fly-up animation, reset the page
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            document.body.classList.remove("shake-hard");

            setTimeout(() => {
                setIsLaunched(false);
                setIsArmed(false);
            }, 1000);
        }, 2000);
    };

    if (!isClient) return null;

    return (
        <>
            {/* The Fuel Station Line */}
            <div className="fixed right-4 top-[20%] bottom-[20%] w-1 bg-white/5 rounded-full z-40 hidden md:block mix-blend-difference pointer-events-none">
                <motion.div
                    className="w-full bg-gradient-to-b from-[#00ff87] to-[#00b8ff] rounded-full origin-top"
                    style={{ scaleY }}
                />
            </div>

            {/* The Rocket Module */}
            <motion.div
                className="fixed right-2 md:right-8 z-50 flex items-center gap-4"
                style={{
                    bottom: isLaunched ? '120vh' : '40px',
                }}
                animate={{
                    bottom: isLaunched ? '120vh' : '40px',
                    scale: isLaunched ? 1.5 : 1
                }}
                transition={{
                    bottom: isLaunched ? { duration: 1.5, ease: "easeIn" } : { type: 'spring', stiffness: 200, damping: 20 },
                    scale: isLaunched ? { duration: 0.5 } : { duration: 0.2 }
                }}
            >
                {/* LAUNCH Button - Only visible when armed and not launched */}
                <AnimatePresence>
                    {isArmed && !isLaunched && (
                        <motion.button
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.8 }}
                            onClick={handleLaunch}
                            className="glass border border-[#ff2a5f] bg-[#ff2a5f]/10 shadow-[0_0_20px_#ff2a5f] px-6 py-3 rounded-full flex items-center gap-2 hover:bg-[#ff2a5f]/20 transition-all font-mono hover:scale-105 active:scale-95 group cursor-pointer"
                        >
                            <Sparkles className="w-4 h-4 text-[#ff2a5f] animate-pulse" />
                            <span className="text-white font-black tracking-widest text-sm drop-shadow-[0_0_8px_#ff2a5f]">LAUNCH</span>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* The Rocket Icon */}
                <div className={`relative p-3 rounded-full flex items-center justify-center transition-all duration-300 ${isLaunched ? 'bg-transparent' : isArmed ? 'bg-[#ff2a5f]/20 border border-[#ff2a5f]/50' : 'bg-white/10 border border-white/20 glass'}`}>
                    <Rocket
                        className={`w-6 h-6 transition-all duration-300 ${isLaunched ? 'text-white' : isArmed ? 'text-[#ff2a5f]' : 'text-white/50'}`}
                    />

                    {/* Fire thruster during launch */}
                    {isLaunched && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 60 }}
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-t from-transparent via-[#ff9000] to-[yellow] rounded-full blur-[2px]"
                        />
                    )}
                </div>
            </motion.div>
        </>
    );
}
