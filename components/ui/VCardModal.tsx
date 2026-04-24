"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Download, X, RefreshCw, Mail, MapPin, Briefcase, Phone, LayoutDashboard, Code, ExternalLink } from "lucide-react";
import { downloadVCard } from "@/lib/vcard";

interface VCardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VCardModal({ isOpen, onClose }: VCardModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    // 3D Rotation Animation Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) {
            setIsFlipped(false);
            mouseX.set(0);
            mouseY.set(0);
        }
    }, [isOpen, mouseX, mouseY]);

    if (!mounted || typeof document === "undefined") return null;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Calculate final rotateY taking into account the flip state and the mouse rotation
    // When flipped, we want to add 180 degrees.
    const baseRotationY = isFlipped ? 180 : 0;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="vcard-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                >
                    <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

                    {/* Close Button Top Right */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 hover:scale-110 active:scale-95 transition-all shadow-md group"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    <div className="w-full flex justify-center items-center pointer-events-none z-10" style={{ perspective: "1200px" }}>
                        <motion.div
                            ref={cardRef}
                            style={{
                                rotateX,
                                rotateY: isFlipped ? 180 : rotateYSpring, // Simplification for flip lock
                                transformStyle: "preserve-3d"
                            }}
                            initial={{ scale: 0.8, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, y: 50, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="relative w-full max-w-[340px] md:max-w-[400px] aspect-[5/8] pointer-events-auto cursor-grab active:cursor-grabbing"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => setIsFlipped(!isFlipped)}
                        >
                            {/* Front Side */}
                            <div
                                className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col justify-between p-8"
                                style={{ backfaceVisibility: "hidden" }}
                            >
                                {/* Holographic/Glass overlay */}
                                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-[45deg] pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-6 border border-accent/30 shadow-[0_0_20px_rgba(129,140,248,0.3)]">
                                        <LayoutDashboard size={24} />
                                    </div>
                                    <h2 className="text-3xl font-display font-black text-white tracking-tight mb-2">Bagus<br />Priambudi</h2>
                                    <p className="text-blue-400 font-mono text-xs uppercase tracking-widest">S.Kom / Developer</p>

                                    <div className="mt-8 space-y-4">
                                        <div className="flex items-center gap-3 text-white/60">
                                            <Briefcase size={14} className="text-white/40" />
                                            <span className="text-sm font-light">Fullstack & Web3 Engineer</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/60">
                                            <Mail size={14} className="text-white/40" />
                                            <span className="text-sm font-light truncate">bagusnetagain@gmail.com</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/60">
                                            <MapPin size={14} className="text-white/40" />
                                            <span className="text-sm font-light">Indonesia</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-end justify-between mt-8">
                                    <div className="text-[9px] font-mono tracking-widest text-white/30 uppercase">
                                        Scan & Tap to flip
                                    </div>
                                    <img src="/qr.png" alt="QR Code" className="w-16 h-16 rounded bg-white p-1 opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                </div>
                            </div>

                            {/* Back Side */}
                            <div
                                className="absolute inset-0 rounded-[2rem] bg-gradient-to-bl from-[#0f172a] via-[#020617] to-[#000000] border border-blue-500/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center justify-center p-8"
                                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                            >
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#3b82f6 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-accent flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)] mb-8 animate-pulse relative z-10">
                                    <Code size={30} className="text-white relative z-10" />
                                </div>

                                <h3 className="text-xl font-display font-bold text-white mb-2 relative z-10">Digital Business Card</h3>
                                <p className="text-center text-white/50 text-xs leading-relaxed max-w-[80%] mb-10 relative z-10 font-mono">
                                    Save my contact details directly to your mobile device or address book.
                                </p>

                                <button
                                    onClick={(e) => { e.stopPropagation(); downloadVCard(); }}
                                    className="relative z-10 flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-black rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                                >
                                    <Download size={16} /> Save Contact
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Hint Controls */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4"
                    >
                        <button
                            onClick={() => setIsFlipped(!isFlipped)}
                            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all font-mono text-xs uppercase tracking-widest backdrop-blur-md"
                        >
                            <RefreshCw size={14} className={isFlipped ? "rotate-180 transition-transform duration-500" : "transition-transform duration-500"} /> Flip Card
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
