"use client";

import { useCallback } from "react";

/**
 * Premium Zero-Asset Sound Engine
 * Uses pure Web Audio API to generate high-fidelity UI sounds
 * without needing any .mp3/.wav downloads.
 */
export const useSoundEffect = () => {
    const playClick = useCallback(() => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContext();

            // Subtractive synthesis for a "glass tap"
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sine";
            // High pitch 
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            // Quick drop-off
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);

            // Volume shaping (attack/decay)
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } catch (e) {
            // Silently fail if audio context is not supported or locked
            console.error(e);
        }
    }, []);

    const playSwoosh = useCallback(() => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContext();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(100, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);

            // Lowpass filter for smooth swoosh
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(1000, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);

            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
            gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.3);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.3);
        } catch (e) {
            console.error(e);
        }
    }, []);

    return { playClick, playSwoosh };
};
