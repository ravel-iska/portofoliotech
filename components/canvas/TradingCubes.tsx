"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Isometric 3D Cube Component
const Cube = ({ delay, color, x, z, scale = 1 }: { delay: number; color: string; x: number; z: number; scale?: number }) => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{
                y: [0, -15, 0],
                opacity: 1
            }}
            transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay },
                opacity: { duration: 1, delay: delay * 0.5 }
            }}
            className="absolute"
            style={{
                left: `${x}px`,
                top: `${z}px`,
                transformStyle: "preserve-3d",
                transform: `scale(${scale})`,
            }}
        >
            <div className="relative w-20 h-20" style={{ transformStyle: "preserve-3d", transform: "rotateX(60deg) rotateZ(-45deg)" }}>
                {/* Back / Shadow */}
                <div
                    className="absolute inset-0 bg-black/50 blur-xl"
                    style={{ transform: "translateZ(-40px)" }}
                />

                {/* Top Face */}
                <div
                    className={`absolute inset-0 border border-white/20 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]`}
                    style={{
                        backgroundColor: color,
                        transform: "translateZ(40px)",
                    }}
                >
                    {/* Inner glowing core */}
                    <div className="absolute inset-2 bg-white/20 blur-md rounded-full" />
                </div>

                {/* Left Face */}
                <div
                    className="absolute inset-0 border-l border-b border-white/10"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        transform: "rotateY(-90deg) translateZ(40px) translateY(40px) scaleY(2)",
                        transformOrigin: "bottom"
                    }}
                />

                {/* Right Face */}
                <div
                    className="absolute inset-0 border-r border-b border-white/10"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        transform: "rotateX(90deg) translateZ(40px) translateY(-40px) scaleY(2)",
                        transformOrigin: "bottom"
                    }}
                />
            </div>
        </motion.div>
    );
};

export default function TradingCubes() {
    const [selectedNode, setSelectedNode] = useState<{ name: string, status: string, info: string } | null>(null);

    return (
        <div className="relative w-full h-[400px] overflow-hidden rounded-[3rem] border border-white/10 glass-card bg-gradient-to-b from-[#141a2e] to-[#0e1220]">

            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="absolute top-32 left-10 z-30 p-6 glass-card border border-white/10 rounded-2xl max-w-[240px]"
                    >
                        <h4 className="text-white font-display font-bold mb-2 uppercase text-xs tracking-widest text-accent">{selectedNode.name}</h4>
                        <p className="text-white/40 text-[10px] font-mono leading-relaxed">{selectedNode.info}</p>
                        <p className="text-emerald-400 text-[8px] font-mono mt-3 uppercase tracking-tighter">Status: {selectedNode.status}</p>
                        <button
                            onClick={() => setSelectedNode(null)}
                            className="mt-4 text-[8px] text-white/20 hover:text-white uppercase tracking-[0.3em]"
                        >
                            [ DISMISS ]
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3D Scene Container */}
            <div className="absolute inset-0 flex items-center justify-center perspective-[2000px]">
                <div className="relative w-full h-full transform-gpu group cursor-pointer">
                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotateY: [0, 5, 0], rotateX: [0, -5, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div onClick={() => setSelectedNode({ name: "Core Hybrid Node", status: "Operational", info: "The primary execution engine cluster handling HFT requests across DEX layers." })} style={{ position: 'absolute', left: '40%', top: '42%' }}>
                            <Cube delay={0} color="rgba(0, 255, 135, 0.4)" x={0} z={0} scale={1.5} />
                        </div>

                        {/* Surrounding Cubes */}
                        <div onClick={() => setSelectedNode({ name: "Liquidity Relay", status: "Active", info: "Real-time relay node for Uniswap and SushiSwap liquidity monitoring." })} style={{ position: 'absolute', left: '20%', top: '25%' }}>
                            <Cube delay={0.2} color="rgba(59, 130, 246, 0.3)" x={0} z={0} />
                        </div>
                        <div onClick={() => setSelectedNode({ name: "MEV Guard", status: "Shielded", info: "Protective infrastructure preventing front-running on user trades." })} style={{ position: 'absolute', left: '60%', top: '25%' }}>
                            <Cube delay={0.4} color="rgba(147, 51, 234, 0.3)" x={0} z={0} />
                        </div>
                        <div onClick={() => setSelectedNode({ name: "RPC Endpoint", status: "Low Latency", info: "Dedicated private RPC for ultra-fast transaction propagation." })} style={{ position: 'absolute', left: '20%', top: '58%' }}>
                            <Cube delay={0.6} color="rgba(255, 42, 95, 0.3)" x={0} z={0} />
                        </div>
                        <div onClick={() => setSelectedNode({ name: "Archive Node", status: "Synced", info: "Historical data storage for strategy backtesting and analytics." })} style={{ position: 'absolute', left: '60%', top: '58%' }}>
                            <Cube delay={0.8} color="rgba(59, 130, 246, 0.2)" x={0} z={0} />
                        </div>

                        {/* Distant background cubes */}
                        <div style={{ position: 'absolute', left: '10%', top: '13%' }}>
                            <Cube delay={1.2} color="rgba(255, 255, 255, 0.1)" x={0} z={0} scale={0.7} />
                        </div>
                        <div style={{ position: 'absolute', left: '75%', top: '17%' }}>
                            <Cube delay={1.5} color="rgba(0, 255, 135, 0.1)" x={0} z={0} scale={0.8} />
                        </div>
                        <div style={{ position: 'absolute', left: '80%', top: '67%' }}>
                            <Cube delay={1.8} color="rgba(147, 51, 234, 0.1)" x={0} z={0} scale={0.6} />
                        </div>
                        <div style={{ position: 'absolute', left: '10%', top: '75%' }}>
                            <Cube delay={2.0} color="rgba(255, 42, 95, 0.1)" x={0} z={0} scale={0.9} />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Overlay Glass Elements */}
            <div className="absolute bottom-10 right-10 z-20 flex flex-col items-end gap-4 pointer-events-none">
                <div className="px-5 py-3 bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
                    <p className="text-[#00ff87] font-mono text-[10px] tracking-widest font-bold">LATENCY: 12ms</p>
                </div>
                <div className="px-5 py-3 bg-white/[0.02] border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
                    <p className="text-white/60 font-mono text-[10px] tracking-widest">UPTIME: 99.99%</p>
                </div>
            </div>

            {/* Ambient Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        </div>
    );
}
