"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Cpu, ArrowRightLeft, ShieldCheck } from "lucide-react";
import { useGlobal } from "@/components/core/GlobalProvider";

export default function QuantumArbitrageVisualizer() {
    const { t } = useGlobal();
    const [isSimulating, setIsSimulating] = useState(false);
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const [profit, setProfit] = useState(0.00);

    const triggerSimulation = () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setProfit(0);

        const nodes = [1, 2, 3, 4];
        let currentStep = 0;

        const interval = setInterval(() => {
            setActiveNode(nodes[currentStep]);
            setProfit(prev => prev + (Math.random() * 24.5)); // Accumulate fake profit

            currentStep++;
            if (currentStep >= nodes.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsSimulating(false);
                    setActiveNode(null);
                }, 1000);
            }
        }, 800); // Step duration
    };

    return (
        <section className="relative w-full py-24 px-6 overflow-hidden bg-black border-t border-white/5">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-accent/10 to-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 items-center">

                {/* Left Content */}
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold font-mono tracking-widest uppercase">
                        <Zap size={14} /> Web3 Innovation
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                        {t("quantum.subtitle")} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-400">{t("quantum.title")}</span>
                    </h2>
                    <p className="text-white/60 font-light leading-relaxed max-w-lg text-lg">
                        {t("quantum.desc")}
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                        <button
                            onClick={triggerSimulation}
                            disabled={isSimulating}
                            className={`px-8 py-4 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-300 flex items-center gap-3 ${isSimulating
                                ? 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed'
                                : 'bg-gradient-to-r from-accent to-emerald-500 hover:scale-105 text-white shadow-[0_0_30px_rgba(0,255,135,0.3)]'
                                }`}
                        >
                            {isSimulating ? <Activity className="animate-spin" /> : <Cpu />}
                            {isSimulating ? t("quantum.simulating") : t("quantum.execute")}
                        </button>

                        <div className="glass-card px-6 py-3 rounded-xl border border-white/10 flex flex-col">
                            <span className="text-[10px] text-white/40 font-mono tracking-widest uppercase">{t("quantum.est_profit")}</span>
                            <span className="text-2xl font-mono font-bold text-emerald-400">
                                +${profit.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right 3D Visualizer Canvas */}
                <div className="flex-1 w-full aspect-square relative perspective-[1000px]">
                    <div className="absolute inset-0 glass-card rounded-[3rem] border border-white/10 shadow-2xl flexItems transition-transform duration-1000 transform-style-3d hover:rotate-y-[-10deg] hover:rotate-x-[5deg]">

                        {/* 3D Isometric Viewport */}
                        <div className="w-full h-full relative rotate-x-[45deg] scale-75 rotate-z-[-45deg] transform-style-3d">

                            {/* Base Grid Board */}
                            <div className="absolute inset-0 border-2 border-white/5 rounded-2xl bg-white/[0.02] shadow-[0_0_50px_rgba(255,255,255,0.05)]" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

                            {/* Node 1: Mempool Detection */}
                            <div className={`absolute top-[10%] left-[10%] w-24 h-24 rounded-2xl glass flex items-center justify-center border-2 transition-all duration-500 transform translate-z-[40px] shadow-2xl ${activeNode === 1 ? 'border-accent bg-accent/20 scale-110 shadow-[0_0_50px_rgba(0,255,135,0.5)]' : 'border-white/10 bg-black/40'}`}>
                                <Activity strokeWidth={1} className={activeNode === 1 ? 'text-accent animate-pulse' : 'text-white/40'} size={32} />
                                <span className="absolute -bottom-8 text-[10px] font-mono text-white/60 tracking-widest whitespace-nowrap">1. MemPool Scanner</span>
                            </div>

                            {/* Node 2: Flash Loan Engine */}
                            <div className={`absolute top-[20%] right-[10%] w-24 h-24 rounded-2xl glass flex items-center justify-center border-2 transition-all duration-500 transform translate-z-[80px] shadow-2xl ${activeNode === 2 ? 'border-yellow-400 bg-yellow-400/20 scale-110 shadow-[0_0_50px_rgba(250,204,21,0.5)]' : 'border-white/10 bg-black/40'}`}>
                                <Zap strokeWidth={1} className={activeNode === 2 ? 'text-yellow-400 animate-pulse' : 'text-white/40'} size={32} />
                                <span className="absolute -bottom-8 text-[10px] font-mono text-white/60 tracking-widest whitespace-nowrap">2. AAVE Flash Loan</span>
                            </div>

                            {/* Node 3: DEX Arbitrage Execution */}
                            <div className={`absolute bottom-[20%] right-[20%] w-32 h-32 rounded-[2rem] glass flex items-center justify-center border-2 transition-all duration-500 transform translate-z-[60px] shadow-2xl ${activeNode === 3 ? 'border-purple-500 bg-purple-500/20 scale-110 shadow-[0_0_50px_rgba(168,85,247,0.5)]' : 'border-white/10 bg-black/40'}`}>
                                <ArrowRightLeft strokeWidth={1} className={activeNode === 3 ? 'text-purple-500 animate-spin-slow' : 'text-white/40'} size={40} />
                                <span className="absolute -bottom-8 text-[10px] font-mono text-white/60 tracking-widest whitespace-nowrap">3. Uni/Sushi Execution</span>
                            </div>

                            {/* Node 4: Secure Profit */}
                            <div className={`absolute bottom-[10%] left-[20%] w-20 h-20 rounded-2xl glass flex items-center justify-center border-2 transition-all duration-500 transform translate-z-[30px] shadow-2xl ${activeNode === 4 ? 'border-emerald-400 bg-emerald-400/20 scale-110 shadow-[0_0_50px_rgba(52,211,153,0.5)]' : 'border-white/10 bg-black/40'}`}>
                                <ShieldCheck strokeWidth={1} className={activeNode === 4 ? 'text-emerald-400 animate-pulse' : 'text-white/40'} size={28} />
                                <span className="absolute -bottom-8 text-[10px] font-mono whitespace-nowrap tracking-widest text-emerald-400">4. Return + Profit</span>
                            </div>

                            {/* Animated SVG Laser Beams */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none transform translate-z-[20px]">
                                {/* Path 1 to 2 */}
                                <path d="M 80 80 Q 250 80 320 120" fill="transparent" stroke={activeNode === 1 || activeNode === 2 ? '#00ff87' : 'rgba(255,255,255,0.1)'} strokeWidth="3" className={`transition-all duration-500 ${activeNode === 1 ? 'animate-pulse' : ''}`} strokeDasharray="5,5" />
                                {/* Path 2 to 3 */}
                                <path d="M 320 160 Q 320 250 280 280" fill="transparent" stroke={activeNode === 2 || activeNode === 3 ? '#eab308' : 'rgba(255,255,255,0.1)'} strokeWidth="3" className={`transition-all duration-500 ${activeNode === 2 ? 'animate-pulse' : ''}`} strokeDasharray="5,5" />
                                {/* Path 3 to 4 */}
                                <path d="M 220 300 Q 150 300 120 280" fill="transparent" stroke={activeNode === 3 || activeNode === 4 ? '#a855f7' : 'rgba(255,255,255,0.1)'} strokeWidth="3" className={`transition-all duration-500 ${activeNode === 3 ? 'animate-pulse' : ''}`} strokeDasharray="5,5" />
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
