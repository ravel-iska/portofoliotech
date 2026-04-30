"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { ExternalLink, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { useGlobal } from "@/components/core/GlobalProvider";

const categories = ["all", "web", "mobile", "design"];

interface ProjectsProps {
    setSelectedProject: (project: Project | null) => void;
}

export default function Projects({ setSelectedProject }: ProjectsProps) {
    const { t } = useGlobal();
    const [activeCategory, setActiveCategory] = useState("all");
    const scrollRef = useRef<HTMLDivElement>(null);

    const slide = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const filteredProjects = projects.filter(
        (p) => activeCategory === "all" || p.category === activeCategory
    );

    return (
        <section id="projects" className="relative py-6 px-6 bg-transparent">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center lg:flex-row lg:items-end justify-between mb-4 gap-4 md:gap-8">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="text-2xl md:text-3xl font-display font-bold text-white mb-2 tracking-tighter leading-none text-center lg:text-left"
                        >
                            {t("projects.title").split(" ")[0]} <span className="text-accent text-glow text-edge">{t("projects.title").split(" ").slice(1).join(" ")}</span>
                        </motion.h2>
                        <div className="flex items-center justify-center lg:justify-start gap-4 text-white/30 font-mono text-xs uppercase tracking-[0.4em]">
                            <Layers size={14} /> Total Artifacts: {projects.length}
                        </div>
                    </div>

                    {/* Control Bar: Filter Tabs & Arrows */}
                    <div className="flex flex-col md:flex-row items-center gap-4 shrink-0">
                        {/* Filter Tabs - Premium Glass Pill */}
                        <div className="flex glass-card p-1 md:p-1.5 rounded-xl md:rounded-2xl shadow-2xl border border-white/5 overflow-x-auto hide-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-300 whitespace-nowrap ${activeCategory === cat ? "bg-accent text-white shadow-lg scale-105" : "text-white/40 hover:text-white"
                                        }`}
                                >
                                    {t(`projects.${cat}`)}
                                </button>
                            ))}
                        </div>

                        {/* Navigation Buttons for the Slider */}
                        <div className="hidden md:flex gap-3">
                            <button onClick={() => slide('left')} className="p-3 md:p-4 rounded-xl glass-card border border-white/10 hover:bg-white/10 transition-colors text-white">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={() => slide('right')} className="p-3 md:p-4 rounded-xl glass-card border border-white/10 hover:bg-white/10 transition-colors text-white">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Flex Snap Scroll identical to ProfileSlide */}
                <div className="w-full relative z-10 overflow-hidden hide-scrollbar">
                    <motion.div ref={scrollRef} layout className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-proximity hide-scrollbar py-4 min-w-full">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, i) => {
                                return (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        className="shrink-0 snap-center"
                                        onClick={() => setSelectedProject(project)}
                                    />
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, className = "", onClick }: { project: Project, className?: string, onClick: () => void }) {
    const { t } = useGlobal();
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            whileHover={{ y: -10 }}
            onClick={onClick}
            className={`group relative glass-card p-2 overflow-hidden flex flex-col cursor-pointer border-2 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] rounded-[2rem] w-[85vw] max-w-[340px] h-[400px] md:w-[320px] md:h-[420px] shrink-0 snap-center ${className}`}
        >
            <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-black shadow-inner">
                <ParallaxImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-1000 group-hover:scale-105"
                    parallaxOffset={20}
                />

                {/* Overlay Prompt */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="px-8 py-4 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-2xl text-white font-display font-bold tracking-widest scale-90 group-hover:scale-100 transition-transform">
                        {t("projects.expand")}
                    </div>
                </div>

                <div className="absolute top-8 left-8 flex gap-3">
                    <div className="px-5 py-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-[9px] font-black text-accent tracking-[0.4em] uppercase">
                        {project.year}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-4 glass-card border border-white/10 rounded-xl bg-black/40 backdrop-blur-xl transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-2xl">
                <span className="text-[10px] font-mono text-accent uppercase tracking-[0.5em] mb-2 block">{project.category}</span>
                <h3 className="text-sm md:text-xl font-display font-bold text-white mb-2 leading-tight uppercase tracking-tighter group-hover:text-glow transition-all line-clamp-1">{project.title}</h3>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex gap-2">
                        {project.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/5 rounded-lg text-[8px] text-white/30 uppercase font-mono tracking-widest">#{tag}</span>
                        ))}
                    </div>
                    <div className="text-accent"><ExternalLink size={14} /></div>
                </div>
            </div>
        </motion.div>
    );
}
