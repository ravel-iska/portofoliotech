"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { useGlobal } from "@/components/core/GlobalProvider";
import { useLenis } from "@studio-freight/react-lenis";
// animejs required in useEffect

export default function Hero() {
    const elementsRef = useRef<HTMLDivElement>(null);
    const { t } = useGlobal();
    const lenis = useLenis();

    const handleExplore = () => {
        if (lenis) {
            lenis.scrollTo("#projects", { duration: 2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (!elementsRef.current) return;

        const animeModule = require("animejs");
        const anime = animeModule.default || animeModule;

        // Entrance animation for supplementary elements (framer-motion replacement)
        const els = elementsRef.current.querySelectorAll('.hero-fade-in');

        anime({
            targets: els,
            translateY: [30, 0],
            opacity: [0, 1],
            easing: "easeOutCubic",
            duration: 1200,
            delay: anime.stagger(200, { start: 2000 })
        });

    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full pt-20 pb-10">
            {/* Apple iOS Glassmorphism Glow Highlights */}
            <div className="absolute top-[20%] right-[10%] w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-accent/20 rounded-full blur-[60px] md:blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[20%] w-[150px] h-[150px] md:w-[400px] md:h-[400px] bg-blue-500/10 rounded-full blur-[50px] md:blur-[120px] pointer-events-none" />

            <div ref={elementsRef} className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center z-10 text-center relative">
                <div className="mb-8 flex justify-center hero-fade-in opacity-0">
                    <div className="px-6 py-2.5 rounded-full border border-white/10 glass-card text-xs md:text-sm text-white/90 tracking-[0.2em] font-mono uppercase shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-3 animate-pulse shadow-[0_0_10px_#4ade80]" />
                        Welcome to the V2 Experience
                    </div>
                </div>

                <motion.h1
                    whileTap={{ scale: 0.9, rotateX: 20, filter: "blur(5px)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="text-5xl md:text-7xl lg:text-[6rem] font-display font-bold tracking-tight mb-6 text-glow leading-tight select-none drop-shadow-2xl cursor-pointer flex justify-center"
                >
                    <TextReveal text="Bagus Priambudi, S.Kom." delay={0.3} />
                </motion.h1>

                <p className="text-lg md:text-2xl text-blue-100/70 font-sans max-w-3xl mx-auto mb-14 font-light tracking-wide leading-relaxed hero-fade-in opacity-0 drop-shadow-md">
                    <strong className="text-white font-medium">{t("hero.role")}</strong> {t("hero.desc")}
                </p>

                <div className="hero-fade-in opacity-0">
                    <MagneticButton
                        onClick={handleExplore}
                        className="text-lg px-12 py-5 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 shadow-[0_0_40px_rgba(129,140,248,0.3)] border border-white/20"
                    >
                        {t("hero.cta")}
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
