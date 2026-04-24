/**
 * Tujuan      : Latar belakang melayang menggunakan Anime.js
 * Caller      : app/layout.tsx
 * Dependensi  : Anime.js
 * Main Func   : FloatingBackground
 */

"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useDeviceDetect";

export default function FloatingBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!containerRef.current || isMobile) return;

        const particleCount = 8; // Reduced from 20
        const container = containerRef.current;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "absolute rounded-full opacity-10 pointer-events-none";

            const size = Math.random() * 200 + 80;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const color = Math.random() > 0.5 ? "#00ff87" : "#0070f3";

            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: color,
                willChange: "transform",
            });

            container.appendChild(particle);

            const animeModule = require("animejs");
            const anime = animeModule.default || animeModule;

            anime({
                targets: particle,
                translateX: () => Math.random() * 100 - 50,
                translateY: () => Math.random() * 100 - 50,
                scale: [1, Math.random() * 0.3 + 0.9],
                opacity: [0.05, 0.15],
                duration: Math.random() * 8000 + 8000,
                direction: "alternate",
                easing: "easeInOutSine",
                loop: true,
            });
        }

        return () => {
            if (container) container.innerHTML = "";
        };
    }, [isMobile]);

    // On mobile: render nothing (MeshBackground already provides ambient)
    if (isMobile) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden -z-10 bg-bg pointer-events-none"
        />
    );
}
