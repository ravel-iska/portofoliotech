import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useGlobal } from "@/components/core/GlobalProvider";
import { motion, useInView } from "framer-motion";
import TreeNodes3D from "@/components/canvas/TreeNodes3D";
import { Layers, MousePointer2 } from "lucide-react";

export default function SkillTree3D() {
    const { t } = useGlobal();
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section ref={containerRef} className="relative min-h-[80vh] w-full bg-[#02050a] flex items-center justify-center overflow-hidden border-t border-white/5 py-24">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,135,0.03),transparent_70%)] pointer-events-none" />

            {/* UI Overlay */}
            <div className="absolute top-12 left-0 w-full px-6 z-10 pointer-events-none">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 glass-card text-white/50 text-[10px] uppercase font-mono tracking-widest mb-4">
                            <Layers size={14} className="text-[#00ff87]" /> ARCHITECTURE TREE
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter leading-none">
                            TECHNICAL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] to-[#00b8ff]">MASTERY</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-3 glass border border-white/10 px-4 py-3 rounded-xl pointer-events-auto shadow-2xl"
                    >
                        <div className="bg-white/10 p-2 rounded-lg">
                            <MousePointer2 className="w-5 h-5 text-white/70" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-xs font-bold font-mono tracking-widest uppercase">Interactive Node</span>
                            <span className="text-white/40 text-[10px] font-mono tracking-widest">Drag to rotate • Scroll to zoom</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Canvas Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full h-[600px] md:h-[700px] cursor-grab active:cursor-grabbing"
            >
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                    <color attach="background" args={["#02050a"]} />
                    <fog attach="fog" args={["#02050a", 5, 20]} />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00ff87" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00b8ff" />
                    <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} color="#ffffff" />

                    <Stars radius={50} depth={50} count={1000} factor={2} saturation={0} fade speed={1} />

                    <Suspense fallback={null}>
                        <TreeNodes3D />
                    </Suspense>

                    {/* Controls limitations to keep the view focused */}
                    <OrbitControls
                        enablePan={false}
                        minDistance={4}
                        maxDistance={12}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 4}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </motion.div>
        </section>
    );
}
