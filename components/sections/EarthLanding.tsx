"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Html, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from 'three';
import { createPortal } from "react-dom";

// Convert lat/lon to 3D Cartesian coordinates for markers
function getCoordinatesFromLatLng(lat: number, lng: number, radius: number) {
    const latRad = lat * (Math.PI / 180);
    const lonRad = -lng * (Math.PI / 180);
    const x = Math.cos(latRad) * Math.cos(lonRad) * radius;
    const z = Math.cos(latRad) * Math.sin(lonRad) * radius;
    const y = Math.sin(latRad) * radius;
    return [x, y, z];
}

function SolarSystem({ onClickNode }: { onClickNode: () => void }) {
    const [earthColorMap] = useTexture([
        "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    ]);

    const earthRef = useRef<THREE.Mesh>(null);
    const moonGroupRef = useRef<THREE.Group>(null);
    const sunGroupRef = useRef<THREE.Group>(null);

    const earthRadius = 2.5;

    // Indonesia coordinates roughly covering the center (Jakarta)
    const [markerX, markerY, markerZ] = getCoordinatesFromLatLng(-3, 115, earthRadius);

    // Sun Position (Far away, acting as main light source)
    const sunPosition = new THREE.Vector3(20, 5, -20);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Slow auto-rotation on the Y axis for earth
        if (earthRef.current) {
            earthRef.current.rotation.y = t * 0.05;
        }

        // Orbit the moon around the earth
        if (moonGroupRef.current) {
            moonGroupRef.current.rotation.y = t * 0.1;
        }

        // Extremely slow rotation of the sun and distant planetary system
        if (sunGroupRef.current) {
            sunGroupRef.current.rotation.y = t * 0.01;
        }
    });

    return (
        <group>
            {/* Ambient light for minimum shadow visibility */}
            <ambientLight intensity={0.05} />

            {/* The Sun acts as the absolute spotlight/directional light in the solar system */}
            <pointLight position={sunPosition} intensity={3} color="#ffffff" distance={100} decay={1} />
            <directionalLight position={sunPosition} intensity={2} color="#fffcf2" castShadow />

            {/* THE SUN */}
            <group position={sunPosition} ref={sunGroupRef}>
                <mesh>
                    <sphereGeometry args={[8, 64, 64]} />
                    <meshBasicMaterial color="#ffdc73" />
                </mesh>
                {/* Sun Glow */}
                <mesh scale={[1.1, 1.1, 1.1]}>
                    <sphereGeometry args={[8, 64, 64]} />
                    <meshBasicMaterial color="#ffb703" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
                </mesh>
                <mesh scale={[1.4, 1.4, 1.4]}>
                    <sphereGeometry args={[8, 64, 64]} />
                    <meshBasicMaterial color="#fb8500" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
                </mesh>

                {/* Inner Planets Orbiting the Sun */}
                <group rotation={[0.1, 0, 0]}>
                    {/* Mercury */}
                    <mesh position={[12, 0, 0]}>
                        <sphereGeometry args={[0.3, 32, 32]} />
                        <meshStandardMaterial color="#8c7c6a" roughness={0.9} />
                    </mesh>
                    {/* Mars */}
                    <mesh position={[-16, 1, 4]}>
                        <sphereGeometry args={[0.6, 32, 32]} />
                        <meshStandardMaterial color="#c1440e" roughness={0.8} />
                    </mesh>
                    {/* Jupiter */}
                    <mesh position={[25, -2, -10]}>
                        <sphereGeometry args={[1.8, 64, 64]} />
                        <meshStandardMaterial color="#d39c7e" roughness={0.7} />
                    </mesh>
                    {/* Saturn with Rings */}
                    <group position={[-35, 3, 10]} rotation={[0.4, 0.2, 0.1]}>
                        <mesh>
                            <sphereGeometry args={[1.5, 64, 64]} />
                            <meshStandardMaterial color="#ead6b8" />
                        </mesh>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[2.0, 3.5, 64]} />
                            <meshStandardMaterial color="#ceb8b8" side={THREE.DoubleSide} transparent opacity={0.8} />
                        </mesh>
                    </group>
                </group>
            </group>

            {/* THE EARTH (Center of Viewport) */}
            <group>
                <mesh ref={earthRef}>
                    <sphereGeometry args={[earthRadius, 64, 64]} />
                    <meshStandardMaterial
                        map={earthColorMap}
                        roughness={0.6}
                        metalness={0.1}
                    />
                </mesh>

                {/* Glowing Atmosphere */}
                <mesh scale={[1.02, 1.02, 1.02]}>
                    <sphereGeometry args={[earthRadius, 64, 64]} />
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
                </mesh>

                {/* Interactive Node over Indonesia (Attaches to rotating earth) */}
                <group rotation={[0, 0.05 * 0, 0]}>
                    <group position={[markerX, markerY, markerZ]}>
                        <mesh>
                            <ringGeometry args={[0.05, 0.08, 32]} />
                            <meshBasicMaterial color="#34d399" side={THREE.DoubleSide} transparent opacity={0.8} />
                        </mesh>
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
                                <div className="absolute top-0 w-px h-8 bg-emerald-500/50 pointer-events-none -translate-y-full" />
                            </button>
                        </Html>
                    </group>
                </group>

                {/* THE MOON (Orbiting Earth) */}
                <group ref={moonGroupRef}>
                    <mesh position={[0, 1, 5]}>
                        <sphereGeometry args={[0.4, 32, 32]} />
                        <meshStandardMaterial color="#888888" roughness={1.0} />
                    </mesh>
                </group>
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
        <div className="fixed inset-0 z-[99999] bg-[#02050a] overflow-hidden flex flex-col">
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
                    Explore the solar system. Find the access node in Indonesia.
                </motion.p>
            </div>

            <div className="absolute inset-0 z-10 w-full h-full">
                <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
                    <Suspense fallback={
                        <Html center>
                            <div className="text-white font-mono text-xs animate-pulse tracking-widest whitespace-nowrap">
                                ASSEMBLING GALAXY...
                            </div>
                        </Html>
                    }>
                        {/* Deep space background stars */}
                        <Stars radius={100} depth={100} count={7000} factor={6} saturation={0} fade speed={0.5} />

                        <SolarSystem onClickNode={handleUnlock} />

                        <OrbitControls
                            enableZoom={true}
                            minDistance={3}
                            maxDistance={30}
                            enablePan={false}
                            rotateSpeed={0.5}
                            autoRotate={false}
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
