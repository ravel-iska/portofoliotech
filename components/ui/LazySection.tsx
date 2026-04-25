"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

interface LazySectionProps {
    children: ReactNode;
    /** How many pixels before the viewport to start mounting. Default 300. */
    rootMargin?: string;
    /** Minimum height placeholder while unmounted */
    minHeight?: string;
    /** Keep mounted once visible (default true) */
    keepMounted?: boolean;
}

/**
 * LazySection — only mounts its children when the container is
 * within `rootMargin` of the viewport. This prevents offscreen
 * 3D canvases, heavy animations, and WebGL contexts from running
 * when the user can't even see them, dramatically reducing GPU load.
 */
export default function LazySection({
    children,
    rootMargin = "600px",
    minHeight = "200px",
    keepMounted = true,
}: LazySectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (keepMounted) {
                        observer.disconnect();
                    }
                } else if (!keepMounted) {
                    setIsVisible(false);
                }
            },
            { rootMargin: `${rootMargin} 0px ${rootMargin} 0px` }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin, keepMounted]);

    return (
        <div ref={ref} style={{ minHeight: isVisible ? undefined : minHeight }}>
            {isVisible ? children : null}
        </div>
    );
}
