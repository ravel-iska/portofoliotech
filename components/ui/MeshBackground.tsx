"use client";

import { motion } from "framer-motion";

export default function MeshBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-bg pointer-events-none">
            {/* Animated Mesh Gradients */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[120px]"
            />
            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, 120, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[100px]"
            />
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[110px]"
            />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 bg-noise mix-blend-overlay" />

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            />
        </div>
    );
}
