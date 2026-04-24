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
        <section id="home" className="relative min-h-[70vh] md:min-h-screen flex items-start md:items-center justify-center md:justify-center overflow-hidden w-full pt-12 md:pt-20 pb-6 md:pb-10">
            {/* Glow Highlights — desktop only */}
            <div className="hidden md:block absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="hidden md:block absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div ref={elementsRef} className="container mx-auto px-6 md:px-12 flex flex-col items-end md:items-center md:justify-center z-10 text-right md:text-center relative">
                <div className="mb-6 md:mb-8 flex justify-end md:justify-center hero-fade-in opacity-0">
                    <div className="px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-white/10 glass-card text-[10px] md:text-sm text-white/90 tracking-[0.15em] md:tracking-[0.2em] font-mono uppercase">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 md:mr-3 animate-pulse shadow-[0_0_10px_#4ade80]" />
                        V2 Experience Is Live
                    </div>
                </div>

                <motion.h1
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="text-4xl md:text-7xl lg:text-[6rem] font-display font-bold tracking-tight mb-4 md:mb-6 leading-[1.1] select-none cursor-pointer flex flex-col items-end md:items-center"
                >
                    <span className="block"><TextReveal text="Bagus" delay={0.3} /></span>
                    <span className="block -mt-1 md:mt-0"><TextReveal text="Priambudi, S.Kom." delay={0.5} /></span>
                </motion.h1>

                <p className="text-right md:text-center text-sm md:text-2xl text-blue-100/70 font-sans max-w-xl md:max-w-3xl mb-8 md:mb-14 font-light tracking-wide leading-relaxed hero-fade-in opacity-0">
                    <strong className="text-white font-medium">{t("hero.role")}</strong> {t("hero.desc")}
                    <span className="hidden md:inline"> Creating high-performance digital ecosystems with cutting-edge technology and human-centric design patterns.</span>
                    <span className="md:hidden block mt-2 text-white/50 italic">Spesialis dalam arsitektur data prediktif dan solusi desentralisasi global.</span>
                </p>

                <div className="hero-fade-in opacity-0 flex justify-end md:justify-center w-full">
                    <MagneticButton
                        onClick={handleExplore}
                        className="text-sm md:text-lg px-8 md:px-12 py-4 md:py-5 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 border border-white/20 whitespace-nowrap"
                    >
                        {t("hero.cta")}
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}
