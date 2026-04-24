"use client";

import { useEffect, useState } from "react";
// Website Loader Animation Component

export default function WebsiteLoader() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoaded) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-1000 pointer-events-none">
            <div className="text-accent font-mono animate-pulse">Loading Spline Assets...</div>
        </div>
    );
}
