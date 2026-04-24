"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutGrid,
    Calendar,
    Heart,
    Folder,
    Camera,
    Maximize2,
    Search,
    Sidebar as SidebarIcon,
    ChevronRight,
    Star,
    Image as ImageIcon,
    User,
    Settings,
    MoreHorizontal,
    Share2,
    Download
} from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { useGlobal } from "@/components/core/GlobalProvider";

interface Memory {
    id: string;
    title: string;
    date: string;
    image: string;
    category: "trips" | "personal" | "work" | "stars";
    isFavorite: boolean;
}

const mockMemories: Memory[] = [
    { id: "m1", title: "Midnight City Lights", date: "2024-03-12", image: "/projects/project-1.webp", category: "personal", isFavorite: true },
    { id: "m2", title: "Alpine Expedition", date: "2024-01-05", image: "/projects/project-2.webp", category: "trips", isFavorite: false },
    { id: "m3", title: "Cyber Studio Vibe", date: "2023-11-20", image: "/projects/project-3.webp", category: "work", isFavorite: true },
    { id: "m4", title: "Urban Sunset", date: "2023-09-15", image: "/projects/project-4.webp", category: "personal", isFavorite: false },
    { id: "m5", title: "Monolith Architecture", date: "2024-02-14", image: "/projects/project-2.webp", category: "work", isFavorite: false },
    { id: "m6", title: "Oceanic Tranquility", date: "2023-07-10", image: "/projects/project-1.webp", category: "trips", isFavorite: true },
];

