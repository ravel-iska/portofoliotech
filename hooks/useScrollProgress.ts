/**
 * Tujuan      : Menghitung progress scroll section tertentu (0 hingga 1)
 * Caller      : components/canvas/CanvasSequence.tsx, components/sections/Hero.tsx
 * Dependensi  : React
 * Main Func   : useScrollProgress
 * Side Effects: window scroll event listener
 */

import { RefObject, useEffect, useState } from "react";

export function useScrollProgress(ref: RefObject<any>) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handler = () => {
            const { top, height } = el.getBoundingClientRect();
            const windowH = window.innerHeight;

            // Calculate how much of the element has been scrolled through
            // top <= 0 means we have started scrolling into the section
            // total scrollable distance for the sticky effect is height - windowH
            const scrolled = -top;
            const total = height - windowH;

            const p = Math.min(Math.max(scrolled / total, 0), 1);
            setProgress(p);
        };

        window.addEventListener("scroll", handler, { passive: true });
        // Initial call
        handler();

        return () => window.removeEventListener("scroll", handler);
    }, [ref]);

    return progress;
}
