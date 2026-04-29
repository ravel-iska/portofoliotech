"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
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
        <section id="home" className="relative md:min-h-screen flex items-center justify-center overflow-hidden w-full pt-16 md:pt-20 pb-10 md:pb-10">
            {/* Glow Highlights — desktop only */}
            <div className="hidden md:block absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="hidden md:block absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div ref={elementsRef} className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center z-10 text-center relative">
                <div className="mb-8 flex justify-center hero-fade-in opacity-0">
                    <div className="px-6 py-2.5 rounded-full border border-white/10 glass-card text-xs md:text-sm text-white/90 tracking-[0.2em] font-mono uppercase">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-3 animate-pulse shadow-[0_0_10px_#4ade80]" />
                        V2 Experience
                    </div>
                </div>

                <motion.h1
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="text-4xl md:text-7xl lg:text-[6rem] font-display font-bold tracking-tight mb-6 md:mb-8 leading-[1.1] select-none cursor-pointer flex flex-col items-center justify-center pt-4"
                >
                    <span className="block pb-3 md:pb-5"><TextReveal text="Bagus" delay={0.3} /></span>
                    <span className="block"><TextReveal text="Priambudi, S.Kom." delay={0.5} /></span>
                </motion.h1>

                <p className="text-center text-sm md:text-2xl text-blue-100/70 font-sans max-w-2xl md:max-w-3xl mb-10 md:mb-16 font-light tracking-wide leading-relaxed hero-fade-in opacity-0 will-change-transform will-change-opacity">
                    <strong className="text-white font-medium">{t("hero.role")}</strong> {t("hero.desc")}
                </p>

                <div className="hero-fade-in opacity-0 flex flex-wrap justify-center items-center gap-4 w-full will-change-transform will-change-opacity">
                    <MagneticButton
                        onClick={handleExplore}
                        className="text-base md:text-lg px-8 md:px-10 py-4 md:py-5 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 border border-white/20 bg-white/5"
                    >
                        {t("hero.cta")}
                    </MagneticButton>
                    <button
                        onClick={() => {
                            const memories = document.getElementById('memories');
                            if (memories) memories.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex items-center gap-2 text-accent/80 hover:text-accent font-mono text-xs uppercase tracking-widest px-8 py-4 transition-all hover:bg-white/5 rounded-2xl cursor-pointer border border-accent/20"
                    >
                        <ImageIcon size={16} /> Vibe Photos
                    </button>
                    <button
                        onClick={() => {
                            const contact = document.getElementById('contact');
                            if (contact) contact.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-white/60 hover:text-white font-mono text-xs uppercase tracking-widest px-8 py-4 transition-all hover:bg-white/5 rounded-2xl cursor-pointer"
                    >
                        {t("nav.contact")}
                    </button>
                </div>
            </div>
        </section>
    );
}
