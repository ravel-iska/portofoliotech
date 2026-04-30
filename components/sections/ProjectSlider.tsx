"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { X, ExternalLink, LayoutGrid, Info, Settings, Camera, Sidebar, Grid3X3 } from "lucide-react";
import { useSoundEffect } from "@/hooks/useSoundEffect";
import { useGlobal } from "@/components/core/GlobalProvider";

interface ProjectSliderProps {
    selectedProject: Project | null;
    setSelectedProject: (project: Project | null) => void;
}

export default function ProjectSlider({ selectedProject, setSelectedProject }: ProjectSliderProps) {
    const { t } = useGlobal();
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [showSidebar, setShowSidebar] = useState(true);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const { playClick, playSwoosh } = useSoundEffect();

    // Reset active image when project changes
    useEffect(() => {
        if (selectedProject) {
            setActiveImage(selectedProject.image);
        }
    }, [selectedProject]);

    return (
        <section id="gallery-showcase" className="relative w-full py-16 md:py-48 bg-transparent px-4 md:px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto mb-24 text-center">
                <h2 className="text-3xl md:text-8xl font-display font-bold text-white mb-4 md:mb-8 tracking-tighter leading-none">
                    FEATURED <span className="text-accent text-glow">{t("nav.projects")}</span>
                </h2>
                <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em]">PREMIUM ARTIFACTS SHOWCASE</p>
            </div>

            {/* Horizontal Auto-sliding Gallery (Decoration/Pajangan) */}
            <div className="relative w-full overflow-hidden py-10">
                <motion.div
                    animate={isAutoPlaying ? { x: [0, -100 * projects.length] } : {}}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    onHoverStart={() => setIsAutoPlaying(false)}
                    onHoverEnd={() => setIsAutoPlaying(true)}
                    className="flex gap-8 px-4"
                >
                    {[...projects, ...projects].map((project, idx) => (
                        <motion.div
                            key={`${project.id}-${idx}`}
                            onClick={() => setSelectedProject(project)}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="relative w-[80vw] max-w-[320px] md:max-w-none md:w-[450px] aspect-[4/5] shrink-0 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden glass-card border border-white/5 cursor-pointer shadow-3xl group"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-10 flex flex-col justify-end">
                                <span className="text-accent font-mono text-[8px] md:text-[9px] tracking-widest uppercase mb-2 md:mb-4">{project.category}</span>
                                <h3 className="text-base md:text-3xl font-display font-bold text-white tracking-tight leading-none">{project.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* macOS Tahoe Style Dashboard Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 md:p-12 overflow-hidden">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/95"
                        />

                        {/* macOS Window */}
                        <motion.div
                            layoutId={`project-${selectedProject.id}`}
                            initial={{ scale: 0.9, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 100 }}
                            className="relative w-full max-w-7xl h-[100vh] md:h-[92vh] bg-[#0c0c0c] md:bg-[#0c0c0c]/90 rounded-none md:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border-0 md:border border-white/5"
                        >
                            {/* Window Header — iOS pill on mobile, macOS traffic lights on desktop */}
                            <div className="h-12 md:h-14 w-full bg-white/[0.03] border-b border-white/5 flex items-center px-4 md:px-8 justify-between shrink-0">
                                {/* Mobile: drag pill + back text */}
                                <div className="flex md:hidden items-center gap-3 w-full">
                                    <button onClick={() => { playSwoosh(); setSelectedProject(null); }} className="text-accent font-mono text-xs uppercase tracking-wider">✕ Close</button>
                                    <div className="flex-1 flex justify-center">
                                        <div className="w-8 h-1 bg-white/20 rounded-full" />
                                    </div>
                                    <span className="text-white/20 font-mono text-[9px]">v5.4</span>
                                </div>
                                {/* Desktop: macOS traffic lights */}
                                <div className="hidden md:flex gap-2.5">
                                    <div onClick={() => { playSwoosh(); setSelectedProject(null); }} className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-[0_0_10px_rgba(255,95,86,0.3)]" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="hidden md:flex items-center gap-10 text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
                                    <button onClick={() => setShowSidebar(!showSidebar)} className={`flex items-center gap-2.5 transition-colors ${showSidebar ? "text-accent" : "hover:text-white"}`}>
                                        <Sidebar size={14} /> Sidebar
                                    </button>
                                    <span className="flex items-center gap-2.5 opacity-50"><Grid3X3 size={14} /> Gallery</span>
                                    <span className="flex items-center gap-2.5 opacity-50"><Camera size={14} /> Assets</span>
                                </div>
                                <div className="hidden md:flex w-16 h-8 bg-white/5 rounded-lg items-center justify-center text-white/20 font-mono text-[9px] tracking-widest border border-white/5">
                                    v5.4.1
                                </div>
                            </div>

                            <div className="flex-1 flex overflow-hidden">
                                {/* Sidebar (Stage Manager Mode) */}
                                <AnimatePresence>
                                    {showSidebar && (
                                        <motion.div
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 100, opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            className="hidden lg:flex w-[100px] bg-black/50 border-r border-white/5 flex-col items-center py-12 gap-10 overflow-hidden shrink-0"
                                        >
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className="relative group cursor-pointer">
                                                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all group-hover:scale-110 group-hover:border-accent group-hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:bg-white/[0.06] shadow-2xl">
                                                        <img src={selectedProject.image} className="w-full h-full object-cover opacity-20 grayscale scale-150 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" />
                                                    </div>
                                                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-[0_0_10px_#7c3aed]" />
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Main Area Container */}
                                <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gradient-radial from-[#111] to-black">
                                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                                        <div className="p-4 md:p-20 max-w-7xl mx-auto w-full">

                                            {/* Hero Grid Section */}
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-20 mb-16 md:mb-32 items-center">
                                                <div className="lg:col-span-6">
                                                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-accent/5 border border-accent/20 rounded-full text-[10px] font-black text-accent uppercase tracking-[0.5em] mb-10 shadow-glow-sm">
                                                            Project Identifier // 0x48{selectedProject.id.split('-')[1] || 'C'}
                                                        </div>
                                                        <h2 className="text-2xl md:text-7xl lg:text-9xl font-display font-black text-white mb-4 md:mb-10 tracking-tighter leading-[0.85] uppercase italic drop-shadow-lg">
                                                            {selectedProject.title}
                                                        </h2>
                                                        <p className="text-white/60 text-sm md:text-2xl font-light leading-relaxed mb-6 md:mb-12 max-w-2xl">
                                                            {selectedProject.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-3 mb-16">
                                                            {selectedProject.tags.map(tag => (
                                                                <span key={tag} className="px-6 py-2.5 bg-white/[0.03] border border-white/5 rounded-2xl text-[11px] text-white/30 uppercase tracking-[0.3em] font-mono shadow-xl hover:text-white hover:bg-white/5 transition-all">
                                                                    #{tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                <div className="lg:col-span-6">
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="aspect-square lg:aspect-[4/5] rounded-[2rem] lg:rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.6)] relative group bg-black w-full cursor-grab active:cursor-grabbing"
                                                        drag="x"
                                                        dragConstraints={{ left: 0, right: 0 }}
                                                        dragElastic={0.2}
                                                        onDragEnd={(e, { offset }) => {
                                                            if (offset.x < -50 || offset.x > 50) {
                                                                // Simulate swiping to another photo conceptually by randomizing the picsum seed ID
                                                                setActiveImage(`https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/800/800`);
                                                            }
                                                        }}
                                                    >
                                                        <AnimatePresence mode="wait">
                                                            <motion.img
                                                                key={activeImage || selectedProject.image}
                                                                initial={{ opacity: 0, x: 50 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: -50 }}
                                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                                src={activeImage || selectedProject.image}
                                                                alt="Hero"
                                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 absolute inset-0"
                                                            />
                                                        </AnimatePresence>
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
                                                        <div className="absolute bottom-4 left-4 right-4 md:bottom-12 md:left-12 md:right-12 flex justify-between items-end text-white/50 font-mono text-[8px] md:text-[9px] uppercase tracking-widest pointer-events-none">
                                                            <div className="hidden md:block">Resolution: 3840x2160</div>
                                                            <div className="px-3 py-1 md:px-5 md:py-2 glass-card rounded-lg md:rounded-xl border border-white/10">Build ID: 884-XQ</div>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Photo Gallery Asset Viewer (Photos App Style) */}
                                            <div className="space-y-12">
                                                <div className="flex justify-between items-end border-b border-white/5 pb-10">
                                                    <div>
                                                        <h4 className="text-xl md:text-4xl font-display font-black text-white tracking-tight uppercase italic">{t("projects.gallery")}</h4>
                                                        <p className="text-white/20 font-mono text-[10px] uppercase mt-3 tracking-[0.6em]">System Asset Management v2.0</p>
                                                    </div>
                                                    <div className="hidden md:flex gap-4">
                                                        <div onClick={() => alert("Sorting by Latest Assets...")} className="px-6 py-3 glass-card rounded-2xl border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest cursor-pointer hover:bg-white/5 transition-all">Latest</div>
                                                        <div onClick={() => alert("Filtering Favorites...")} className="px-6 py-3 glass-card rounded-2xl border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest cursor-pointer hover:bg-white/5 transition-all">Favorites</div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
                                                    {Array.from({ length: 20 }, (_, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            whileHover={{ scale: 1.05, y: -4 }}
                                                            onClick={() => { playClick(); setActiveImage(`https://picsum.photos/seed/${selectedProject.id}g${idx}/800/800`); }}
                                                            className="aspect-square bg-white/[0.04] rounded-xl md:rounded-3xl overflow-hidden border border-white/10 cursor-pointer shadow-xl group/img relative"
                                                        >
                                                            <img
                                                                src={`https://picsum.photos/seed/${selectedProject.id}g${idx}/800/800`}
                                                                alt="Gallery item"
                                                                loading="lazy"
                                                                className="w-full h-full object-cover opacity-60 group-hover/img:opacity-100 transition-all duration-700 group-hover/img:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none" />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer (Dynamic Dock) */}
                            <div className="h-16 md:h-28 w-full bg-black/80 border-t border-white/5 flex items-center justify-center px-4 md:p-10 shrink-0 relative z-20 gap-4 md:gap-10">
                                <button onClick={() => setSelectedProject(null)} className="h-10 md:h-14 px-6 md:px-12 bg-white/[0.03] border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 rounded-xl md:rounded-2xl text-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] transition-all shadow-xl">
                                    {t("projects.close")}
                                </button>
                                <a href={selectedProject.live || "#"} target="_blank" className="h-10 md:h-14 px-8 md:px-16 bg-accent rounded-xl md:rounded-2xl text-white text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.6em] flex items-center gap-2 md:gap-5 shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:scale-105 active:scale-95 transition-all border border-white/30 border-opacity-50">
                                    {t("projects.launch")} <ExternalLink size={14} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
