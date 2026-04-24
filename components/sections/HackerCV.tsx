"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Download, Cpu, HardDrive, ShieldCheck } from "lucide-react";

const terminalLines = [
    "Establishing secure connection...",
    "> SECURE LINK ACTIVE.",
    "Bypassing firewall [OK]",
    "Accessing mainframe database...",
    "Retrieving Developer Profile: VIBE_STUDIO",
    "> LOADING ARCHITECTURE PROTOCOLS...",
    "Decrypting highly classified CV...",
    "> DECRYPTION SUCCESSFUL.",
    "File ready for extraction."
];

export default function HackerCV() {
    const [linesFinished, setLinesFinished] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadingProgress, setDownloadingProgress] = useState(0);

    // Auto-typing simulation
    useEffect(() => {
        if (linesFinished < terminalLines.length) {
            const timer = setTimeout(() => {
                setLinesFinished(prev => prev + 1);
            }, Math.random() * 800 + 400); // Random delay between 400-1200ms
            return () => clearTimeout(timer);
        }
    }, [linesFinished]);

    const handleDownload = () => {
        setIsDownloading(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 25 + 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                // Actual file download conceptual trigger
                const link = document.createElement("a");
                link.href = "/Bagus_Priambudi_CV.pdf"; // Placeholder, but functional link
                link.download = "Bagus_Priambudi_CV.pdf";
                link.click();

                setTimeout(() => {
                    setIsDownloading(false);
                    setDownloadingProgress(0);
                    alert("CV Extraction Complete. Manual backup initialized.");
                }, 1000);
            }
            setDownloadingProgress(Math.floor(progress));
        }, 150);
    };

    return (
        <section className="relative w-full py-16 px-6 bg-transparent flex justify-center z-20">
            <div className="w-full max-w-4xl glass-card rounded-[2rem] border border-white/10 p-2 md:p-4 shadow-2xl relative overflow-hidden group">

                {/* Decorative Window Controls */}
                <div className="h-12 w-full bg-black/40 rounded-t-[1.5rem] border-b border-white/5 flex items-center px-6 justify-between shrink-0 mb-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex items-center gap-3 opacity-50 text-[10px] font-mono text-white uppercase tracking-widest">
                        <Terminal size={14} /> CV_Extraction_Protocol.exe
                    </div>
                </div>

                <div className="p-6 md:p-12 font-mono text-sm md:text-base space-y-3 min-h-[350px] relative">
                    {/* Glowing background grid inside terminal */}
                    <div className="absolute inset-0 bg-accent/5 backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                    <AnimatePresence>
                        {terminalLines.slice(0, linesFinished).map((line, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`${line.startsWith(">") ? "text-accent font-bold" : "text-white/70"}`}
                            >
                                <span className="text-white/30 mr-4">[{new Date().toISOString().split('T')[1].slice(0, 8)}]</span>
                                {line}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Blinking Cursor */}
                    {linesFinished < terminalLines.length && (
                        <motion.div
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-3 h-5 bg-accent/80 mt-2"
                        />
                    )}

                    {/* Final Action Button */}
                    <AnimatePresence>
                        {linesFinished >= terminalLines.length && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10"
                            >
                                <div className="flex items-center gap-6">
                                    <ShieldCheck size={32} className="text-accent" />
                                    <div>
                                        <div className="text-white font-black uppercase tracking-widest text-lg">System Override Authorized</div>
                                        <div className="text-white/50 text-xs mt-1">Payload size: 1.4mb | Format: PDF_HQ</div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="relative flex items-center justify-center gap-4 px-8 py-4 bg-accent/10 border border-accent/20 rounded-xl text-accent font-black uppercase tracking-[0.3em] overflow-hidden hover:bg-accent/20 hover:scale-105 transition-all w-full md:w-auto min-w-[250px]"
                                >
                                    {isDownloading ? (
                                        <>
                                            <div className="absolute inset-0 bg-accent/20" style={{ width: `${downloadingProgress}%` }} />
                                            <span>EXTRACTING... {downloadingProgress}%</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download size={20} />
                                            <span>DOWNLOAD CV</span>
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
