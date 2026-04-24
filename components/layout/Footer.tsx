/**
 * Tujuan      : Footer sederhana dengan link sosial dan back-to-top
 * Caller      : app/page.tsx
 * Dependensi  : Lucide React
 */

"use client";

import { ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-bg">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <Link href="/" className="text-xl font-display font-bold text-accent tracking-tighter">
                        VIBE<span className="text-text">STUDIO</span>
                    </Link>
                    <p className="text-muted text-sm">
                        © {new Date().getFullYear()} Vibe Portfolio. All rights reserved.
                    </p>
                </div>

                <div className="flex items-center gap-8">
                    <Link href="#" className="text-sm text-muted hover:text-accent transition-colors">Privacy Policy</Link>
                    <Link href="#" className="text-sm text-muted hover:text-accent transition-colors">Terms of Service</Link>
                </div>

                <button
                    onClick={scrollToTop}
                    className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-accent hover:text-bg transition-all transform hover:scale-110 group"
                    aria-label="Back to Top"
                >
                    <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </footer>
    );
}
