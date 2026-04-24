/**
 * Tujuan      : Komponen Peta Premium (SVG Dotted Map dengan Ping)
 * Caller      : components/sections/Contact.tsx
 * Dependensi  : Framer Motion
 * Main Func   : PremiumMap
 */

"use client";

import { motion } from "framer-motion";

export default function PremiumMap() {
    return (
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass border border-accent/20 mt-8 shadow-[0_0_50px_rgba(0,255,135,0.05)]">
            {/* Background Map Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#050505] to-[#111] z-0" />

            {/* Minimalist Grid */}
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: "linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            {/* Premium Dotted World Map SVG (Abstract) */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full opacity-60 z-10 p-8">
                {/* Simulated dots for continents to look like a cyber map */}
                <g fill="currentColor" className="text-white">
                    {/* North America */}
                    <circle cx="150" cy="150" r="2" />
                    <circle cx="180" cy="160" r="2" />
                    <circle cx="140" cy="180" r="2" />
                    <circle cx="200" cy="140" r="2" />
                    <circle cx="220" cy="190" r="2" />
                    <circle cx="170" cy="200" r="2" />
                    <circle cx="240" cy="170" r="2" />
                    <circle cx="260" cy="210" r="2" />

                    {/* South America */}
                    <circle cx="270" cy="300" r="2" />
                    <circle cx="300" cy="320" r="2" />
                    <circle cx="290" cy="360" r="2" />
                    <circle cx="310" cy="400" r="2" />

                    {/* Europe */}
                    <circle cx="480" cy="120" r="2" />
                    <circle cx="500" cy="140" r="2" />
                    <circle cx="460" cy="150" r="2" />
                    <circle cx="520" cy="130" r="2" />
                    <circle cx="540" cy="160" r="2" />

                    {/* Africa */}
                    <circle cx="500" cy="250" r="2" />
                    <circle cx="480" cy="300" r="2" />
                    <circle cx="520" cy="280" r="2" />
                    <circle cx="550" cy="350" r="2" />
                    <circle cx="510" cy="380" r="2" />

                    {/* Asia */}
                    <circle cx="650" cy="160" r="2" />
                    <circle cx="700" cy="140" r="2" />
                    <circle cx="750" cy="180" r="2" />
                    <circle cx="800" cy="200" r="2" />
                    <circle cx="680" cy="220" r="2" />
                    <circle cx="730" cy="250" r="2" />
                    <circle cx="780" cy="240" r="2" />

                    {/* Australia */}
                    <circle cx="850" cy="380" r="2" />
                    <circle cx="880" cy="400" r="2" />
                    <circle cx="820" cy="410" r="2" />
                    <circle cx="860" cy="430" r="2" />
                </g>

                {/* Connection lines to show global reach networking */}
                <path d="M 750,280 C 600,200 400,400 200,180" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
                <path d="M 750,280 C 600,400 500,200 500,150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
            </svg>

            {/* Glowing Ping - Location (Indonesia) */}
            <div className="absolute z-20 flex items-center justify-center pointer-events-none" style={{ left: "75%", top: "56%" }}>
                <span className="relative flex h-8 w-8">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-8 w-8 bg-accent shadow-[0_0_20px_rgba(var(--accent),0.8)] border-2 border-white items-center justify-center">
                        <span className="h-2 w-2 bg-white rounded-full"></span>
                    </span>
                </span>

                {/* Location Label Drop */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute -top-12 whitespace-nowrap px-3 py-1 bg-black/80 border border-white/10 rounded-md text-xs font-bold text-accent tracking-widest backdrop-blur-md"
                >
                    YOGYAKARTA
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-r border-b border-white/10 rotate-45"></div>
                </motion.div>
            </div>
        </div>
    );
}
