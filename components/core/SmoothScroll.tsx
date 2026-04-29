"use client";

import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    // Also tell ScrollTrigger to use Lenis scroll
    useEffect(() => {
        if (!lenisRef.current?.lenis) return;
        const lenis = lenisRef.current.lenis;

        lenis.on('scroll', ScrollTrigger.update);

        return () => {
            lenis.off('scroll', ScrollTrigger.update);
        };
    }, []);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            autoRaf={false}
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
                wheelMultiplier: 0.8,
                syncTouch: true // Bypasses physics simulation on mobile to vastly improve Android/iOS framerates
            }}
        >
            {children as any}
        </ReactLenis>
    );
}
