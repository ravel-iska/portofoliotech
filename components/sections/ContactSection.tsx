// @ts-nocheck
"use client";

import { motion } from "framer-motion";
import { Send, MessageSquare, User, AtSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useGlobal } from "@/components/core/GlobalProvider";
import { submitContactMessage } from "@/actions/contact";

// Brand SVG Icons (Lucide doesn't include brand icons)
const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const GithubIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
);


export default function ContactSection() {
    const { t } = useGlobal();
    const [shouldMount, setShouldMount] = useState(false);

    // Form States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setShouldMount(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setResult(null);

        const res = await submitContactMessage({ name, email, content });
        setResult(res);
        setIsSubmitting(false);

        if (res.success) {
            setName("");
            setEmail("");
            setContent("");
        }
    };


    return (
        <section id="contact" className="relative py-20 bg-[#0A1128] overflow-hidden">
            {/* Background 3D Accent */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" />
            </div>

            <div className="container max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    {/* Left Side: Copy */}
                    <div className="space-y-12">
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-8xl font-display font-black text-white tracking-tighter leading-none">
                                LET'S <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">COLLABORATE.</span>
                            </h2>
                            <p className="text-white/40 font-mono text-sm md:text-lg max-w-md leading-relaxed">
                                Ready to bring high-fidelity 3D experiences and advanced data architecture to your next project?
                                <br /><br />
                                Drop a message below and let's build the future together.
                            </p>
                        </motion.div>

                        <div className="flex flex-wrap gap-4 pt-4 relative z-20 pointer-events-auto">
                            {/* X / Twitter */}
                            <a href="#contact" className="relative w-20 h-20 md:w-32 md:h-32 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] flex items-center justify-center group transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                <XIcon className="w-8 h-8 md:w-12 md:h-12 text-white/60 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            {/* Instagram */}
                            <a href={t("contact.instagram")} target="_blank" rel="noopener noreferrer" className="relative w-20 h-20 md:w-32 md:h-32 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] flex items-center justify-center group transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                <InstagramIcon className="w-8 h-8 md:w-12 md:h-12 text-white/60 group-hover:text-pink-400 transition-colors duration-300" />
                                <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            {/* GitHub */}
                            <a href={t("contact.github")} target="_blank" rel="noopener noreferrer" className="relative w-20 h-20 md:w-32 md:h-32 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] flex items-center justify-center group transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                                <GithubIcon className="w-8 h-8 md:w-12 md:h-12 text-white/60 group-hover:text-white transition-colors duration-300" />
                                <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>

                        <div className="mt-8 p-6 rounded-3xl bg-blue-900/20 border border-blue-500/20 backdrop-blur-md relative z-20 pointer-events-auto">
                            <p className="text-blue-200/60 font-mono text-[10px] md:text-sm tracking-widest text-center break-all md:break-normal">DIRECT EMAIL: <span className="text-white font-bold ml-1 md:ml-2">{t("contact.email")}</span></p>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="p-10 md:p-16 rounded-[4rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl relative"
                    >
                        {/* Form Glow */}
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            {result && (
                                <div className={`p-4 rounded-2xl text-sm font-mono tracking-wide ${result.success ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {result.message}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em] ml-2">Full Identity</label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Cipher Name"
                                        className="w-full h-16 pl-16 pr-8 bg-black/40 border border-white/10 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em] ml-2">Digital Endpoint</label>
                                <div className="relative">
                                    <AtSign className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@domain.com"
                                        className="w-full h-16 pl-16 pr-8 bg-black/40 border border-white/10 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em] ml-2">Encrypted Payload</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-6 top-8 text-white/20" size={18} />
                                    <textarea
                                        rows={4}
                                        required
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Details of the transmission..."
                                        className="w-full pl-16 pr-8 py-6 bg-black/40 border border-white/10 rounded-2xl text-white font-mono text-sm focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-display font-bold text-lg rounded-2xl shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Send size={20} className={isSubmitting ? "animate-pulse" : ""} />
                                {isSubmitting ? "TRANSMITTING..." : "BROADCAST SIGNAL"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
