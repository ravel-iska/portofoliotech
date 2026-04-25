"use client";

import React, { useEffect, useRef, useState } from "react";
import { skills } from "@/data/skills";

import ParallaxImage from "@/components/ui/ParallaxImage";
import { downloadVCard } from "@/lib/vcard";
import { useGlobal } from "@/components/core/GlobalProvider";
import VCardModal from "@/components/ui/VCardModal";

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t } = useGlobal();
    const [isVCardOpen, setIsVCardOpen] = useState(false);

    useEffect(() => {
        if (!sectionRef.current) return;

        const animeModule = require("animejs");
        const anime = animeModule.default || animeModule;

        // Entrance animation for skill tags using Anime.js
        anime({
            targets: ".skill-tag",
            opacity: [0, 1],
            translateY: [20, 0],
            scale: [0.9, 1],
            easing: "easeOutExpo",
            duration: 800,
            delay: anime.stagger(50, { start: 1000 })
        });
    }, []);

    return (
        <section id="about" className="relative py-32 px-6 overflow-hidden">

            {/* Apple iOS Glassmorphism "Grain/Orb" Highlight */}
            <div className="absolute top-[10%] left-[5%] w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-accent/10 rounded-full blur-[60px] md:blur-[120px] pointer-events-none select-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[150px] h-[150px] md:w-[300px] md:h-[300px] bg-blue-500/10 rounded-full blur-[50px] md:blur-[100px] pointer-events-none select-none" />

            <div ref={sectionRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                <div
                    onClick={() => setIsVCardOpen(true)}
                    className="relative w-full max-w-[280px] md:max-w-none md:aspect-square h-[320px] md:h-[450px] lg:h-auto mx-auto glass rounded-[2rem] md:rounded-[2.5rem] p-1 overflow-hidden group shadow-2xl cursor-pointer hover:scale-[1.02] active:scale-95 transition-transform duration-300 transform-gpu"
                    title="Click to Download Contact (vCard)"
                >
                    {/* Inner highlight to simulate thickness */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-10" />

                    <div className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-[#050B14]">
                        <img src="/profile.jpg" alt="Profile of Bagus Priambudi" className="absolute inset-0 z-0 object-cover w-full h-full scale-105" />

                        {/* Apple-style gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60 z-10" />

                        <div className="absolute bottom-8 left-8 z-20">
                            <h3 className="text-4xl font-display font-bold text-white mb-2 drop-shadow-lg tracking-tight">Bagus Priambudi</h3>
                            <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full border border-white/10 shadow-lg backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                                <p className="text-white/90 font-mono text-xs uppercase tracking-widest">{t("hero.role").split(",")[0]}</p>
                            </div>
                        </div>

                        {/* Click indicator/hint */}
                        <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl text-white text-[10px] font-bold uppercase tracking-[0.2em] pointer-events-none shadow-2xl">
                            <span className="text-accent">●</span> View Digital Card
                        </div>
                    </div>
                </div>

                {/* Bio & Skills Area */}
                <div className="flex flex-col">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 glass-card text-xs text-white/80 tracking-widest mb-6 font-mono w-fit">
                        {t("nav.about")}
                    </div>
                    <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight text-white tracking-tighter drop-shadow-xl">
                        {t("about.title")}
                    </h2>

                    <div className="space-y-6 text-blue-100/70 text-lg md:text-xl leading-relaxed max-w-xl font-light">
                        <p>
                            {t("about.desc1")}
                        </p>
                        <p>
                            {t("about.desc2")}
                        </p>
                    </div>

                    {/* Tech Highlights - Apple floating bar style */}
                    <div className="mt-10 flex flex-wrap gap-4 p-4 rounded-2xl glass-card border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl w-fit">
                        <div className="flex items-center px-4 border-r border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-[.25em] text-accent">Tech Stack</span>
                        </div>
                        <div className="flex gap-4">
                            {[
                                { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                                { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
                                { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                                { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
                            ].map((fw) => (
                                <div
                                    key={fw.name}
                                    className="w-10 h-10 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-accent/20 hover:border-accent hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                                    title={fw.name}
                                >
                                    <img src={fw.icon} alt={fw.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skill Tags - The Staggered Grid */}
                    <div className="mt-14">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/50 mb-6 flex items-center gap-4">
                            <span className="h-px bg-white/10 flex-1" />
                            Expertise Context
                            <span className="h-px bg-white/10 flex-1" />
                        </h4>

                        <div className="flex flex-wrap gap-3">
                            {[...skills.frontend, ...skills.backend, ...skills.database, ...skills.tools].map((skill) => (
                                <span
                                    key={skill.name}
                                    className="skill-tag flex items-center gap-2.5 px-5 py-2.5 glass-card border border-white/10 rounded-2xl text-[13px] font-bold tracking-tight text-white/80 hover:border-accent/40 hover:bg-accent/5 hover:text-white transition-all cursor-default shadow-md opacity-0 overflow-hidden relative group"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <img src={skill.icon} alt={skill.name} className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10">{skill.name}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <VCardModal isOpen={isVCardOpen} onClose={() => setIsVCardOpen(false)} />
        </section>
    );
}
