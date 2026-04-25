"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const useGsapScroll = () => {
    useEffect(() => {
        const sections = document.querySelectorAll("section:not(#home)");

        sections.forEach((section) => {
            gsap.fromTo(section,
                {
                    opacity: 0,
                    y: 30,
                    // REMOVED filter:blur — it's extremely expensive on desktop too
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

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);
};