export default function MemoryGallery() {
    const { t } = useGlobal();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

    const filteredMemories = mockMemories.filter(m =>
        selectedCategory === "all" || m.category === selectedCategory || (selectedCategory === "stars" && m.isFavorite)
    );

    return (
        <section id="memories" className="relative py-32 px-6 min-h-screen bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto h-[800px] glass-card rounded-[2.5rem] border border-white/10 overflow-hidden flex shadow-[0_0_100px_rgba(0,0,0,0.5)]">

                {/* macOS Sidebar */}
                <AnimatePresence initial={false}>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 300, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="h-full bg-white/[0.02] border-r border-white/5 backdrop-blur-3xl overflow-hidden flex flex-col"
                        >
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-10">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                                        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                                    </div>
                                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] ml-2">Vibe.Photos</span>
                                </div>

                                <div className="space-y-1">
                                    <SidebarLink
                                        icon={<ImageIcon size={16} />}
                                        label="Library"
                                        active={selectedCategory === "all"}
                                        onClick={() => setSelectedCategory("all")}
                                    />
                                    <SidebarLink
                                        icon={<Star size={16} />}
                                        label="Favorites"
                                        active={selectedCategory === "stars"}
                                        onClick={() => setSelectedCategory("stars")}
                                    />
                                    <SidebarLink
                                        icon={<LayoutGrid size={16} />}
                                        label="Recents"
                                        active={false}
                                    />
                                </div>

                                <div className="mt-10 mb-4 px-2 text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">Albums</div>
                                <div className="space-y-1">
                                    <SidebarLink
                                        icon={<Folder size={16} />}
                                        label="Personal"
                                        active={selectedCategory === "personal"}
                                        onClick={() => setSelectedCategory("personal")}
                                    />
                                    <SidebarLink
                                        icon={<Folder size={16} />}
                                        label="Trips"
                                        active={selectedCategory === "trips"}
                                        onClick={() => setSelectedCategory("trips")}
                                    />
                                    <SidebarLink
                                        icon={<Folder size={16} />}
                                        label="Professional"
                                        active={selectedCategory === "work"}
                                        onClick={() => setSelectedCategory("work")}
                                    />
                                </div>
                            </div>

                            <div className="mt-auto p-8 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold">BP</div>
                                    <div>
                                        <div className="text-[10px] font-bold text-white leading-none">Bagus P.</div>
                                        <div className="text-[8px] text-white/30 uppercase tracking-widest mt-1">iCloud Paired</div>
                                    </div>
                                </div>
                                <Settings size={14} className="text-white/20 hover:text-white transition-colors cursor-pointer" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <div className="flex-1 h-full flex flex-col bg-black/20 overflow-hidden">
                    {/* Header bar */}
                    <div className="h-20 w-full bg-white/[0.02] border-b border-white/5 backdrop-blur-md flex items-center justify-between px-10 shrink-0">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                            >
                                <SidebarIcon size={18} />
                            </button>
                            <h2 className="text-xl font-display font-bold text-white tracking-tight">{t("nav.memories")}</h2>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search library..."
                                    className="bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-[10px] text-white focus:outline-none focus:border-accent/40 w-48 transition-all"
                                />
                            </div>
                            <button className="p-2 bg-accent/20 border border-accent/30 rounded-full text-accent hover:bg-accent hover:text-white transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                                <Camera size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Grid */}
                    <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredMemories.map((memory, i) => (
                                <motion.div
                                    key={memory.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setSelectedMemory(memory)}
                                    className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl"
                                >
                                    <ParallaxImage
                                        src={memory.image}
                                        alt={memory.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        parallaxOffset={15}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-mono text-accent uppercase tracking-widest">{memory.category}</span>
                                            {memory.isFavorite && <Heart size={12} className="text-red-500 fill-red-500" />}
                                        </div>
                                        <h3 className="text-white font-display font-bold text-lg leading-tight mb-1">{memory.title}</h3>
                                        <p className="text-white/40 text-[10px] font-mono">{memory.date}</p>
                                    </div>
                                    <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100">
                                        <Maximize2 size={14} className="text-white" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Viewer */}
            <AnimatePresence>
                {selectedMemory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-20"
                    >
                        <motion.button
                            onClick={() => setSelectedMemory(null)}
                            className="absolute top-10 right-10 p-4 bg-white/5 border border-white/10 rounded-full text-white/50 hover:text-white transition-all hover:bg-white/10"
                        >
                            <MoreHorizontal size={24} />
                        </motion.button>

                        <div className="flex flex-col lg:flex-row w-full max-w-7xl h-full gap-12">
                            <motion.div
                                layoutId={selectedMemory.id}
                                className="flex-1 relative rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10"
                            >
                                <img
                                    src={selectedMemory.image}
                                    alt={selectedMemory.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                                    <div className="glass p-8 rounded-[2rem] border border-white/10">
                                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-2">{selectedMemory.title}</h2>
                                        <div className="flex items-center gap-4 text-white/40 font-mono text-[10px] uppercase tracking-widest">
                                            <span>{selectedMemory.date}</span>
                                            <span className="text-accent">•</span>
                                            <span>Sony Alpha 7R IV</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
                                <div className="glass-card p-6 rounded-[2rem] border border-white/10">
                                    <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Actions</h4>
                                    <div className="space-y-3">
                                        <ActionButton
                                            icon={<Download size={16} />}
                                            label="Download Original"
                                            onClick={() => window.open(selectedMemory.image, "_blank")}
                                        />
                                        <ActionButton
                                            icon={<Share2 size={16} />}
                                            label="Share Memory"
                                            onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                        title: selectedMemory.title,
                                                        url: selectedMemory.image
                                                    }).catch(err => console.log(err));
                                                } else {
                                                    alert("Sharing not supported in this browser. Link copied: " + selectedMemory.image);
                                                }
                                            }}
                                        />
                                        <ActionButton
                                            icon={<Heart size={16} />}
                                            label="Mark as Favorite"
                                            onClick={() => {
                                                const favs = JSON.parse(localStorage.getItem("vibe_favs") || "[]");
                                                if (!favs.includes(selectedMemory.id)) {
                                                    localStorage.setItem("vibe_favs", JSON.stringify([...favs, selectedMemory.id]));
                                                    alert("Added to favorites!");
                                                } else {
                                                    alert("Already in favorites!");
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="glass-card p-6 rounded-[2rem] border border-white/10 flex-1 overflow-hidden flex flex-col">
                                    <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Metadata</h4>
                                    <div className="space-y-4 font-mono text-[9px] text-white/40 uppercase tracking-widest overflow-y-auto">
                                        <div className="flex justify-between"><span>Format</span><span className="text-white">HEIF</span></div>
                                        <div className="flex justify-between"><span>Size</span><span className="text-white">4.2 MB</span></div>
                                        <div className="flex justify-between"><span>Dimensions</span><span className="text-white">6000 x 4000</span></div>
                                        <div className="flex justify-between"><span>Location</span><span className="text-white">Bandung, ID</span></div>
                                        <div className="pt-6 mt-6 border-t border-white/5">
                                            <p className="normal-case leading-relaxed">Recorded with high-fidelity optics. Preserving the essence of the moment in digital crystal.</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedMemory(null)}
                                    className="w-full h-16 bg-white text-black font-display font-black uppercase tracking-[0.4em] rounded-2xl text-[10px] hover:scale-105 transition-transform active:scale-95"
                                >
                                    Close Inspector
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function SidebarLink({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ${active ? "bg-accent text-white shadow-lg" : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
        >
            <span className={`${active ? "text-white" : "text-white/20 group-hover:text-white"} transition-colors`}>{icon}</span>
            <span className="text-[11px] font-bold tracking-tight">{label}</span>
            {active && (
                <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
            )}
        </button>
    );
}

// Local UI Components
function ActionButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all group"
        >
            <span className="group-hover:scale-110 transition-transform">{icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
        </button>
    );
}
