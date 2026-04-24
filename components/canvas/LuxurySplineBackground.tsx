// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LuxurySplineBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<HTMLElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [shouldMount, setShouldMount] = useState(false);

    useEffect(() => {
        const mountTimer = setTimeout(() => setShouldMount(true), 500);
        return () => clearTimeout(mountTimer);
    }, []);

    useEffect(() => {
        const onLoad = async () => {
            if (isLoaded) return;
            setIsLoaded(true);

            gsap.to(containerRef.current, {
                opacity: 1,
                duration: 3,
                ease: "power3.inOut"
            });

            if (containerRef.current) {
                try {
                    const animeModule = await import("animejs") as any;
                    if (typeof animeModule.animate === "function") {
                        animeModule.animate(containerRef.current, {
                            filter: ['blur(15px)', 'blur(0px)'],
                            scale: [1.1, 1],
                            duration: 2.5,
                            ease: 'easeInOutExpo'
                        });
                    } else {
                        const anime = animeModule.default || animeModule;
                        anime({
                            targets: containerRef.current,
                            filter: ['blur(15px)', 'blur(0px)'],
                            scale: [1.1, 1],
                            duration: 2500,
                            easing: 'easeInOutExpo'
                        });
                    }
                } catch (e) {
                    console.error("Failed to load anime.js dynamically", e);
                }
            }
        };

        const viewer = viewerRef.current;
        if (viewer) {
            viewer.addEventListener("load-complete", onLoad);
        }
        return () => {
            if (viewer) {
                viewer.removeEventListener("load-complete", onLoad);
            }
        };
    }, [isLoaded, shouldMount]);

    return (
        <div
            ref={containerRef}
            className="fixed top-0 left-0 w-full h-screen -z-50 opacity-0 pointer-events-none"
        >
            {shouldMount && (
                <>
                    <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
                </>
            )}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] pointer-events-none" />
        </div>
    );
}
