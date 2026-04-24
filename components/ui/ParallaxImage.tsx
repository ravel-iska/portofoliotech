/**
 * Tujuan      : Komponen gambar dengan efek parallax mewah
 * Caller      : components/sections/Projects.tsx
 * Dependensi  : Framer Motion, Next/Image
 * Main Func   : ParallaxImage
 */

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    parallaxOffset?: number; // In percentage
}

export default function ParallaxImage({
    src,
    alt,
    className = "",
    parallaxOffset = 20,
}: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    // Parallax translation
    // Moves from -offset to +offset as we scroll past
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [`-${parallaxOffset}%`, `${parallaxOffset}%`]
    );

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 h-[140%] w-[140%] -top-[20%] -left-[20%]"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out"
                />
            </motion.div>
        </div>
    );
}
