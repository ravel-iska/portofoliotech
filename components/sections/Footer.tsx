"use client";

import React, { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useGlobal } from "@/components/core/GlobalProvider";

export default function Footer() {
    const { t } = useGlobal();

    return (
        <footer className="relative py-12 px-6 flex flex-col justify-end min-h-0 overflow-hidden glass border-t border-white/10 mt-8 z-10">

            {/* Apple Glow Highlight */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col h-full justify-between">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 lg:pt-10">
                    <div>
                        <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-10 drop-shadow-2xl leading-tight tracking-tighter">
                            {t("footer.greet")} <br />
                            <span className="text-white/40">{t("footer.subgreet")}</span>
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <MagneticButton className="px-10 py-5 glass border border-white/20 text-white hover:bg-accent hover:text-bg hover:border-transparent shadow-[0_0_40px_rgba(129,140,248,0.2)] transition-all duration-300">
                                {t("footer.cta")}
                            </MagneticButton>
                        </div>
                    </div>

                    <div className="flex justify-start md:justify-end gap-16 text-xs font-mono text-white/50 pt-4 uppercase tracking-[0.3em]">
                        <ul className="space-y-6">
                            {["Twitter", "Github", "Linkedin"].map(social => (
                                <li key={social} className="hover:text-accent transition-all cursor-pointer relative group flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {social}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full opacity-50"></span>
                                </li>
                            ))}
                        </ul>
                        <ul className="space-y-6">
                            {["Home", "Work", "About"].map(link => (
                                <li key={link} className="hover:text-accent transition-all cursor-pointer relative group flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {link}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full opacity-50"></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Oversized Typography - iOS Glass Layered feel */}
                <div className="w-full border-t border-white/5 pt-12 overflow-hidden relative group">
                    <h1 className="text-[14vw] font-display font-black tracking-tighter text-white/5 whitespace-nowrap text-center leading-none pointer-events-none select-none text-glow group-hover:text-accent/10 transition-colors duration-1000">
                        BGUS.DEV
                    </h1>
                </div>

                <div className="absolute bottom-6 w-full text-center md:text-left text-[9px] uppercase font-bold tracking-[0.4em] text-white/20">
                    © {new Date().getFullYear()} BGUS.DEV. {t("footer.copyright")}
                </div>
            </div>
        </footer>
    );
}
