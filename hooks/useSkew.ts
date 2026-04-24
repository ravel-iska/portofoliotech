/**
 * Tujuan      : Hook untuk menghitung scroll velocity dan mengubahnya menjadi nilai skew
 * Caller      : components/sections/Projects.tsx, components/sections/Hero.tsx
 * Dependensi  : Framer Motion
 * Main Func   : useSkew
 */

import { useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

export function useSkew(factor: number = 0.05) {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });

    // Calculate skew based on scroll velocity
    const skew = useTransform(smoothVelocity, [-1000, 1000], [-factor * 100, factor * 100]);

    return skew;
}
