import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line, Sphere, Trail } from "@react-three/drei";
import * as THREE from "three";

export type SkillNode = {
    id: string;
    label: string;
    category: "frontend" | "backend" | "web3" | "core";
    position: [number, number, number];
    requires: string[];
    level: string;
};

const treeData: SkillNode[] = [
    { id: "core", label: "Core Web", category: "core", position: [0, -2, 0], requires: [], level: "Master" },
    { id: "react", label: "React / RN", category: "frontend", position: [-3, 0, 1], requires: ["core"], level: "Expert" },
    { id: "next", label: "Next.js", category: "frontend", position: [-4, 2, 0], requires: ["react"], level: "Advanced" },
    { id: "three", label: "Three.js / WebGL", category: "frontend", position: [-2, 3, -1], requires: ["react"], level: "Advanced" },
    { id: "node", label: "Node.js", category: "backend", position: [2, 0, -1], requires: ["core"], level: "Advanced" },
    { id: "db", label: "Supabase / SQL", category: "backend", position: [4, 1, 0], requires: ["node"], level: "Intermediate" },
    { id: "eth", label: "EVM Web3", category: "web3", position: [0, 1, 3], requires: ["core"], level: "Advanced" },
    { id: "solidity", label: "Solidity", category: "web3", position: [-1, 3, 4], requires: ["eth"], level: "Intermediate" },
    { id: "defi", label: "DeFi / Arbitrage", category: "web3", position: [1, 4, 3], requires: ["eth", "solidity"], level: "Expert" },
];

export default function TreeNodes3D() {
    const groupRef = useRef<THREE.Group>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Subtle floating animation for the entire tree
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    // Create edges connecting parent to child nodes
    const edges = useMemo(() => {
        const lines: { start: [number, number, number]; end: [number, number, number] }[] = [];
        treeData.forEach((node) => {
            node.requires.forEach((reqId) => {
                const parent = treeData.find((n) => n.id === reqId);
                if (parent) {
                    lines.push({ start: parent.position, end: node.position });
                }
            });
        });
        return lines;
    }, []);

    const getColor = (category: string) => {
        switch (category) {
            case "frontend": return "#00ff87";
            case "backend": return "#00b8ff";
            case "web3": return "#ff9000";
            default: return "#ffffff";
        }
    };

    return (
        <group ref={groupRef}>
            {/* Render Connecting Lines */}
            {edges.map((edge, idx) => (
                <Line
                    key={`edge-${idx}`}
                    points={[edge.start, edge.end]}
                    color="#ffffff"
                    opacity={0.15}
                    transparent
                    lineWidth={1.5}
                />
            ))}

            {/* Render Nodes */}
            {treeData.map((node) => {
                const isHovered = hoveredNode === node.id;
                const nodeColor = getColor(node.category);

                return (
                    <group key={node.id} position={node.position}>
                        {/* Core Sphere */}
                        <Sphere
                            args={[isHovered ? 0.3 : 0.2, 32, 32]}
                            onPointerOver={(e) => { e.stopPropagation(); setHoveredNode(node.id); document.body.style.cursor = 'pointer'; }}
                            onPointerOut={() => { setHoveredNode(null); document.body.style.cursor = 'default'; }}
                        >
                            <meshStandardMaterial
                                color={nodeColor}
                                emissive={nodeColor}
                                emissiveIntensity={isHovered ? 2 : 0.8}
                                roughness={0.2}
                                metalness={0.8}
                            />
                        </Sphere>

                        {/* Pulsing Aura */}
                        <Sphere args={[0.4, 16, 16]}>
                            <meshBasicMaterial color={nodeColor} transparent opacity={isHovered ? 0.2 : 0.05} />
                        </Sphere>

                        {/* Floating Interaction UI */}
                        {isHovered && (
                            <Html center distanceFactor={15} zIndexRange={[100, 0]}>
                                <div className="pointer-events-none w-[200px] -mt-16 bg-[#02050a]/90 glass border border-white/20 p-3 rounded-lg flex flex-col gap-1 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: nodeColor }} />
                                        <span className="text-white font-mono text-sm font-bold tracking-widest uppercase">{node.label}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-t border-white/10 pt-1 mt-1">
                                        <span className="text-white/40 text-[10px] uppercase tracking-widest font-mono">Mastery</span>
                                        <span className="text-white text-xs font-mono">{node.level}</span>
                                    </div>
                                </div>
                            </Html>
                        )}

                        {/* Always visible tiny label */}
                        <Html position={[0, -0.4, 0]} center>
                            <span
                                className={`font-mono text-[9px] uppercase tracking-widest whitespace-nowrap transition-all duration-300
                                ${isHovered ? 'text-white opacity-100' : 'text-white/40 opacity-50'}`}
                            >
                                {node.label}
                            </span>
                        </Html>
                    </group>
                );
            })}
        </group>
    );
}
