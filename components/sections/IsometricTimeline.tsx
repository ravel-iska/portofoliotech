import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Server, Cpu, Network, ArrowRightCircle, X } from "lucide-react";

export default function IsometricTimeline() {
    const [selectedNode, setSelectedNode] = useState<{ title: string, desc: string, tech: string } | null>(null);
    return (
        <section className="relative w-full min-h-[80vh] bg-[#0c0c0c] py-16 overflow-hidden flex items-center justify-center">

            {/* Background Data Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 165, 0, 0.4) 1px, transparent 1px)`, backgroundSize: '40px 40px', transform: 'perspective(1000px) rotateX(60deg)', transformOrigin: 'top' }} />

            <div className="absolute top-20 left-10 md:left-20 z-20">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} viewport={{ once: true, margin: "-50px" }}>
                    <h2 className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter mb-4">
                        SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">INFRASTRUCTURE</span>
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-px bg-orange-400" />
                        <p className="text-white/40 font-mono text-xs tracking-[0.4em] uppercase">Interactive 3D Pipeline</p>
                    </div>
                </motion.div>
            </div>

            {/* Info Modal */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-10 right-10 md:right-20 z-50 p-8 glass-card border border-white/10 rounded-[2rem] max-w-sm shadow-2xl"
                    >
                        <button onClick={() => setSelectedNode(null)} className="absolute top-6 right-6 text-white/20 hover:text-white">
                            <X size={18} />
                        </button>
                        <h4 className="text-orange-400 font-display font-bold text-xl uppercase tracking-tighter mb-2 italic">{selectedNode.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed mb-4 font-light">{selectedNode.desc}</p>
                        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Stack:</span>
                            <span className="text-[10px] font-mono text-orange-400/80 uppercase tracking-widest">{selectedNode.tech}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Native CSS 3D Pipeline replacing broken Spline */}
            <div className="relative z-10 w-full max-w-5xl mx-auto mt-32 h-[600px] flex items-center justify-center">

                {/* Visual Connector Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent -translate-y-1/2 z-0" />

                <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-0 gap-16 md:gap-0 z-10">
                    {/* Node 1: Edge Computing */}
                    <motion.div
                        whileHover={{ scale: 1.1, y: -10 }}
                        onClick={() => setSelectedNode({
                            title: "Edge Network",
                            desc: "Hyper-optimized global content delivery. Minimizing TTFB for a fluid Vibe Experience.",
                            tech: "React / Next.js / Vercel"
                        })}
                        className="relative group cursor-pointer"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-black/60 border border-orange-500/30 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.15)] group-hover:border-orange-400 group-hover:shadow-[0_0_80px_rgba(249,115,22,0.3)] transition-all">
                            <Cpu size={48} className="text-orange-500/80 group-hover:text-orange-400" />
                        </div>
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-max">
                            <p className="text-white font-mono font-bold">EDGE NETWORK</p>
                            <p className="text-white/30 text-xs font-mono">React / Next.js</p>
                        </div>
                    </motion.div>

                    <ArrowRightCircle size={24} className="text-orange-500/30 hidden md:block" />

                    {/* Node 2: Database Storage */}
                    <motion.div
                        whileHover={{ scale: 1.1, y: -10 }}
                        onClick={() => setSelectedNode({
                            title: "Data Warehouse",
                            desc: "Distributed persistent storage with high-availability clustering and sub-millisecond query indexing.",
                            tech: "PostgreSQL / Redis / Prisma"
                        })}
                        initial={{ y: 20 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative group cursor-pointer"
                    >
                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-black/60 border border-rose-500/30 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.15)] group-hover:border-rose-400 group-hover:shadow-[0_0_80px_rgba(244,63,94,0.3)] transition-all z-10 relative">
                            <Database size={64} className="text-rose-500/80 group-hover:text-rose-400" />
                            {/* Glowing Core */}
                            <div className="absolute inset-0 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20" />
                        </div>
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-max">
                            <p className="text-white font-mono font-bold">DATA WAREHOUSE</p>
                            <p className="text-white/30 text-xs font-mono">PostgreSQL / Redis</p>
                        </div>
                    </motion.div>

                    <ArrowRightCircle size={24} className="text-rose-500/30 hidden md:block" />

                    {/* Node 3: Server Architecture */}
                    <motion.div
                        whileHover={{ scale: 1.1, y: -10 }}
                        onClick={() => setSelectedNode({
                            title: "Cloud Servers",
                            desc: "Containerized microservices orchestration, handling parallel traffic with zero-downtime deployments.",
                            tech: "AWS / Docker / K8s"
                        })}
                        className="relative group cursor-pointer"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-black/60 border border-purple-500/30 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.15)] group-hover:border-purple-400 group-hover:shadow-[0_0_80px_rgba(168,85,247,0.3)] transition-all hover:rotate-3">
                            <Server size={48} className="text-purple-500/80 group-hover:text-purple-400" />
                        </div>
                        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-max">
                            <p className="text-white font-mono font-bold">CLOUD SERVERS</p>
                            <p className="text-white/30 text-xs font-mono">AWS / Docker / K8s</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-10 left-10 z-20">
                <p className="text-white/30 font-mono text-xs uppercase tracking-widest"><Network className="inline mr-2" size={14} /> Node Pipeline Operational</p>
            </div>
        </section>
    );
}
