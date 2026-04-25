"use client";

import React, { useEffect, useRef } from "react";
// animejs will be required inside useEffect
import { cn } from "@/lib/utils";

export const TextReveal = ({
    text,
    className,
    delay = 0,
}: {
    text: string;
    className?: string;
    delay?: number;
}) => {
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        const animeModule = require("animejs");
        const anime = animeModule.default || animeModule;

        // Animate using animejs
        anime.timeline({ loop: false })
            .add({
                targets: textRef.current.querySelectorAll('.word'),
                translateY: [80, 0],
                translateZ: 0,
                rotateZ: [5, 0],
                opacity: [0, 1],
                filter: ["blur(10px)", "blur(0px)"],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el: HTMLElement, i: number) => delay * 1000 + 50 * i
            });

    }, [delay]);

    const words = text.split(" ");

    return (
        <div ref={textRef} className={cn("overflow-hidden flex flex-wrap pb-4 -mb-4 pt-2 -mt-2", className)}>
            {words.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.25em] origin-bottom-left" style={{ opacity: 0 }}>
                    {word}
                </span>
            ))}
        </div>
    );
};
