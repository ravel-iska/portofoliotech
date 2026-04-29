"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function IsometricTimeline({ onComplete }: { onComplete?: () => void }) {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Make the scroll significantly "heavier" and smoother
    const smoothScroll = useSpring(scrollYProgress, { stiffness: 60, damping: 40, restDelta: 0.001 });

    // Scene 1: Start VISIBLE!
    const opacity1 = useTransform(smoothScroll, [0, 0.15, 0.2, 0.25], [1, 1, 1, 0]);
    const scale1 = useTransform(smoothScroll, [0, 0.25], [1, 1.1]);

    // Scene 2
    const opacity2 = useTransform(smoothScroll, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const scale2 = useTransform(smoothScroll, [0.25, 0.5], [0.9, 1.1]);

    // Scene 3
    const opacity3 = useTransform(smoothScroll, [0.5, 0.6, 1], [0, 1, 1]);
    const scale3 = useTransform(smoothScroll, [0.5, 0.8], [0.9, 1]);

    // Vertical translation for Scene 3 Text: Starts centered, then moves UP to make room for phone
    const text3Y = useTransform(smoothScroll, [0.65, 0.85], ["0%", isMobile ? "-40%" : "-35%"]);

    // Scroll Down Hint
    const scrollHintOpacity = useTransform(smoothScroll, [0, 0.05], [1, 0]);

    // EPIC Phone Animation: Starts completely off-screen at the bottom, rises up to center stage.
    const phoneY = useTransform(smoothScroll, [0.65, 0.9], ["100vh", isMobile ? "20vh" : "15vh"]);
    const phoneScale = useTransform(smoothScroll, [0.65, 0.9, 1], [0.8, 1, 1.05]);
    const phoneOpacity = useTransform(smoothScroll, [0.65, 0.8], [0, 1]);

    // Slight 3D rotation resolving to flat
    const phoneRotateX = useTransform(smoothScroll, [0.65, 0.95], [30, 0]);

    // Button Fade In
    const buttonOpacity = useTransform(smoothScroll, [0.85, 0.95], [0, 1]);

    // Background gradient pulse based on scroll
    const bgOpacity = useTransform(smoothScroll, [0.5, 0.9], [0, 1]);

    return (
        <section className="relative w-full bg-[#030305] font-sans pointer-events-auto selection:bg-cyan-500/30">
            <div ref={targetRef} className="relative w-full h-[800vh]">
                <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

                    {/* Dynamic Premium Background */}
                    <motion.div
                        style={{ opacity: bgOpacity }}
                        className="absolute inset-0 pointer-events-none z-0"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-radial from-cyan-900/20 via-purple-900/10 to-transparent blur-3xl opacity-50" />
                        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent" />
                    </motion.div>

                    {/* Infinite Scroll Hint */}
                    <motion.div
                        style={{ opacity: scrollHintOpacity }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-50 animate-pulse"
                    >
                        <span className="text-white/40 text-[10px] tracking-[0.3em] font-mono uppercase">Scroll Down</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                    </motion.div>

                    <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center h-full">

                        {/* SEQUENTIAL CENTERED TEXTS */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                            <motion.div
                                style={{ opacity: opacity1, scale: scale1 }}
                                className="absolute flex flex-col items-center text-center px-4 w-full"
                            >
                                <p className="text-cyan-400 font-mono tracking-[0.2em] text-xs md:text-sm uppercase mb-4 opacity-70">Initiating Sequence</p>
                                <h2 className="text-4xl md:text-7xl font-display font-black text-white tracking-tighter text-balance">
                                    The future isn't<br /> something we wait for.
                                </h2>
                            </motion.div>

                            <motion.div
                                style={{ opacity: opacity2, scale: scale2 }}
                                className="absolute flex flex-col items-center text-center px-4 w-full"
                            >
                                <p className="text-purple-400 font-mono tracking-[0.2em] text-xs md:text-sm uppercase mb-4 opacity-70">Paradigm Shift</p>
                                <h2 className="text-4xl md:text-7xl font-display font-black text-white tracking-tighter text-balance">
                                    It is something we<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">build today.</span>
                                </h2>
                            </motion.div>

                            <motion.div
                                style={{
                                    opacity: opacity3,
                                    scale: scale3,
                                    y: text3Y
                                }}
                                className="absolute flex flex-col items-center text-center px-4 w-full pointer-events-auto"
                            >
                                <h2 className="text-5xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 tracking-tighter mb-6 text-balance leading-tight drop-shadow-2xl">
                                    The Future,<br />
                                    In Your Hands.
                                </h2>

                                <motion.button
                                    style={{ opacity: buttonOpacity }}
                                    onClick={() => onComplete && onComplete()}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-white/10 border border-white/20 rounded-full text-white font-semibold tracking-wide hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all backdrop-blur-xl cursor-pointer"
                                >
                                    Lanjutkan Ke Porto
                                </motion.button>
                            </motion.div>

                        </div>

                        {/* EPIC CENTERED PHONE MOCKUP */}
                        <motion.div
                            style={{
                                y: phoneY,
                                scale: phoneScale,
                                opacity: phoneOpacity,
                                rotateX: phoneRotateX,
                                transformPerspective: 1500
                            }}
                            className="absolute pointer-events-auto z-20 group"
                        >
                            <div className="relative w-[300px] h-[620px] md:w-[380px] md:h-[780px] rounded-[3.5rem] p-3 md:p-4 bg-gradient-to-b from-white/10 to-white/5 border-[0.5px] border-white/20 shadow-[0_0_100px_rgba(6,182,212,0.15),_inset_0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-2xl">

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
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
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
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
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

                    </div>
                </div>
            </div>
        </section>
    );
}
