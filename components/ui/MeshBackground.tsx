"use client";

/**
 * MeshBackground — PERFORMANCE FIX
 * Previously had 3 animated motion.div blobs with blur(120px)
 * running infinite CSS keyframe animations. Each blur costs ~5-10ms
 * per frame of GPU compositing time. Replaced with static radial
 * gradients that give the same visual effect for zero cost.
 */
export default function MeshBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-bg pointer-events-none">
            <div
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, var(--accent, #818cf8) 0%, transparent 70%)" }}
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
            />
            <div
                className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }}
            />
            <div className="absolute inset-0 bg-noise mix-blend-overlay" />
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            />
        </div>
    );
}

