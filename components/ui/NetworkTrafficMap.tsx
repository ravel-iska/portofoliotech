"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function NetworkTrafficMap() {
    // Number of nodes in our abstract network
    const nodes = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
        }));
    }, []);

    // Create random connections between nodes
    const connections = useMemo(() => {
        const lines: { id: string; x1: number; y1: number; x2: number; y2: number }[] = [];
        for (let i = 0; i < nodes.length; i++) {
            // Each node connects to 1-2 other nodes
            const targets = [
                nodes[(i + 1) % nodes.length],
                nodes[(i + 3) % nodes.length],
            ];
            targets.forEach((target) => {
                lines.push({
                    id: `line-${i}-${target.id}`,
                    x1: nodes[i].x,
                    y1: nodes[i].y,
                    x2: target.x,
                    y2: target.y,
                });
            });
        }
        return lines;
    }, [nodes]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full"
            >
                {/* Background Grid */}
                <defs>
                    <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.1" opacity="0.1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallGrid)" />

                {/* Connections */}
                {connections.map((line) => (
                    <g key={line.id}>
                        <path
                            d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="0.2"
                        />
                        {/* Moving Data Packets */}
                        <motion.circle
                            r="0.3"
                            fill="white"
                            initial={{ offsetDistance: "0%", opacity: 0 }}
                            animate={{
                                offsetDistance: ["0%", "100%"],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5,
                            }}
                            style={{
                                offsetPath: `path('M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}')`,
                                position: "absolute",
                                filter: "drop-shadow(0 0 2px #00ff87)",
                            }}
                        />
                    </g>
                ))}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g key={node.id}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.size / 10}
                            fill="rgba(0, 255, 135, 0.2)"
                            stroke="rgba(0, 255, 135, 0.4)"
                            strokeWidth="0.1"
                        />
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={node.size / 15}
                            fill="#00ff87"
                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}
