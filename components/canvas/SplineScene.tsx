// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SplineScene() {
    const [shouldMount, setShouldMount] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShouldMount(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute inset-0 z-0 pointer-events-none"
        >
            <div className="w-full h-full bg-gradient-to-b from-blue-900/20 to-black rounded-[2rem]" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
        </motion.div>
    );
}
