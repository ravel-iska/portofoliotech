"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { GraduationCap, BookOpen, BrainCircuit, Blocks, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { useGlobal } from "@/components/core/GlobalProvider";

export default function LifeJourney() {
    const { t } = useGlobal();
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const milestones = [
        {
            id: 1,
            title: t("timeline.m1.title"),
            label: t("timeline.m1.label"),
            IconComponent: BookOpen,
            bubblePos: "top-[-80px] left-1/2 -translate-x-1/2",
            details: t("timeline.m1.details")
        },
        {
            id: 2,
            title: t("timeline.m2.title"),
            label: t("timeline.m2.label"),
            IconComponent: Blocks,
            bubblePos: "bottom-[-80px] left-1/2 -translate-x-1/2",
            details: t("timeline.m2.details")
        },
        {
            id: 3,
            title: t("timeline.m3.title"),
            label: t("timeline.m3.label"),
            IconComponent: GraduationCap,
            bubblePos: "top-[-80px] left-1/2 -translate-x-1/2",
            details: t("timeline.m3.details")
        },
        {
            id: 4,
            title: t("timeline.m4.title"),
            label: t("timeline.m4.label"),
            IconComponent: BrainCircuit,
            bubblePos: "bottom-[-80px] left-1/2 -translate-x-1/2",
            details: t("timeline.m4.details")
        },
        {
            id: 5,
            title: t("timeline.m5.title"),
            label: t("timeline.m5.label"),
            IconComponent: Rocket,
            bubblePos: "top-[-80px] left-1/2 -translate-x-1/2",
            details: t("timeline.m5.details")
        }
    ];

    const slide = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            // Must exceed card width + gap to successfully snap to the next element
            const scrollAmount = direction === 'left' ? -600 : 600;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full py-32 bg-[#0A1128] overflow-hidden">
            {/* Header & Controls Container */}
            <div className="container mx-auto px-6 mb-16 relative flex flex-col md:flex-row items-center justify-between gap-6 z-20">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="space-y-4 relative w-full md:w-auto"
                >
                    <h2 className="text-5xl md:text-9xl font-display font-black text-white/5 tracking-tighter absolute -top-8 -left-4 md:-top-20 md:-left-20 leading-none">
                        TIMELINE
                    </h2>
                    <h3 className="text-4xl md:text-7xl font-display font-bold text-white leading-tight relative mt-10 md:mt-0">
                        {t("timeline.title")}
                    </h3>
                    <p className="text-white/40 font-mono text-xs tracking-widest uppercase mb-10">{t("timeline.subtitle")}</p>
                </motion.div>

                {/* Navigation Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 shrink-0"
                >
                    <button onClick={() => slide('left')} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white backdrop-blur-md">
                        <ChevronLeft size={28} />
                    </button>
                    <button onClick={() => slide('right')} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white backdrop-blur-md">
                        <ChevronRight size={28} />
                    </button>
                </motion.div>
            </div>

            {/* Manual Horizontal Container */}
            <div className="w-full relative z-10">
                <div ref={scrollRef} className="flex gap-16 md:gap-24 overflow-x-auto snap-x snap-proximity hide-scrollbar px-10 md:px-[15vw] py-20 pb-40 min-w-full">

                    {milestones.map((node) => (
                        <div key={node.id} className="relative shrink-0 flex items-center justify-center snap-center">
                            {/* Glass App Icon Frame */}
                            <motion.button
                                onPointerDown={(e) => e.stopPropagation()}
                                onTap={() => setSelectedCard(selectedCard === node.id ? null : node.id)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectedCard(selectedCard === node.id ? null : node.id);
                                }}
                                whileHover={{ scale: 1.05, rotateY: 10 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-[4rem] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-t border-l border-white/30 border-r border-b border-white/10 backdrop-blur-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),inset_0_2px_30px_rgba(255,255,255,0.1)] flex items-center justify-center group overflow-visible z-[100] cursor-pointer transition-all duration-300 ${selectedCard === node.id ? 'ring-4 ring-blue-500/50 scale-105 shadow-[0_0_50px_rgba(59,130,246,0.3)]' : ''}`}
                            >
                                {/* Inner Glass reflection */}
                                <div className="absolute inset-4 rounded-[3.5rem] border border-white/[0.05] pointer-events-none" />

                                {/* The Medium-sized logo (Shrinked from 45% based on user feedback) */}
                                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center opacity-90 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 text-white">
                                    <node.IconComponent className="w-full h-full" strokeWidth={1.5} />
                                </div>

                                {/* Floating Labels */}
                                <div className={`absolute ${node.bubblePos} bg-black/80 border border-white/10 rounded-2xl px-8 py-5 shadow-2xl z-[60] min-w-[280px] pointer-events-none backdrop-blur-xl transform transition-all duration-500 ${selectedCard === node.id ? 'scale-110 -translate-y-4' : ''}`}>
                                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">{node.title}</h4>
                                    <p className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em]">{node.label}</p>
                                </div>

                                {/* Expansion Details */}
                                <AnimatePresence>
                                    {selectedCard === node.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            className="absolute inset-0 bg-blue-600/10 backdrop-blur-2xl rounded-[4rem] flex flex-col items-center justify-center p-12 text-center"
                                        >
                                            <p className="text-white text-lg font-display font-medium leading-relaxed">
                                                {node.details}
                                            </p>
                                            <div className="mt-8 w-12 h-1 bg-white/30 rounded-full" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Decoration Shards */}
                                <div className="absolute -bottom-10 right-10 w-20 h-20 bg-white/[0.05] border border-white/20 rounded-2xl backdrop-blur-lg transform rotate-12 pointer-events-none group-hover:rotate-45 transition-transform duration-700" />
                            </motion.button>
                        </div>
                    ))}

                    {/* Trailing spacer to allow viewing last card fully */}
                    <div className="shrink-0 w-16 md:w-32 snap-end" />
                </div>
            </div>

            {/* Background Accent Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                    transform: 'perspective(1000px) rotateX(60deg) scale(2.5)',
                    transformOrigin: 'top'
                }}
            />
        </section>
    );
}
