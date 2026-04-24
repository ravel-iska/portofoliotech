"use client";

import React from "react";
import { motion } from "framer-motion";

const sponsors = [
    { name: "GSAP", icon: "https://raw.githubusercontent.com/greensock/gsap/master/gsap-logo.svg" },
    { name: "Spline", icon: "https://spline.design/static/media/logo.8d2777f9.svg" },
    { name: "Domainesia", icon: "https://www.domainesia.com/asset/img/domainesia-logo.svg" },
    { name: "Vercel", icon: "https://assets.vercel.com/image/upload/v1607130542/repositories/vercel/logo.png" },
    { name: "Railway", icon: "https://railway.app/brand/logo-light.svg" },
];

export default function SponsorMarquee() {
    return (
        <section className="py-20 bg-transparent overflow-hidden border-t border-b border-white/5">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h3 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">Powered & Supported By</h3>
            </div>

            <div className="relative flex overflow-x-hidden">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-12 px-12">
                    {sponsors.map((sponsor, i) => (
                        <SponsorCard key={i} sponsor={sponsor} />
                    ))}
                    {/* Duplicate for seamless loop */}
                    {sponsors.map((sponsor, i) => (
                        <SponsorCard key={`dup-${i}`} sponsor={sponsor} />
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-12 px-12">
                    {sponsors.map((sponsor, i) => (
                        <SponsorCard key={`dup2-${i}`} sponsor={sponsor} />
                    ))}
                    {sponsors.map((sponsor, i) => (
                        <SponsorCard key={`dup3-${i}`} sponsor={sponsor} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function SponsorCard({ sponsor }: { sponsor: { name: string, icon: string } }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.05 }}
            className="inline-flex items-center gap-4 px-8 py-4 glass-card border border-white/10 rounded-2xl min-w-[200px]"
        >
            <div className="w-8 h-8 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                <img
                    src={sponsor.icon}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                        // Fallback for missing icons
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${sponsor.name}&background=random`;
                    }}
                />
            </div>
            <span className="text-white/60 font-display font-medium tracking-tight">{sponsor.name}</span>
        </motion.div>
    );
}
