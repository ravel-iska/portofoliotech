"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth < 768);
    }, []);

    const cols = isMobile && mounted ? 3 : 6;
    const totalItems = isMobile && mounted ? 6 : 24;

    const gridItems = Array.from({ length: totalItems }).map((_, i) => ({
        id: i,
        token: tokens[i % tokens.length],
        delay: (i % cols) * 0.15 + Math.floor(i / cols) * 0.15,
    }));

    return (
        <div className={`relative w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/10 glass-card bg-[#141a2e] mt-4 md:mt-6 flex items-center justify-center ${mounted && isMobile ? 'h-[200px]' : 'h-[250px] perspective-[1500px]'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0A1128] to-[#0A1128] pointer-events-none" />
            {!(mounted && isMobile) && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
            )}

            <div className="absolute top-4 right-4 md:top-10 md:right-10 z-20 text-right pointer-events-none">
                <h3 className="text-white/20 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] mb-1">Token Liquidity</h3>
                <p className="text-purple-400 font-mono text-[8px] md:text-[10px] uppercase tracking-widest">Wall_v3.0</p>
            </div>

            <motion.div
                className="relative grid gap-4 md:gap-8 p-6 md:p-10 transform-gpu"
                style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    ...(mounted && isMobile ? {} : { rotateX: 25, rotateY: -15, rotateZ: 5 }),
                }}
            >
                {gridItems.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            opacity: { duration: 0.5, delay: item.delay },
                            scale: { duration: 0.5, delay: item.delay },
                        }}
                        className="relative w-12 h-12 md:w-20 md:h-20 rounded-full bg-white/[0.03] border border-white/20 shadow-lg flex items-center justify-center"
                    >
                        <div className="absolute inset-2">
                            <img src={item.token.src} alt={item.token.name} className="w-full h-full object-contain" loading="lazy" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
