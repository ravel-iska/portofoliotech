"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Cpu, ArrowRightLeft, ShieldCheck } from "lucide-react";
import { useGlobal } from "@/components/core/GlobalProvider";

const nodes = [
    { id: 1, label: "MemPool Scanner", icon: Activity, activeColor: "border-accent bg-accent/20", glowColor: "shadow-[0_0_30px_rgba(0,255,135,0.4)]", textColor: "text-accent" },
    { id: 2, label: "AAVE Flash Loan", icon: Zap, activeColor: "border-yellow-400 bg-yellow-400/20", glowColor: "shadow-[0_0_30px_rgba(250,204,21,0.4)]", textColor: "text-yellow-400" },
    { id: 3, label: "Uni/Sushi Execution", icon: ArrowRightLeft, activeColor: "border-purple-500 bg-purple-500/20", glowColor: "shadow-[0_0_30px_rgba(168,85,247,0.4)]", textColor: "text-purple-500" },
    { id: 4, label: "Return + Profit", icon: ShieldCheck, activeColor: "border-emerald-400 bg-emerald-400/20", glowColor: "shadow-[0_0_30px_rgba(52,211,153,0.4)]", textColor: "text-emerald-400" },
];

export default function QuantumArbitrageVisualizer() {
    const { t } = useGlobal();
    const [isSimulating, setIsSimulating] = useState(false);
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const [profit, setProfit] = useState(0.00);
    const [expandedNode, setExpandedNode] = useState<number | null>(null);

    const nodeDetails: Record<number, string> = {
        1: "Memindai Mempool blockchain secara real-time untuk mendeteksi transaksi besar yang tertunda. Menggunakan WebSocket direct ke node RPC untuk latensi sub-milisecond.",
        2: "Memanfaatkan Flash Loan dari AAVE untuk meminjam jutaan dolar tanpa agunan dalam satu transaksi atomik. Dana dikembalikan dalam blok yang sama.",
        3: "Mengeksekusi arbitrase harga antara DEX (Uniswap, SushiSwap, dll) dengan routing optimal melalui smart contract kustom untuk profit maksimal.",
        4: "Mengembalikan pinjaman flash loan + fee, lalu menyimpan profit bersih. Seluruh operasi terjadi dalam satu transaksi atomik yang aman.",
    };

    const triggerSimulation = () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setProfit(0);

        let currentStep = 0;
        const interval = setInterval(() => {
            setActiveNode(nodes[currentStep].id);
            setProfit(prev => prev + (Math.random() * 24.5));
            currentStep++;
            if (currentStep >= nodes.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsSimulating(false);
                    setActiveNode(null);
                }, 1000);
            }
        }, 800);
    };

    return (
        <section className="relative w-full py-6 px-4 md:px-6 overflow-hidden bg-[#141825] border-t border-white/5">
            {/* Ambient Background - smaller on mobile */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-gradient-to-tr from-accent/10 to-emerald-500/10 blur-[60px] md:blur-[80px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">

                {/* Left Content */}
                <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold font-mono tracking-widest uppercase">
                        <Zap size={12} /> Web3 Innovation
                    </div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-white leading-tight">
                        {t("quantum.subtitle")} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">{t("quantum.title")}</span>
                    </h2>
                    <p className="text-white/60 font-light leading-relaxed max-w-lg text-xs md:text-sm">
                        {t("quantum.desc")}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-4">
                        <button
                            onClick={triggerSimulation}
                            disabled={isSimulating}
                            className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold tracking-widest uppercase text-[9px] md:text-xs transition-all duration-300 flex items-center gap-2 ${isSimulating
                                ? 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed'
                                : 'bg-gradient-to-r from-accent to-emerald-500 hover:scale-105 text-white shadow-[0_0_30px_rgba(0,255,135,0.3)]'
                                }`}
                        >
                            {isSimulating ? <Activity className="animate-spin" size={14} /> : <Cpu size={14} />}
                            {isSimulating ? t("quantum.simulating") : t("quantum.execute")}
                        </button>

                        <div className="glass-card px-3 md:px-6 py-2 md:py-3 rounded-xl border border-white/10 flex flex-col">
                            <span className="text-[8px] md:text-[10px] text-white/40 font-mono tracking-widest uppercase">{t("quantum.est_profit")}</span>
                            <span className="text-lg md:text-2xl font-mono font-bold text-emerald-400">
                                +${profit.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right - System Infrastructure (responsive card layout on mobile) */}
                <div className="flex-1 w-full">
                    <h3 className="text-[9px] md:text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/30 mb-3">System Infrastructure</h3>
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                        {nodes.map((node) => {
                            const Icon = node.icon;
                            const isActive = activeNode === node.id;
                            const isExpanded = expandedNode === node.id;
                            return (
                                <motion.div
                                    key={node.id}
                                    onClick={() => setExpandedNode(isExpanded ? null : node.id)}
                                    className={`relative p-2 md:p-3 rounded-xl glass border-2 cursor-pointer transition-all duration-500 ${isActive ? `${node.activeColor} ${node.glowColor} scale-[1.02]` : 'border-white/10 bg-black/40 hover:bg-white/5'} ${isExpanded ? 'col-span-2' : ''}`}
                                    layout
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-xl ${isActive ? 'bg-white/10' : 'bg-white/5'}`}>
                                            <Icon strokeWidth={1.5} className={isActive ? `${node.textColor} animate-pulse` : 'text-white/40'} size={20} />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-mono text-white/60 font-bold">{node.id}.</span>
                                    </div>
                                    <p className="text-[10px] md:text-xs font-mono text-white/70 font-bold tracking-wide">{node.label}</p>

                                    {/* Expandable detail on click */}
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-3 pt-3 border-t border-white/10"
                                        >
                                            <p className="text-[11px] md:text-xs text-white/50 leading-relaxed">{nodeDetails[node.id]}</p>
                                        </motion.div>
                                    )}

                                    {/* Connection indicator */}
                                    {isActive && node.id < 4 && (
                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-white/20 hidden md:block" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
