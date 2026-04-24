"use client";

import { motion } from "framer-motion";

export default function GlassIcon3D() {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -45 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1], delay: 1.5 }}
            className="w-[300px] h-[300px] relative z-20"
        >
            {/* Animated glassmorphism orb */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 via-purple-500/20 to-blue-500/10 blur-3xl animate-pulse" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-accent/20 via-transparent to-blue-400/15 border border-white/10 backdrop-blur-xl" />
            <div className="absolute inset-16 rounded-full bg-gradient-to-bl from-purple-400/15 via-transparent to-accent/10 border border-white/5 animate-spin" style={{ animationDuration: '15s' }} />

            {/* Center glow point */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent/60 shadow-[0_0_40px_rgba(124,58,237,0.5)]" />
        </motion.div>
    );
}
