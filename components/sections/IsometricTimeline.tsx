"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IsometricTimeline({ onComplete }: { onComplete?: () => void }) {
    const [step, setStep] = useState(0);

    // Auto-advance sequence: 0 -> 1 -> 2 -> 3 (Phone + Button Reveal)
    useEffect(() => {
        if (step === 0) {
            const timer = setTimeout(() => setStep(1), 2500); // Wait 2.5s then go to step 1
            return () => clearTimeout(timer);
        } else if (step === 1) {
            const timer = setTimeout(() => setStep(2), 2500); // Wait 2.5s then go to step 2
            return () => clearTimeout(timer);
        } else if (step === 2) {
            const timer = setTimeout(() => setStep(3), 2500); // Wait 2.5s then go to step 3
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <section className="relative w-full h-screen bg-[#030305] font-sans overflow-hidden flex flex-col items-center justify-center selection:bg-cyan-500/30">

            {/* Dynamic Premium Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 pointer-events-none z-0"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-radial from-cyan-900/20 via-purple-900/10 to-transparent blur-3xl opacity-50 animate-pulse" />
                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent" />
            </motion.div>

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

                {/* AUTO-PLAY TEXT SEQUENCE */}
                <div className={`absolute flex flex-col items-center justify-center text-center px-4 w-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? '-translate-y-[35vh] md:-translate-y-[30vh]' : 'translate-y-0'}`}>
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="text-1"
                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="flex flex-col items-center"
                            >
                                <p className="text-cyan-400 font-mono tracking-[0.2em] text-xs md:text-sm uppercase mb-4 opacity-70">Initiating Sequence</p>
                                <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-black text-white tracking-tighter text-balance">
                                    The future isn't<br /> something we wait for.
                                </h2>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="text-2"
                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                className="flex flex-col items-center"
                            >
                                <p className="text-purple-400 font-mono tracking-[0.2em] text-xs md:text-sm uppercase mb-4 opacity-70">Paradigm Shift</p>
                                <h2 className="text-3xl md:text-5xl lg:text-7xl font-display font-black text-white tracking-tighter text-balance">
                                    It is something we<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">build today.</span>
                                </h2>
                            </motion.div>
                        )}

                        {step >= 2 && (
                            <motion.div
                                key="text-3"
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="flex flex-col items-center"
                            >
                                <h2 className="text-3xl md:text-6xl lg:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 tracking-tighter mb-8 text-balance leading-tight drop-shadow-2xl">
                                    The Future,<br />
                                    In Your Hands.
                                </h2>

                                <AnimatePresence>
                                    {step >= 3 && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            onClick={() => onComplete && onComplete()}
                                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-3 md:px-8 md:py-4 bg-white/10 border border-white/20 rounded-full text-white font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all backdrop-blur-xl cursor-pointer pointer-events-auto"
                                        >
                                            Lanjutkan Ke Porto
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* EPIC CENTERED PHONE MOCKUP */}
                <AnimatePresence>
                    {step >= 3 && (
                        <motion.div
                            initial={{ y: "100vh", opacity: 0, rotateX: 45, scale: 0.8 }}
                            animate={{ y: "15vh", opacity: 1, rotateX: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 50, damping: 20, duration: 2 }}
                            className="absolute pointer-events-auto z-20 group"
                        >
                            <div className="relative w-[280px] h-[580px] md:w-[350px] md:h-[720px] rounded-[3.5rem] p-3 md:p-4 bg-gradient-to-b from-white/10 to-white/5 border-[0.5px] border-white/20 shadow-[0_0_100px_rgba(6,182,212,0.15),_inset_0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-2xl">

                                {/* Inner Screen */}
                                <div className="w-full h-full rounded-[2.8rem] bg-black overflow-hidden relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">

                                    {/* OS Status Bar */}
                                    <div className="absolute top-0 w-full h-8 flex justify-center items-center z-50 px-6 pt-2">
                                        <div className="w-32 h-7 bg-black rounded-full shadow-md" /> {/* Dynamic Island replica */}
                                    </div>

                                    {/* Ultra Premium Screen Content */}
                                    <div className="absolute inset-0 bg-[#030305] flex flex-col">

                                        {/* Abstract UI Map */}
                                        <div className="absolute inset-0 z-0">
                                            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-cyan-900/40 to-transparent" />
                                            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-purple-900/30 to-transparent" />

                                            {/* Glowing Core */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-[0.5px] border-cyan-500/20 rounded-full flex items-center justify-center">
                                                <div className="w-32 h-32 border-[0.5px] border-purple-500/30 rounded-full flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                                        className="w-full h-full rounded-full border-t border-cyan-400 opacity-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Glass Panels */}
                                        <div className="relative z-10 flex-1 flex flex-col justify-end p-6 gap-4 pb-12">

                                            <motion.div
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.8 }} // delayed until phone is visible
                                                className="w-3/4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-cyan-500/20 mb-3 flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
                                                </div>
                                                <div className="h-2 w-full bg-white/10 rounded-full mb-2">
                                                    <div className="h-full w-2/3 bg-cyan-400 rounded-full" />
                                                </div>
                                                <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                                            </motion.div>

                                            <motion.div
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 1 }}
                                                className="w-5/6 self-end p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-purple-500/20 mb-3 flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc]" />
                                                </div>
                                                <div className="h-2 w-full bg-white/10 rounded-full mb-2">
                                                    <div className="h-full w-full bg-purple-400 rounded-full" />
                                                </div>
                                                <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                                            </motion.div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
