"use client";

import { motion } from "framer-motion";

const texts = [
    "CREATE", "DIGITAL", "EXCELLENCE", "INNOVATE", "BUILD", "SCALE"
];

const frameworks = [
    { name: "React", icon: "https://cdn.simpleicons.org/react/white" },
    { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
    { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/white" },
    { name: "Docker", icon: "https://cdn.simpleicons.org/docker/white" },
    { name: "Framer", icon: "https://cdn.simpleicons.org/framer/white" },
    { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/white" },
    { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/white" },
];

export default function InfiniteMarquee() {
    return (
        <section className="relative w-full py-20 bg-bg overflow-hidden border-t border-b border-white/5 flex flex-col gap-12">

            {/* Top Row: Huge Typography Marquee */}
            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-6xl md:text-8xl font-black font-display text-white/5 group-hover:text-white/10 transition-colors duration-500 will-change-transform">
                    {[...texts, ...texts].map((txt, i) => (
                        <div key={i} className="flex items-center gap-12">
                            <span>{txt}</span>
                            <span className="w-8 h-8 rounded-full bg-accent/20 blur-sm" />
                        </div>
                    ))}
                </div>
                {/* Second duplicated container for seamless loop */}
                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-12 text-6xl md:text-8xl font-black font-display text-white/5 group-hover:text-white/10 transition-colors duration-500 will-change-transform">
                    {[...texts, ...texts].map((txt, i) => (
                        <div key={i} className="flex items-center gap-12">
                            <span>{txt}</span>
                            <span className="w-8 h-8 rounded-full bg-accent/20 blur-sm" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Row: Tech Stack Logos Moving Opposite Direction */}
            <div className="relative flex overflow-x-hidden">
                <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-20 will-change-transform">
                    {[...frameworks, ...frameworks, ...frameworks].map((fw, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <img src={fw.icon} alt={fw.name} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                            <span className="text-[10px] font-mono text-white/50">{fw.name}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 animate-marquee-reverse2 whitespace-nowrap flex items-center gap-20 will-change-transform">
                    {[...frameworks, ...frameworks, ...frameworks].map((fw, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <img src={fw.icon} alt={fw.name} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                            <span className="text-[10px] font-mono text-white/50">{fw.name}</span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
