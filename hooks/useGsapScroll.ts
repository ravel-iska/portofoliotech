"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export const useGsapScroll = () => {
    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        const sections = document.querySelectorAll("section:not(#home)");

        sections.forEach((section) => {
            gsap.fromTo(section,
                {
                    opacity: 0,
                    y: isMobile ? 20 : 40,
                    // REMOVED filter:blur on mobile — it's extremely expensive
                    ...(isMobile ? {} : { filter: "blur(10px)" })
                },
                {
                    opacity: 1,
                    y: 0,
                    ...(isMobile ? {} : { filter: "blur(0px)" }),
                    duration: isMobile ? 0.6 : 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%",
                        toggleActions: "play none none none", // Don't reverse on mobile
                    }
                }
            );
        });

        if (!isMobile) {
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
        }

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);
};
