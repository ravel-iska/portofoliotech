"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const useGsapScroll = (canInitialize: boolean = true) => {
    useEffect(() => {
        if (!canInitialize) return;

        // Add a slight delay to ensure the DOM is fully unrolled and rendered before calculating offsets
        const timeoutId = setTimeout(() => {
            const sections = document.querySelectorAll("section:not(#home)");

            sections.forEach((section) => {
                gsap.fromTo(section,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        }
                    }
                );
            });
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [canInitialize]);
};
