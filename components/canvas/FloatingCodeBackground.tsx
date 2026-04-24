"use client";

import { useEffect, useRef, useState } from "react";

export default function FloatingCodeBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flash

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        // Skip entirely on mobile — canvas animation is a MAJOR performance drain
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let p: any[] = [];

        const symbols = [
            "const", "let", "=>", "{}", "[]", "</>", "function", "return",
            "import", "export", "React", "Next.js", "GSAP", "Docker", "Go",
            "await", "async", "interface", "type", "console.log"
        ];

        class Particle {
            x: number; y: number; text: string; speed: number; opacity: number; scale: number;
            constructor() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.text = symbols[Math.floor(Math.random() * symbols.length)];
                this.speed = 0.2 + Math.random() * 0.5;
                this.opacity = 0.02 + Math.random() * 0.05;
                this.scale = 0.5 + Math.random() * 1.5;
            }
            update() {
                this.y -= this.speed;
                if (this.y < -50) { this.y = window.innerHeight + 50; this.x = Math.random() * window.innerWidth; }
            }
            draw() {
                if (!ctx) return;
                ctx.fillStyle = `rgba(148, 163, 184, ${this.opacity})`;
                ctx.font = `${Math.floor(14 * this.scale)}px monospace`;
                ctx.fillText(this.text, this.x, this.y);
            }
        }

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 100);
            p = [];
            for (let i = 0; i < particleCount; i++) p.push(new Particle());
        };

        const render = () => {
            ctx.fillStyle = "#0f111a";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            p.forEach((particle) => { particle.update(); particle.draw(); });
            animationFrameId = requestAnimationFrame(render);
        };

        init();
        render();

        const handleResize = () => init();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isMobile]);

    // Don't render canvas on mobile at all
    if (isMobile) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-50"
            style={{ pointerEvents: "none" }}
        />
    );
}
