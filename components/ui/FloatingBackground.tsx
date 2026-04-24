/**
 * Tujuan      : Latar belakang melayang menggunakan Anime.js
 * Caller      : app/layout.tsx
 * Dependensi  : Anime.js
 * Main Func   : FloatingBackground
 */

"use client";

import { useEffect, useRef } from "react";
// animejs required in useEffect
import { motion } from "framer-motion";

export default function FloatingBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Create particles
        const particleCount = 20;
        const container = containerRef.current;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "absolute rounded-full opacity-20 blur-xl pointer-events-none";

            // Random properties
            const size = Math.random() * 300 + 100;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const color = Math.random() > 0.5 ? "#00ff87" : "#0070f3";

            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: color,
            });

            container.appendChild(particle);

            const animeModule = require("animejs");
            const anime = animeModule.default || animeModule;

            // Animate with Anime.js
            anime({
                targets: particle,
                translateX: () => Math.random() * 200 - 100,
                translateY: () => Math.random() * 200 - 100,
                scale: [1, Math.random() * 0.4 + 0.8],
                opacity: [0.1, 0.3],
                duration: Math.random() * 5000 + 5000,
                direction: "alternate",
                easing: "easeInOutSine",
                loop: true,
            });
        }

        return () => {
            if (container) container.innerHTML = "";
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 overflow-hidden -z-10 bg-bg pointer-events-none"
        />
    );
}
