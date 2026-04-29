"use client";

import React, { useRef } from "react";

import { motion } from "framer-motion";
import { Blocks, Code2, MonitorPlay, Palette, TerminalSquare, Database, ChevronLeft, ChevronRight } from "lucide-react";

const profileData = [
    {
        title: "Fullstack Architecture",
        description: "Designing scalable cloud-native microservices using Go, Node.js, and Docker.",
        icon: <TerminalSquare className="w-6 h-6 md:w-8 md:h-8 text-accent" />,
        highlight: "Backend"
    },
    {
        title: "Frontend Engineering",
        description: "Crafting hyper-optimized web interfaces with React, Next.js, and Turbopack.",
        icon: <Code2 className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />,
        highlight: "React"
    },
    {
        title: "Data Analytics",
        description: "Transforming complex datasets into actionable insights using Python and Data Pipelines.",
        icon: <Database className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />,
        highlight: "Analyst"
    },
    {
        title: "Blockchain Architecture",
        description: "Engineering secure Smart Contracts and high-performance protocols for Web3 networks.",
        icon: <Blocks className="w-6 h-6 md:w-8 md:h-8 text-amber-400" />,
        highlight: "Web3"
    },
    {
        title: "Interaction Design",
        description: "Implementing complex GSAP & Anime.js animations for luxurious user experiences.",
        icon: <Palette className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />,
        highlight: "UI/UX"
    },
    {
        title: "Mobile Development",
        description: "Building cross-platform native experiences using React Native.",
        icon: <MonitorPlay className="w-6 h-6 md:w-8 md:h-8 text-teal-400" />,
        highlight: "Native"
    }
];

export default function ProfileSlide() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const slide = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            // Scroll by an amount larger than the card width to safely trigger the next snap point
            const scrollAmount = direction === 'left' ? -500 : 500;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full py-12 bg-[#141825] border-t border-white/5">
            {/* iOS Apple Glow Base */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-accent/10 to-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-20 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter drop-shadow-xl text-center md:text-left">
                        PROFILE <span className="text-accent text-glow">SLIDE</span>
                    </h2>
                    <p className="text-white/60 font-mono text-[10px] md:text-xs mt-3 uppercase tracking-widest max-w-lg mx-auto md:mx-0 text-center md:text-left">
                        Manually browse the engineering expertise and mindset.
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4">
                    <button onClick={() => slide('left')} className="p-4 rounded-2xl glass border border-white/20 hover:bg-white/10 transition-colors text-white">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={() => slide('right')} className="p-4 rounded-2xl glass border border-white/20 hover:bg-white/10 transition-colors text-white">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Manual Scrolling Container */}
            <div className="w-full relative z-10 px-6 md:px-[10vw]">
                <div
                    ref={scrollRef}
                    className="flex gap-6 py-8 overflow-x-auto snap-x snap-proximity hide-scrollbar min-w-full"
                >

                    {profileData.map((data, index) => (
                        <div
                            key={index}
                            className="relative w-[85vw] md:w-[320px] lg:w-[360px] shrink-0 aspect-[4/5] glass-card p-6 md:p-8 flex flex-col justify-between overflow-hidden group rounded-[2.5rem] select-none border border-white/5"
                        >
                            {/* Glass Highlight */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                            <div className="relative z-10 pointer-events-none">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl glass border border-white/20 flex items-center justify-center mb-6 md:mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                    {data.icon}
                                </div>

                                <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-bold tracking-widest text-white/80 uppercase mb-4 shadow-sm">
                                    {data.highlight}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-tight group-hover:text-glow transition-all duration-300">
                                    {data.title}
                                </h3>
                                <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                                    {data.description}
                                </p>
                            </div>

                            {/* Apple reflection effect */}
                            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 rotate-45 -translate-x-full group-hover:translate-x-[200%] transition-all duration-1000 ease-in-out pointer-events-none" />
                        </div>
                    ))}

                    {/* Trailing Space to fully show last card */}
                    <div className="shrink-0 w-8 md:w-32 snap-end" />
                </div>
            </div>
        </section>
    );
}
