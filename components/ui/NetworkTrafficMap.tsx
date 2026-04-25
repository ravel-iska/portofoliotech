"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Abstract grid definition for our network nodes
const nodes = [
    { id: "lon", x: 20, y: 30, size: 4 },
    { id: "nyc", x: 45, y: 60, size: 6 },
    { id: "sgp", x: 80, y: 75, size: 5 },
    { id: "tok", x: 85, y: 35, size: 4 },
    { id: "fra", x: 30, y: 40, size: 3 },
    { id: "syd", x: 90, y: 85, size: 3 },
    { id: "dxb", x: 60, y: 55, size: 4 },
];

// Complex Bezier curves connecting the main network cores
const connections = [
    { from: "lon", to: "nyc", path: "M 20 30 Q 30 50 45 60", color: "#00b8ff" },
    { from: "nyc", to: "dxb", path: "M 45 60 Q 55 40 60 55", color: "#ff9000" },
    { from: "dxb", to: "sgp", path: "M 60 55 Q 70 70 80 75", color: "#00ff87" },
    { from: "sgp", to: "tok", path: "M 80 75 Q 90 55 85 35", color: "#00b8ff" },
    { from: "tok", to: "lon", path: "M 85 35 Q 50 10 20 30", color: "#ff2a5f" }, // High frequency route
    { from: "fra", to: "dxb", path: "M 30 40 Q 45 45 60 55", color: "#00ff87" },
    { from: "sgp", to: "syd", path: "M 80 75 Q 85 80 90 85", color: "#ff9000" },
];

export default function NetworkTrafficMap() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 select-none overflow-hidden mix-blend-screen">
            <svg
                className="w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* 1. Underlying Static Cables */}
                {connections.map((conn, idx) => (
                    <path
                        key={`cable-${idx}`}
                        d={conn.path}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="0.2"
                        strokeOpacity="0.1"
                        strokeLinecap="round"
                    />
                ))}

                {/* 2. Active Transaction Packets (Glowing Dash array) */}
                {connections.map((conn, idx) => (
                    <motion.path
                        key={`packet-${idx}`}
                        d={conn.path}
                        fill="none"
                        stroke={conn.color}
                        strokeWidth="0.4"
                        strokeDasharray="4 20"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 100 }}
                        animate={{ strokeDashoffset: -100 }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                        style={{ filter: "drop-shadow(0px 0px 2px " + conn.color + ")" }}
                    />
                ))}

                {/* 3. Server Nodes (Blinking dots) */}
                {nodes.map((node) => (
                    <g key={node.id}>
                        {/* Core Server Node */}
                        <circle
                            cx={`${node.x}`}
                            cy={`${node.y}`}
                            r={`${node.size * 0.1}`}
                            fill="#ffffff"
                            opacity="0.8"
                        />
                        {/* Radar Pulse Effect */}
                        <motion.circle
                            cx={`${node.x}`}
                            cy={`${node.y}`}
                            r={`${node.size * 0.1}`}
                            fill="none"
                            stroke="#00ff87"
                            strokeWidth="0.2"
                            initial={{ r: node.size * 0.1, opacity: 0.8 }}
                            animate={{ r: node.size * 0.5, opacity: 0 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: Math.random() * 2
                            }}
                        />
                    </g>
                ))}
            </svg>

            {/* Soft global overlay vignette to blend the edges */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0f111a_100%)]" />
        </div>
    );
}
