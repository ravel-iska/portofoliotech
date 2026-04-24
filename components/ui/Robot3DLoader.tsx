"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, PerspectiveCamera } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

function RobotBrain() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1, 32, 32]} scale={1.5}>
                <MeshDistortMaterial
                    color="#00ff9d"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.2}
                    emissive="#00ff9d"
                    emissiveIntensity={0.5}
                />
            </Sphere>
            {/* Decorative Rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.02, 16, 32]} />
                <meshBasicMaterial color="#00ff9d" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[2.2, 0.01, 16, 32]} />
                <meshBasicMaterial color="#00ff9d" transparent opacity={0.2} />
            </mesh>
        </Float>
    );
}

export default function Robot3DLoader() {
    const [complete, setComplete] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setComplete(true), 1000);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);
        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center pointer-events-none"
                >
                    <div className="w-full h-[60vh] relative">
                        <Canvas dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false }}>
                            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} color="#00ff9d" />
                            <RobotBrain />
                        </Canvas>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-display-md font-display font-bold text-white tracking-widest"
                        >
                            AI <span className="text-accent underline decoration-accent/20">SYSTEM</span> INITIALIZING
                        </motion.h2>

                        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-accent shadow-[0_0_15px_#00ff9d]"
                            />
                        </div>

                        <span className="text-[10px] font-mono text-muted uppercase tracking-[0.4em]">
                            NEURAL_LINKING {progress}%
                        </span>
                    </div>

                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#00ff9d_0%,_transparent_70%)]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
