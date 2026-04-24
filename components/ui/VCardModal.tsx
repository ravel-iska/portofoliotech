"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Download, X, RefreshCw, Mail, MapPin, Briefcase, Code, LayoutDashboard } from "lucide-react";
import { downloadVCard } from "@/lib/vcard";

interface VCardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VCardModal({ isOpen, onClose }: VCardModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth < 768);
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
        if (isMobile || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const handleFlip = () => setIsFlipped(!isFlipped);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="vcard-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90"
                >
                    <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"
                    >
                        <X size={20} />
                    </button>

                    <div className="w-full flex justify-center items-center z-10" style={{ perspective: isMobile ? "none" : "1200px" }}>
                        <motion.div
                            ref={cardRef}
                            style={isMobile ? {
                                rotateY: isFlipped ? 180 : 0,
                                transformStyle: "preserve-3d",
                                transition: "transform 0.6s ease"
                            } : {
                                rotateX,
                                rotateY: isFlipped ? 180 : rotateYSpring,
                                transformStyle: "preserve-3d"
                            }}
                            initial={{ scale: 0.8, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.8, y: 50, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="relative w-full max-w-[320px] md:max-w-[400px] aspect-[5/8] cursor-pointer"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleFlip}
                        >
                            {/* Front Side */}
                            <div
                                className="absolute inset-0 rounded-[2rem] bg-[#111111] border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8"
                                style={{
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    transform: "rotateY(0deg)"
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent mb-4 md:mb-6 border border-accent/30">
                                        <LayoutDashboard size={24} />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight mb-2">Bagus<br />Priambudi</h2>
                                    <p className="text-blue-400 font-mono text-xs uppercase tracking-widest">S.Kom / Developer</p>

                                    <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                                        <div className="flex items-center gap-3 text-white/60">
                                            <Briefcase size={14} className="text-white/40 shrink-0" />
                                            <span className="text-xs md:text-sm font-light">Fullstack & Web3 Engineer</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/60">
                                            <Mail size={14} className="text-white/40 shrink-0" />
                                            <span className="text-xs md:text-sm font-light truncate">bagusnetagain@gmail.com</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-white/60">
                                            <MapPin size={14} className="text-white/40 shrink-0" />
                                            <span className="text-xs md:text-sm font-light">Indonesia</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-end justify-between mt-6">
                                    <div className="text-[9px] font-mono tracking-widest text-white/30 uppercase">
                                        Tap to flip
                                    </div>
                                    <img src="/qr.png" alt="QR Code" className="w-14 h-14 md:w-16 md:h-16 rounded bg-white p-1 opacity-80" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                </div>
                            </div>

                            {/* Back Side */}
                            <div
                                className="absolute inset-0 rounded-[2rem] bg-[#020617] border border-blue-500/20 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 md:p-8"
                                style={{
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    transform: "rotateY(180deg)"
                                }}
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-500 to-accent flex items-center justify-center mb-6 md:mb-8 relative z-10">
                                    <Code size={28} className="text-white relative z-10" />
                                </div>

                                <h3 className="text-lg md:text-xl font-display font-bold text-white mb-2 relative z-10">Digital Business Card</h3>
                                <p className="text-center text-white/50 text-xs leading-relaxed max-w-[90%] mb-8 md:mb-10 relative z-10 font-mono">
                                    Save my contact details directly to your device.
                                </p>

                                <button
                                    onClick={(e) => { e.stopPropagation(); downloadVCard(); }}
                                    className="relative z-10 flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-gray-100 text-black rounded-full font-bold uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl"
                                >
                                    <Download size={16} /> Save Contact
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Flip hint button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <button
                            onClick={handleFlip}
                            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all font-mono text-xs uppercase tracking-widest"
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
