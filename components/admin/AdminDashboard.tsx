"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Upload,
    Edit3,
    Settings,
    LogOut,
    Save,
    Plus,
    Trash2,
    Image as ImageIcon,
    Activity,
    Database,
    Zap
} from "lucide-react";
import { useGlobal } from "@/components/core/GlobalProvider";

export default function AdminDashboard() {
    const { t } = useGlobal();
    const [activeTab, setActiveTab] = useState<"overview" | "content" | "media">("overview");
    const [isSaving, setIsSaving] = useState(false);

    // Form states
    const [heroRole, setHeroRole] = useState("");
    const [aboutDesc, setAboutDesc] = useState("");

    useEffect(() => {
        setHeroRole(localStorage.getItem("vibe_hero_role") || t("hero.role"));
        setAboutDesc(localStorage.getItem("vibe_about_desc") || t("about.desc") || t("about.desc1"));
    }, [t]);

    const handleSave = () => {
        setIsSaving(true);
        localStorage.setItem("vibe_hero_role", heroRole);
        localStorage.setItem("vibe_about_desc", aboutDesc);

        setTimeout(() => {
            setIsSaving(false);
            window.location.reload();
        }, 1500);
    };

    return (
        <section id="admin" className="relative py-32 px-6 min-h-screen bg-transparent">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-6 mb-16">
                    <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent border border-accent/30 shadow-[0_0_40px_rgba(124,58,237,0.2)]">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
                            {t("admin.title")} <span className="text-accent">{t("admin.subtitle")}</span>
                        </h1>
                        <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em] mt-2">Administrative Command Center v1.0.4</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 space-y-2">
                        <AdminNavLink
                            icon={<Zap size={18} />}
                            label={t("admin.overview")}
                            active={activeTab === "overview"}
                            onClick={() => setActiveTab("overview")}
                        />
                        <AdminNavLink
                            icon={<Edit3 size={18} />}
                            label={t("admin.content")}
                            active={activeTab === "content"}
                            onClick={() => setActiveTab("content")}
                        />
                        <AdminNavLink
                            icon={<ImageIcon size={18} />}
                            label={t("admin.media")}
                            active={activeTab === "media"}
                            onClick={() => setActiveTab("media")}
                        />
                        <div className="pt-10">
                            <AdminNavLink
                                icon={<LogOut size={18} />}
                                label={t("admin.exit")}
                                active={false}
                                onClick={() => window.location.hash = "#home"}
                            />
                        </div>
                    </div>

                    {/* Main Workspace */}
                    <div className="lg:col-span-3">
                        <div className="glass-card border border-white/10 rounded-[2.5rem] p-10 min-h-[600px] overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                {activeTab === "overview" && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-10"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <StatCard icon={<Activity size={16} />} label="Total Views" value="12,482" color="accent" />
                                            <StatCard icon={<Database size={16} />} label="Storage Used" value="84%" color="amber" />
                                            <StatCard icon={<Zap size={16} />} label="Build Status" value="Online" color="emerald" />
                                        </div>

                                        <div className="p-8 border border-white/5 bg-white/[0.02] rounded-3xl">
                                            <h3 className="text-xl font-display font-bold text-white mb-6">Recent Activity</h3>
                                            <div className="space-y-4">
                                                <ActivityItem label="Updated Hero Section" date="2 hours ago" />
                                                <ActivityItem label="Uploaded 12 new memories" date="Yesterday" />
                                                <ActivityItem label="Deployed core v2.4" date="3 days ago" />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "media" && (
                                    <motion.div
                                        key="media"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-10"
                                    >
                                        <div className="w-full aspect-video border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-white/20 hover:border-accent/40 hover:bg-accent/5 transition-all cursor-pointer group">
                                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Upload size={32} />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Drop files to sync with Drive</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-display font-bold text-white">Drive Assets</h3>
                                            <button className="flex items-center gap-3 px-6 py-3 bg-accent text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all">
                                                <Plus size={14} /> Add Folder
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="aspect-square bg-white/5 rounded-2xl border border-white/5 relative group">
                                                    <div className="absolute top-2 right-2 p-2 bg-red-500/20 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-500 hover:text-white">
                                                        <Trash2 size={12} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "content" && (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-2">Hero Role Text</label>
                                            <input
                                                type="text"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-accent/40 font-display text-lg"
                                                value={heroRole}
                                                onChange={(e) => setHeroRole(e.target.value)}
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-2">About Description</label>
                                            <textarea
                                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-8 text-white focus:outline-none focus:border-accent/40 font-light leading-relaxed min-h-[200px]"
                                                value={aboutDesc}
                                                onChange={(e) => setAboutDesc(e.target.value)}
                                            />
                                        </div>

                                        <button
                                            onClick={handleSave}
                                            className="w-full h-20 bg-accent text-white font-display font-black uppercase tracking-[0.5em] rounded-[2rem] text-[11px] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(124,58,237,0.3)] flex items-center justify-center gap-4"
                                        >
                                            {isSaving ? "Syncing Modules..." : <><Save size={18} /> Save All Changes</>}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AdminNavLink({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-5 p-6 rounded-3xl transition-all duration-500 group ${active ? "bg-accent/10 border border-accent/40 text-accent shadow-2xl" : "text-white/30 border border-transparent hover:bg-white/5 hover:text-white"
                }`}
        >
            <span className={`${active ? "text-accent" : "text-white/20 group-hover:text-white"}`}>{icon}</span>
            <span className="text-sm font-display font-bold tracking-tight">{label}</span>
            {active && (
                <motion.div layoutId="active-dot" className="ml-auto w-2 h-2 rounded-full bg-accent text-glow" />
            )}
        </button>
    );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
    const colorClasses: Record<string, string> = {
        accent: "text-accent bg-accent/10 border-accent/20",
        amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
        emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    };

    return (
        <div className={`p-6 rounded-3xl border ${colorClasses[color]} flex flex-col gap-4`}>
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{label}</span>
            </div>
            <div className="text-3xl font-display font-black leading-none">{value}</div>
        </div>
    );
}

function ActivityItem({ label, date }: { label: string, date: string }) {
    return (
        <div className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-all rounded-xl">
            <span className="text-sm text-white/60 font-light">{label}</span>
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{date}</span>
        </div>
    );
}
