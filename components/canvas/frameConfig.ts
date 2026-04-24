/**
 * Tujuan      : Konfigurasi jumlah frame dan path untuk canvas sequence
 * Caller      : components/canvas/CanvasSequence.tsx, hooks/useCanvasPreload.ts
 */

export const FRAME_CONFIG = {
    TOTAL_FRAMES: 0,
    BASE_PATH: "/frames/frame_",
    EXTENSION: ".webp",
    SCROLL_HEIGHT_FACTOR: 8, // General parallax space
};
