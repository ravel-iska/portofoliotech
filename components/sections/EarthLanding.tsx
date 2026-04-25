"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Html, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from 'three';
import { createPortal } from "react-dom";

// Convert lat/lon to 3D Cartesian coordinates
function getCoordinatesFromLatLng(lat: number, lng: number, radius: number) {
    const latRad = lat * (Math.PI / 180);
    const lonRad = -lng * (Math.PI / 180);
    const x = Math.cos(latRad) * Math.cos(lonRad) * radius;
    const z = Math.cos(latRad) * Math.sin(lonRad) * radius;
    const y = Math.sin(latRad) * radius;
    return [x, y, z];
}

function RealisticEarth({ onClickNode }: { onClickNode: () => void }) {
    // High-res realistic earth texture from public CDN
    const [colorMap] = useTexture([
        "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    ]);

    const earthRef = useRef<THREE.Mesh>(null);
    const radius = 2.5;

    // Indonesia coordinates roughly covering the center (Jakarta)
    const [markerX, markerY, markerZ] = getCoordinatesFromLatLng(-3, 115, radius);

    useFrame(() => {
        // Slow auto-rotation on the Y axis if no interaction
        if (earthRef.current) {
            // earthRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <group>
            {/* Ambient and directional light for realistic sun-casting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 3, 5]} intensity={1.5} />
            <pointLight position={[-5, -3, -5]} intensity={0.5} color="#4f46e5" />

            <mesh ref={earthRef} rotation={[0, -Math.PI / 2, 0]}>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshStandardMaterial
                    map={colorMap}
                    roughness={0.6}
                    metalness={0.1}
                />
            </mesh>

            {/* Glowing atmosphere effect */}
            <mesh scale={[1.02, 1.02, 1.02]}>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} side={THREE.BackSide} />
            </mesh>

            {/* Interactive Node over Indonesia */}
            <group position={[markerX, markerY, markerZ]}>
                {/* Visual bouncing marker ring */}
                <mesh>
                    <ringGeometry args={[0.05, 0.08, 32]} />
                    <meshBasicMaterial color="#34d399" side={THREE.DoubleSide} transparent opacity={0.8} />
                </mesh>

                {/* Central dot */}
                <mesh>
                    <circleGeometry args={[0.02, 32]} />
                    <meshBasicMaterial color="#ffffff" />
                </mesh>

                <Html center distanceFactor={15}>
                    <button
                        onClick={onClickNode}
                        onPointerEnter={() => document.body.style.cursor = 'pointer'}
                        onPointerLeave={() => document.body.style.cursor = 'auto'}
                        className="group relative flex items-center justify-center mt-8 animate-bounce"
                    >
                        <div className="absolute w-12 h-12 bg-emerald-500/20 rounded-full animate-ping" />
                        <div className="relative px-3 py-1 bg-black/80 border border-emerald-500/50 backdrop-blur-md rounded-lg whitespace-nowrap opacity-50 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-[0.2em] uppercase cursor-pointer">
                                Initialize Uplink
                            </span>
                        </div>
                        {/* Connecting line */}
                        <div className="absolute top-0 w-px h-8 bg-emerald-500/50 pointer-events-none -translate-y-full" />
                    </button>
                </Html>
            </group>
        </group>
    );
}

export default function EarthLanding({ onUnlock }: { onUnlock: () => void }) {
    const [isExiting, setIsExiting] = useState(false);

    const handleUnlock = () => {
        setIsExiting(true);
        setTimeout(() => {
            onUnlock();
        }, 1200);
    };

    if (typeof window === "undefined") return null;

    if (isExiting) {
        return createPortal(
            <motion.div
                initial={{ opacity: 1, filter: "brightness(1) blur(0px)" }}
                animate={{ opacity: 0, scale: 2, filter: "brightness(5) blur(10px)" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="fixed inset-0 z-[99999] bg-black pointer-events-none"
            />,
            document.body
        );
    }

    return createPortal(
        <div className="fixed inset-0 z-[99999] bg-black overflow-hidden flex flex-col">
            <div className="absolute top-12 left-0 w-full text-center z-20 pointer-events-none">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white font-display font-black text-3xl md:text-5xl uppercase tracking-[0.3em] text-glow drop-shadow-2xl"
                >
                    Locate <span className="text-blue-500">Node</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-white/70 font-mono text-xs uppercase tracking-[0.2em] mt-4"
                >
                    Spin the globe. Find the access node in Indonesia.
                </motion.p>
            </div>

            <div className="absolute inset-0 z-10 w-full h-full">
                <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                    <Suspense fallback={
                        <Html center>
                            <div className="text-white font-mono text-xs animate-pulse tracking-widest whitespace-nowrap">
                                ASSEMBLING PLANET...
                            </div>
                        </Html>
                    }>
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                        <RealisticEarth onClickNode={handleUnlock} />
                        <OrbitControls
                            enableZoom={true}
                            minDistance={3}
                            maxDistance={10}
                            enablePan={false}
                            rotateSpeed={0.5}
                            autoRotate={true}
                            autoRotateSpeed={0.5}
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* Dark gradient vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-10" />
        </div>,
        document.body
    );
}
