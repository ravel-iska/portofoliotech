"use client";

/**
 * FloatingCodeBackground — PERFORMANCE FIX
 * Previously ran a 60fps canvas with 100 particles.
 * Now replaced with a static CSS gradient for zero GPU cost.
 */
export default function FloatingCodeBackground() {
    return (
        <div
            className="fixed inset-0 w-full h-full -z-50 pointer-events-none"
            style={{
                background: "linear-gradient(180deg, #0f111a 0%, #0a0c14 50%, #0f111a 100%)",
            }}
        />
    );
}

