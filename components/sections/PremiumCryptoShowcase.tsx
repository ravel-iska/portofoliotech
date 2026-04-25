"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, Activity, Code, Layers, ArrowUpRight, TrendingUp, BookOpen } from "lucide-react";
import { useGlobal } from "@/components/core/GlobalProvider";
import AuditBookModal from "@/components/ui/AuditBookModal";

export default function PremiumCryptoShowcase() {
    const { t } = useGlobal();
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const metrics = [
        { title: t("showcase.metric1"), value: "142+", icon: <Code size={20} className="text-blue-400" />, trend: "+12%" },
        { title: t("showcase.metric2"), value: "$84.2M", icon: <Activity size={20} className="text-emerald-400" />, trend: "+4.5%" },
        { title: t("showcase.metric3"), value: "32.4%", icon: <TrendingUp size={20} className="text-orange-400" />, trend: "+2.1%" },
        { title: t("showcase.metric4"), value: "8", icon: <Layers size={20} className="text-purple-400" />, trend: "Active" },
    ];

    return (
        <section className="relative w-full py-24 bg-[#121826] overflow-hidden border-t border-white/5">
            {/* Subtle Gradient Backdrops */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="space-y-4"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <Wallet size={12} className="text-blue-400" />
                            <span className="text-white/60 font-mono text-[10px] uppercase tracking-widest">Web3 Identity</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-light text-white tracking-tight">
                            {t("showcase.title")} <br className="hidden md:block" />
                            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">{t("showcase.subtitle")}</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="text-white/40 font-mono text-xs max-w-xs leading-relaxed"
                    >
                        {t("showcase.desc")}
                    </motion.div>
                </div>

                {/* Dashboard / Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Main Feature Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 relative p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 glass-card overflow-hidden group cursor-pointer"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-blue-400" />
                                <path d="M50 20L75.9808 35V65L50 80L24.0192 65V35L50 20Z" stroke="currentColor" strokeWidth="1" className="text-emerald-400" />
                            </svg>
                        </div>

                        <div className="relative z-10 w-full h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-display font-medium text-white mb-2 group-hover:text-blue-400 transition-colors">{t("showcase.card1.title")}</h3>
                                <p className="text-white/40 font-mono text-sm max-w-md leading-relaxed">
                                    {t("showcase.card1.desc")}
                                </p>
                            </div>

                            <div className="mt-12 flex items-center gap-4">
                                <button
                                    onClick={() => setIsBookOpen(true)}
                                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                                >
                                    {t("showcase.card1.cta")} <BookOpen size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {metrics.slice(0, 2).map((metric, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 glass-card flex flex-col justify-between"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                        {metric.icon}
                                    </div>
                                    <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md">{metric.trend}</span>
                                </div>
                                <div>
                                    <h4 className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-1">{metric.title}</h4>
                                    <p className="text-3xl font-display font-bold text-white">{metric.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {metrics.slice(2, 4).map((metric, i) => (
                            <motion.div
                                key={i + 2}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/10 glass-card flex flex-col justify-between"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                        {metric.icon}
                                    </div>
                                    <span className={`text-xs font-mono px-2 py-1 rounded-md ${metric.trend.includes('+') ? 'text-emerald-400 bg-emerald-400/10' : 'text-blue-400 bg-blue-400/10'}`}>{metric.trend}</span>
                                </div>
                                <div>
                                    <h4 className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-1">{metric.title}</h4>
                                    <p className="text-3xl font-display font-bold text-white">{metric.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            <AuditBookModal isOpen={isBookOpen} onClose={() => setIsBookOpen(false)} />
        </section>
    );
}
