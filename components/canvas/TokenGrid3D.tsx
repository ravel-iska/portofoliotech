"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const tokens = [
    { name: "Bitcoin", src: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029" },
    { name: "Ethereum", src: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" },
    { name: "Solana", src: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=029" },
    { name: "Cardano", src: "https://cryptologos.cc/logos/cardano-ada-logo.svg?v=029" },
    { name: "Polkadot", src: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=029" },
    { name: "Chainlink", src: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=029" },
    { name: "Avalanche", src: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=029" },
    { name: "Polygon", src: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=029" },
    { name: "Cosmos", src: "https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=029" },
    { name: "BNB", src: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029" },
    { name: "XRP", src: "https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=029" },
    { name: "Dogecoin", src: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=029" },
];

export default function TokenGrid3D() {
    // Determine grid rows and cols
    const cols = 6;
    const rows = 4;

    // Create a 6x4 layout filling it semi-randomly with tokens
    const gridItems = Array.from({ length: cols * rows }).map((_, i) => ({
        id: i,
        token: tokens[i % tokens.length],
        delay: (i % cols) * 0.1 + Math.floor(i / cols) * 0.1 + Math.random() * 0.2, // Staggered wave effect
    }));

    return (
        <div className="relative w-full h-[500px] overflow-hidden rounded-[3rem] border border-white/10 glass-card bg-[#0A1128] mt-12 flex items-center justify-center perspective-[1500px]">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0A1128] to-[#0A1128] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="absolute top-10 right-10 z-20 text-right pointer-events-none">
                <h3 className="text-white/20 font-mono text-[10px] uppercase tracking-[0.5em] mb-2">Token Liquidity</h3>
                <p className="text-purple-400 font-mono text-[10px] uppercase tracking-widest">Interactive Wall_v3.0</p>
            </div>

            {/* Flying Token Grid */}
            <motion.div
                className="relative grid gap-8 p-10 transform-gpu"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    rotateX: 25,
                    rotateY: -15,
                    rotateZ: 5
                }}
            >
                {gridItems.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ z: -500, opacity: 0 }}
                        animate={{
                            z: [0, 30, 0],
                            y: [0, -15, 0],
                            opacity: 1
                        }}
                        whileHover={{ scale: 1.3, z: 100, rotateY: 180 }}
                        transition={{
                            z: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: item.delay },
                            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: item.delay * 1.5 },
                            opacity: { duration: 1, delay: item.delay },
                            rotateY: { duration: 0.8, type: "spring" } // For the hover flip
                        }}
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/[0.03] border border-white/20 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(255,255,255,0.2)] flex items-center justify-center group cursor-pointer"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Token Logo container */}
                        <div className="absolute inset-2 backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                            <img src={item.token.src} alt={item.token.name} className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-300" />
                        </div>

                        {/* Backface of the token (seen when hovered/flipped) */}
                        <div className="absolute inset-0 bg-black/80 rounded-full border border-purple-500/50 flex items-center justify-center rotate-y-180 backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                            <span className="text-purple-400 font-mono text-[8px] uppercase tracking-widest">{item.token.name}</span>
                        </div>

                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                ))}
            </motion.div>

            {/* Visual Horizon Lines */}
            <div className="absolute inset-x-0 bottom-10 flex justify-center pointer-events-none z-20">
                <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-1 h-1 rounded-full bg-white/20 shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                    ))}
                </div>
            </div>
        </div>
    );
}
