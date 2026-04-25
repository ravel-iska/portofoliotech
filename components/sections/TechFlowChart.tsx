"use client";

import { motion } from "framer-motion";
import { useGlobal } from "@/components/core/GlobalProvider";
import {
    Globe, Database, Server, Code2, Smartphone,
    ArrowDown, ArrowRight, Zap, Shield, Layers
} from "lucide-react";

const flowSteps = [
    {
        id: "frontend",
        icon: Code2,
        label: "Frontend",
        tech: "React / Next.js",
        color: "#00ff87",
        desc: "UI Components & SSR"
    },
    {
        id: "api",
        icon: Server,
        label: "API Layer",
        tech: "Node.js / Edge",
        color: "#00b8ff",
        desc: "REST & GraphQL"
    },
    {
        id: "data",
        icon: Database,
        label: "Data Store",
        tech: "PostgreSQL / Redis",
        color: "#a855f7",
        desc: "ORM & Caching"
    },
    {
        id: "web3",
        icon: Shield,
        label: "Web3",
        tech: "Solidity / EVM",
        color: "#ff9000",
        desc: "Smart Contracts"
    },
    {
        id: "deploy",
        icon: Globe,
        label: "Deploy",
        tech: "Vercel / Docker",
        color: "#f43f5e",
        desc: "CI/CD Pipeline"
    },
];

export default function TechFlowChart() {
    return (
        <section className="relative w-full py-10 px-4 md:px-6 bg-[#141825] border-t border-white/5 overflow-hidden">
            <div className="max-w-5xl mx-auto relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold font-mono tracking-widest uppercase mb-3">
                            <Layers size={12} /> Tech Pipeline
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tighter leading-none">
                            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] to-[#00b8ff]">Architecture</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-white/30 text-[10px] font-mono uppercase tracking-widest"
                    >
                        <Zap size={12} className="text-accent" /> Full-Stack Flow
                    </motion.div>
                </div>

                {/* Flow Chart - Horizontal on desktop, Vertical on mobile */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-0">
                    {flowSteps.map((step, i) => (
                        <div key={step.id} className="flex flex-col md:flex-row items-center">
                            {/* Node Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative w-[160px] md:w-[150px] p-4 rounded-2xl bg-white/[0.04] border-2 border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] text-center cursor-default"
                            >
                                {/* Icon */}
                                <div
                                    className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                                    style={{ backgroundColor: `${step.color}20`, border: `1px solid ${step.color}40` }}
                                >
                                    <step.icon size={20} style={{ color: step.color }} />
                                </div>

                                {/* Label */}
                                <h3 className="text-white font-display font-bold text-sm tracking-tight mb-1">{step.label}</h3>
                                <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">{step.tech}</p>
                                <p className="text-[9px] text-white/30 font-mono uppercase tracking-wider">{step.desc}</p>

                                {/* Step Number */}
                                <div
                                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[8px] font-bold flex items-center justify-center text-white"
                                    style={{ backgroundColor: step.color }}
                                >
                                    {i + 1}
                                </div>
                            </motion.div>

                            {/* Arrow connector (not after last item) */}
                            {i < flowSteps.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 + 0.15 }}
                                    className="text-white/20 py-2 md:px-2 md:py-0"
                                >
                                    <ArrowDown size={16} className="block md:hidden" />
                                    <ArrowRight size={16} className="hidden md:block" />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
