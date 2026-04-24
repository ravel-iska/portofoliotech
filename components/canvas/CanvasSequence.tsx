/**
 * Tujuan      : Komponen utama untuk merender image sequence pada canvas
 * Caller      : components/sections/Hero.tsx
 * Dependensi  : Canvas API
 * Main Func   : CanvasSequence
 * Frames      : 120
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { FRAME_CONFIG } from "./frameConfig";

interface CanvasSequenceProps {
    progress: number;
}

export default function CanvasSequence({ progress }: CanvasSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const preloadedImages: HTMLImageElement[] = [];

        const loadImages = async () => {
            const promises = Array.from({ length: FRAME_CONFIG.TOTAL_FRAMES }).map((_, i) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    const frameIndex = (i + 1).toString().padStart(3, "0");
                    img.src = `${FRAME_CONFIG.BASE_PATH}${frameIndex}${FRAME_CONFIG.EXTENSION}`;

                    img.onload = () => {
                        loadedCount++;
                        resolve();
                    };

                    img.onerror = () => {
                        // Fallback for missing frames: create a colored placeholder
                        // This is useful for development if the frames folder is empty
                        const canvas = document.createElement("canvas");
                        canvas.width = 1280;
                        canvas.height = 720;
                        const ctx = canvas.getContext("2d");
                        if (ctx) {
                            ctx.fillStyle = "#0a0a0a";
                            ctx.fillRect(0, 0, 1280, 720);
                            ctx.fillStyle = "#00ff87";
                            ctx.font = "40px sans-serif";
                            ctx.fillText(`Frame ${i + 1} (Missing)`, 50, 100);
                            img.src = canvas.toDataURL();
                        }
                        loadedCount++;
                        resolve();
                    };

                    preloadedImages[i] = img;
                });
            });

            await Promise.all(promises);
            setImages(preloadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    // Draw to Canvas
    useEffect(() => {
        if (isLoading || images.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Calculate frame index based on progress (0 to 1)
        const frameIndex = Math.floor(progress * (FRAME_CONFIG.TOTAL_FRAMES - 1));
        const img = images[frameIndex];

        if (!img) return;

        // Handle Resize & Cover Fit
        const render = () => {
            const { width, height } = canvas.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        render();
    }, [progress, images, isLoading]);

    return (
        <div className="w-full h-full relative">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg z-10">
                    <div className="text-accent animate-pulse text-xl font-display">
                        Loading Experience...
                    </div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
                aria-label="Interactive scroll animation sequence background"
            />
        </div>
    );
}
