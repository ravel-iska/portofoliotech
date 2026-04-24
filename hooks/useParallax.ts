/**
 * Tujuan      : Menghitung parallax offset berdasarkan progress scroll
 * Caller      : components/sections/Hero.tsx
 * Dependensi  : None
 * Main Func   : useParallax
 */

export function useParallax(progress: number, factor = 200) {
    return {
        y: progress * factor * -1, // moving up
        opacity: Math.max(0, 1 - progress * 2), // fade out quickly
        scale: 1 + progress * 0.05, // slight zoom in
    };
}
