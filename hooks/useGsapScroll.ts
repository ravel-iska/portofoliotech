"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const useGsapScroll = () => {
    useEffect(() => {
        // Subtle entrance for standard sections
        const sections = document.querySelectorAll("section:not(#home)");

        sections.forEach((section) => {
            gsap.fromTo(section,
                {
                    opacity: 0,
                    y: 40,
                    filter: "blur(10px)"
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

        // Global stagger for items with .gsap-reveal class
        gsap.from(".gsap-reveal", {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
                trigger: ".gsap-reveal",
                start: "top 85%"
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);
};
