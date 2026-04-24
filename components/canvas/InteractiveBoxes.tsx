"use client";

import { motion } from "framer-motion";

export default function InteractiveBoxes() {
    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            {/* Floating grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)`,
                backgroundSize: '60px 60px',
            }} />

            {/* Floating accent orbs */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.15 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
                className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/20 blur-[120px]"
            />
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-500/20 blur-[100px]"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg pointer-events-none" />
        </div>
    );
}
