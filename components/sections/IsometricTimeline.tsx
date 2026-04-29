"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function IsometricTimeline() {
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

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Scene 1
    const opacity1 = useTransform(smoothScroll, [0, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
    const y1 = useTransform(smoothScroll, [0, 0.15, 0.25, 0.3], [50, 0, 0, -50]);

    // Scene 2
    const opacity2 = useTransform(smoothScroll, [0.3, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
    const y2 = useTransform(smoothScroll, [0.3, 0.45, 0.55, 0.6], [50, 0, 0, -50]);

    // Scene 3
    const opacity3 = useTransform(smoothScroll, [0.6, 0.75, 1], [0, 1, 1]);
    const y3 = useTransform(smoothScroll, [0.6, 0.75, 1], [50, 0, 0]);

    // Phone Animation
    // On mobile, the phone needs to be smaller and positioned such that it doesn't overlap text too much.
    // Let's use different transforms based on window size if needed, but we can also handle it with responsive CSS where possible.
    const phoneScale = useTransform(smoothScroll, [0.4, 0.8], [isMobile ? 0.6 : 0.8, isMobile ? 0.85 : 1]);
    const phoneY = useTransform(smoothScroll, [0.4, 0.8], [isMobile ? 100 : 200, 0]);
    const phoneOpacity = useTransform(smoothScroll, [0.4, 0.6], [0, 1]);

    // Give it a 3D reveal rotate effect
    const phoneRotateX = useTransform(smoothScroll, [0.4, 0.8, 1], [25, 0, 0]);
    const phoneRotateY = useTransform(smoothScroll, [0.4, 0.8, 1], [-20, 0, 0]);

    // For desktop, it shifts to the right, for mobile it stays bottom/center
    const textTranslateX = useTransform(smoothScroll, [0.6, 0.8], ["0%", isMobile ? "0%" : "-25%"]);
    const textTranslateY = useTransform(smoothScroll, [0.6, 0.8], ["0%", isMobile ? "-30%" : "0%"]);

    return (
        <section ref={targetRef} className="relative w-full h-[400vh] bg-[#0a0a0e]">
            {/* The sticky container to hold the frames */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

                {/* Subtle cyber/grid background that fades in */}
                <motion.div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        opacity: useTransform(smoothScroll, [0.5, 0.8], [0.05, 0.2]),
                        backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '80px 80px',
                        transform: 'perspective(1000px) rotateX(45deg)',
                        transformOrigin: 'top'
                    }}
                />

                <div className="relative z-10 w-full max-w-7xl px-6 mx-auto flex flex-col md:flex-row items-center justify-center h-full">

                    {/* Floating Texts Container */}
                    <div className="flex-1 w-full h-full flex flex-col justify-center items-center text-center absolute md:relative pointer-events-none z-20 pt-10 md:pt-0">

                        <motion.div
                            style={{ opacity: opacity1, y: y1 }}
                            className="absolute inset-0 flex flex-col justify-center items-center"
                        >
                            <h2 className="text-3xl md:text-6xl font-display font-black text-white tracking-tighter mb-4 px-4 text-balance shadow-black/50 drop-shadow-lg">
                                Masa depan bukanlah sesuatu yang kita tunggu...
                            </h2>
                            <p className="text-orange-400 font-mono tracking-widest text-xs md:text-sm uppercase">Fase Satu</p>
                        </motion.div>

                        <motion.div
                            style={{ opacity: opacity2, y: y2 }}
                            className="absolute inset-0 flex flex-col justify-center items-center"
                        >
                            <h2 className="text-3xl md:text-6xl font-display font-black text-white tracking-tighter mb-4 px-4 text-balance shadow-black/50 drop-shadow-lg">
                                Melainkan sesuatu yang kita bangun <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">hari ini.</span>
                            </h2>
                            <p className="text-rose-400 font-mono tracking-widest text-xs md:text-sm uppercase">Fase Dua</p>
                        </motion.div>

                        <motion.div
                            style={{
                                opacity: opacity3,
                                y: y3,
                                x: textTranslateX,
                                translateY: textTranslateY
                            }}
                            className="absolute inset-0 flex flex-col justify-center items-center md:items-start md:text-left pointer-events-auto"
                        >
                            <h2 className="text-4xl md:text-7xl font-display font-black text-white tracking-tighter mb-4 md:mb-6 text-balance leading-tight drop-shadow-xl">
                                Masa Depan, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Dalam Genggaman.</span>
                            </h2>
                            <p className="text-white/70 font-light text-sm md:text-lg max-w-xs md:max-w-md mx-auto md:mx-0 mb-6 md:mb-8 font-sans drop-shadow-md">
                                Antarmuka generasi berikutnya. Menggabungkan estetika neo-futuristik dengan performa kelas berat untuk pengalaman digital tanpa batas.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 hover:border-cyan-500/50 transition-all backdrop-blur-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                            >
                                Mulai Menjelajah
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Mobile Mockup Overlay */}
                    <div className="flex-1 w-full h-full flex flex-col justify-end md:justify-center items-center pointer-events-none pb-12 md:pb-0 z-10">
                        <motion.div
                            style={{
                                scale: phoneScale,
                                y: phoneY,
                                opacity: phoneOpacity,
                                rotateX: phoneRotateX,
                                rotateY: phoneRotateY,
                                transformPerspective: 1200
                            }}
                            className="relative w-[280px] h-[580px] md:w-[360px] md:h-[720px] rounded-[3rem] border-2 border-white/20 bg-[#0f0f13] shadow-[0_30px_100px_rgba(6,182,212,0.3)] p-3 md:p-4 overflow-hidden pointer-events-auto group mt-40 md:mt-0"
                        >
                            {/* Inner Screen */}
                            <div className="w-full h-full rounded-[2.2rem] bg-[#050505] overflow-hidden relative flex flex-col items-center justify-center outline outline-1 outline-white/5">
                                {/* Bezel reflection highlight */}
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent opacity-50 z-20 pointer-events-none mix-blend-overlay" />

                                {/* Dynamic Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-black to-purple-900/60" />

                                <div className="absolute top-0 w-full h-full flex flex-col z-10">
                                    {/* App Header (Dynamic Island vibe) */}
                                    <div className="flex justify-between items-center w-full px-6 pt-10 pb-4">
                                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-inner">
                                            <div className="w-4 h-4 rounded-full border border-white/30" />
                                        </div>
                                        <div className="w-24 h-6 rounded-full bg-black border border-white/10 shadow-2xl overflow-hidden relative">
                                            <motion.div
                                                animate={{ x: [-50, 100] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                                            />
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md" />
                                    </div>

                                    {/* Center Graphic */}
                                    <div className="flex-1 flex flex-col items-center justify-center relative">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                rotate: [0, -180, -360]
                                            }}
                                            transition={{
                                                duration: 10,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[1px] border-cyan-500/30 shadow-[inset_0_0_50px_rgba(34,211,238,0.2),_0_0_50px_rgba(34,211,238,0.3)] flex items-center justify-center relative"
                                        >
                                            <div className="absolute inset-4 md:inset-6 border-[1px] border-purple-500/40 rounded-full border-dashed" />
                                            {/* Glowing Core */}
                                            <motion.div
                                                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 blur-2xl"
                                            />
                                            {/* Glass Overlay Orb */}
                                            <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/20 backdrop-blur-sm z-10 shadow-lg flex items-center justify-center">
                                                <div className="w-8 h-8 bg-white/80 rounded-full blur-[2px]" />
                                            </div>
                                        </motion.div>

                                        <p className="mt-8 text-white/50 font-mono text-xs tracking-[0.3em] uppercase">Status: <span className="text-cyan-400">Synced</span></p>
                                    </div>

                                    {/* App Bottom Cards */}
                                    <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                                        <motion.div
                                            whileHover={{ scale: 1.03 }}
                                            className="w-full h-16 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center px-4 gap-4 backdrop-blur-md shadow-lg relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent" />
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                                                <div className="w-4 h-4 bg-cyan-400 rounded-sm" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="w-1/2 h-2.5 rounded-full bg-white/80" />
                                                <div className="w-3/4 h-2 rounded-full bg-white/30" />
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.03 }}
                                            className="w-full h-16 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center px-4 gap-4 backdrop-blur-md shadow-lg relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent" />
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-purple-500/30 bg-purple-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                                                <div className="w-4 h-4 bg-purple-400 rounded-full" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="w-1/2 h-2.5 rounded-full bg-white/80" />
                                                <div className="w-3/4 h-2 rounded-full bg-white/30" />
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Home Indicator */}
                                    <div className="w-full flex justify-center pb-2">
                                        <div className="w-1/3 h-1 bg-white/30 rounded-full" />
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
