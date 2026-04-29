"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IsometricTimeline({ onComplete }: { onComplete?: () => void }) {
    const [step, setStep] = useState(0);
    const [systemBooting, setSystemBooting] = useState(false);
    const [bootLogs, setBootLogs] = useState<string[]>([]);

    const logsSequence = [
        "SYSTEM::INITIALIZING...",
        "DATABASE::CONNECTION_ESTABLISHED [PostgreSQL]",
        "SECURITY::ENCRYPTION_ACTIVE (Aes-256)",
        "NETWORK::QUANTUM_ROUTING_NOMINAL",
        "STATUS::ALL_SYSTEMS_GREEN",
        "[ ACCESS GRANTED ]"
    ];

    // Auto-advance sequence: 0 -> 1 -> 2 -> 3 (Phone Reveal)
    useEffect(() => {
        if (step === 0) {
            const timer = setTimeout(() => setStep(1), 2500);
            return () => clearTimeout(timer);
        } else if (step === 1) {
            const timer = setTimeout(() => setStep(2), 2500);
            return () => clearTimeout(timer);
        } else if (step === 2) {
            const timer = setTimeout(() => setStep(3), 2500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    // Handle interactive terminal booting sequence
    useEffect(() => {
        if (systemBooting && bootLogs.length < logsSequence.length) {
            const timer = setTimeout(() => {
                setBootLogs(prev => [...prev, logsSequence[prev.length]]);
            }, prev => prev.length === logsSequence.length - 1 ? 800 : 400); // Wait longer for ACCESS GRANTED
            return () => clearTimeout(timer);
        } else if (systemBooting && bootLogs.length === logsSequence.length) {
            // Once all logs are shown, unlock application!
            const finalTimer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 1500);
            return () => clearTimeout(finalTimer);
        }
    }, [systemBooting, bootLogs]);

    const handleInitializeClick = () => {
        if (!systemBooting) {
            setSystemBooting(true);
            setBootLogs([]);
        }
    };

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
                <div className={`absolute flex flex-col items-center justify-center text-center px-4 w-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${step >= 3 ? '-translate-y-[28vh] md:-translate-y-[32vh]' : 'translate-y-0'}`}>
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
                                className="flex flex-col items-center z-50 pointer-events-none"
                            >
                                <h2 className="text-3xl md:text-6xl lg:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 tracking-tighter mb-4 text-balance leading-tight drop-shadow-2xl">
                                    The Future,<br />
                                    In Your Hands.
                                </h2>
                                {/* Replaced External Button with Instruction Text */}
                                <AnimatePresence>
                                    {step >= 3 && !systemBooting && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-cyan-400/80 font-mono text-sm tracking-widest animate-pulse mt-2"
                                        >
                                            [TAP DEVICE TO INITIALIZE]
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* EPIC CENTERED PHONE MOCKUP WITH CONTINUOUS LEVITATION */}
                <AnimatePresence>
                    {step >= 3 && (
                        <motion.div
                            initial={{ y: "100vh", opacity: 0, rotateX: 45, scale: 0.8 }}
                            animate={{ y: ["15vh", "12vh", "15vh"], opacity: 1, rotateX: 0, scale: 1 }}
                            transition={{
                                y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                                opacity: { duration: 1 },
                                rotateX: { type: "spring", stiffness: 50, damping: 20 },
                                scale: { type: "spring", stiffness: 50, damping: 20 }
                            }}
                            className="absolute pointer-events-auto z-20 group cursor-pointer"
                            onClick={handleInitializeClick}
                        >
                            <div className={`relative w-[280px] h-[580px] md:w-[350px] md:h-[720px] rounded-[3.5rem] p-3 md:p-4 bg-gradient-to-b border-[0.5px] border-white/20 shadow-[0_0_100px_rgba(6,182,212,0.15),_inset_0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-2xl transition-all duration-700 ${systemBooting ? 'from-cyan-900/30 to-purple-900/10 scale-105 shadow-[0_0_150px_rgba(34,211,238,0.4)]' : 'from-white/10 to-white/5 hover:scale-105'}`}>

                                {/* Inner Screen */}
                                <div className="w-full h-full rounded-[2.8rem] bg-[#030305] overflow-hidden relative shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)] border border-white/5">

                                    {/* OS Status Bar */}
                                    <div className="absolute top-0 w-full h-8 flex justify-center items-center z-50 px-6 pt-2">
                                        <div className="w-24 h-6 bg-black rounded-full shadow-md" />
                                    </div>

                                    {/* Screen States */}
                                    <AnimatePresence mode="wait">
                                        {!systemBooting ? (
                                            /* DEFAULT IDLE STATE (Glass Panels) */
                                            <motion.div
                                                key="idle-state"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                                                className="absolute inset-0 flex flex-col"
                                            >
                                                {/* Ambient Background Signals */}
                                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-purple-900/20" />

                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center flex-col gap-6">
                                                    <motion.div
                                                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                                                        transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                                                        className="w-24 h-24 rounded-full border-t-2 border-cyan-400 flex items-center justify-center relative shadow-[0_0_30px_#22d3ee]"
                                                    >
                                                        <div className="w-16 h-16 bg-cyan-500/20 rounded-full blur-md" />
                                                        <div className="absolute w-2 h-2 bg-white rounded-full" />
                                                    </motion.div>
                                                    <div className="px-6 py-2 rounded-full border border-cyan-500/50 bg-cyan-500/10 text-cyan-300 font-mono text-xs tracking-widest backdrop-blur-md">
                                                        SYSTEM STANDBY
                                                    </div>
                                                </div>

                                                <div className="relative z-10 flex-1 flex flex-col justify-end p-6 gap-4 pb-12 opacity-60">
                                                    <div className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center px-4 overflow-hidden relative">
                                                        <motion.div
                                                            animate={{ x: ["-100%", "200%"] }}
                                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                                                        />
                                                    </div>
                                                    <div className="w-3/4 h-16 rounded-2xl bg-white/5 border border-white/10 ml-auto flex items-center px-4" />
                                                </div>
                                            </motion.div>
                                        ) : (
                                            /* ACTIVATE TERMINAL BOOT SEQUENCE */
                                            <motion.div
                                                key="boot-state"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 bg-[#000000] p-6 pt-16 font-mono text-[10px] md:text-sm text-cyan-500 flex flex-col gap-2"
                                            >
                                                {/* Matrix scanline effect purely CSS driven */}
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 pointer-events-none opacity-50" />

                                                <div className="flex items-center gap-2 mb-4 text-white">
                                                    <div className="w-2 h-4 bg-cyan-500 animate-pulse" />
                                                    <span>TERMINAL_ROOT_ACCESS</span>
                                                </div>

                                                {bootLogs.map((log, i) => (
                                                    <motion.div
                                                        key={`log-${i}`}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        className={`font-semibold tracking-wider flex gap-2 ${log.includes("GRANTED") ? "text-green-400 text-lg mt-4" : ""}`}
                                                    >
                                                        <span className="opacity-50">{`0x0${i + 1}A`}</span>
                                                        <span>{log}</span>
                                                    </motion.div>
                                                ))}

                                                {/* Blinking Cursor if waiting */}
                                                {bootLogs.length < logsSequence.length && (
                                                    <motion.div
                                                        animate={{ opacity: [1, 0, 1] }}
                                                        transition={{ duration: 0.8, repeat: Infinity }}
                                                        className="w-3 h-4 bg-cyan-500 mt-2"
                                                    />
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
