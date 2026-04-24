"use client";

import { useState, useRef, useEffect } from "react";
import { Cpu, Zap, Search, CornerDownLeft, User, Music, Square } from "lucide-react";
import { useGlobal } from "@/components/core/GlobalProvider";
// animejs required in useEffect

export default function SmartChat() {
    const { t } = useGlobal();
    const [history, setHistory] = useState([
        { role: 'ai', text: t("chat.intro") }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [query, setQuery] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }

        const animeModule = require("animejs");
        const anime = animeModule.default || animeModule;

        // Animate the latest message entrance
        const items = historyRef.current?.querySelectorAll(".chat-bubble");
        if (items && items.length > 0) {
            const lastItem = items[items.length - 1];
            anime({
                targets: lastItem,
                opacity: [0, 1],
                translateX: [(msg: Element) => (msg.classList.contains('user-bubble') ? 20 : -20), 0],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 600
            });
        }
    }, [history]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMsg = { role: 'user', text: query };
        setHistory(prev => [...prev, userMsg]);
        setQuery("");
        setIsTyping(true);

        setTimeout(() => {
            let response = `${t("chat.sim")} ("${userMsg.text}")`;
            const lowerQuery = query.toLowerCase();

            if (lowerQuery.includes("wa") || lowerQuery.includes("whatsapp")) {
                response = `You can reach Bagus via WhatsApp here: ${t("contact.wa")}`;
            } else if (lowerQuery.includes("email") || lowerQuery.includes("mail")) {
                response = `Bagus's official email is ${t("contact.email")}. Feel free to reach out!`;
            } else if (lowerQuery.includes("link") || lowerQuery.includes("sosmed") || lowerQuery.includes("social")) {
                response = `Here are the links: GitHub (${t("contact.github")}), Instagram (${t("contact.instagram")})`;
            } else if (lowerQuery.includes("siapa") || lowerQuery.includes("who") || lowerQuery.includes("background")) {
                response = t("about.desc");
            } else if (lowerQuery === "play" || lowerQuery === "play music" || lowerQuery === "musik") {
                setIsPlaying(true);
                response = "🎵 Music started! Enjoy the vibes. Type \"stop\" to pause the music.";
            } else if (lowerQuery === "stop" || lowerQuery === "stop music" || lowerQuery === "pause") {
                setIsPlaying(false);
                response = "⏹️ Music stopped. Type \"play\" to start again.";
            }

            const aiMsg = { role: 'ai', text: response };
            setHistory(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1200);
    };

    return (
        <section id="smartchat" className="py-16 px-6 relative z-10 overflow-hidden flex justify-center">
            {/* Apple Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[140px] rounded-full -z-10" />

            <div className="w-full max-w-4xl relative">

                {/* Header Area */}
                <div className="flex items-center gap-6 mb-10 pb-6 border-b border-white/10">
                    <div className="w-12 h-12 glass border border-white/20 flex items-center justify-center text-white/80 rounded-2xl shadow-xl">
                        <Cpu size={20} className="text-accent hover:animate-spin transition-all" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-bold tracking-tight text-white drop-shadow-md">{t("chat.title")}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse" />
                            <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase">{t("chat.ready")}</p>
                        </div>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="glass-card overflow-hidden border border-white/10 flex flex-col h-[600px] rounded-[2rem] shadow-2xl relative">
                    {/* Subtle Scan-line / Glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none opacity-30" />

                    <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 scroll-smooth scrollbar-hide relative z-10">
                        <div ref={historyRef} className="flex flex-col gap-6">
                            {history.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`chat-bubble flex gap-5 opacity-0 ${msg.role === 'user' ? 'flex-row-reverse user-bubble' : 'ai-bubble'}`}
                                >
                                    <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-xl glass border border-white/20 ${msg.role === 'ai' ? 'bg-accent/40 text-white shadow-[0_0_20px_rgba(0,255,157,0.4)]' : 'bg-white/10 text-white/70'}`}>
                                        {msg.role === 'ai' ? <Cpu size={14} className="text-white" /> : <User size={14} />}
                                    </div>
                                    <div className={`p-5 rounded-2xl border border-white/10 shadow-lg max-w-[80%] ${msg.role === 'ai' ? 'bg-white/10 backdrop-blur-3xl text-white font-sans text-sm leading-relaxed border-l-accent border-l-4' : 'bg-white/5 text-white/80 text-base'}`}>
                                        <p className="font-medium">{msg.text}</p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-5">
                                    <div className="w-8 h-8 glass border border-white/20 bg-accent/10 text-accent flex items-center justify-center rounded-xl">
                                        <Cpu size={14} className="animate-spin" />
                                    </div>
                                    <div className="pt-2 px-5 py-4 glass-card rounded-2xl border border-white/5">
                                        <div className="flex gap-2">
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0s]" />
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Music Player Bar */}
                    {isPlaying && (
                        <div className="px-4 py-2 bg-accent/10 border-t border-accent/20 flex items-center justify-between gap-3 relative z-20">
                            <div className="flex items-center gap-2">
                                <Music size={14} className="text-accent animate-pulse" />
                                <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">Now Playing</span>
                                <div className="flex gap-0.5 items-end h-3">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className="w-0.5 bg-accent rounded-full animate-bounce" style={{ height: `${4 + Math.random() * 8}px`, animationDelay: `${i * 0.1}s`, animationDuration: '0.6s' }} />
                                    ))}
                                </div>
                            </div>
                            <button onClick={() => setIsPlaying(false)} className="text-white/40 hover:text-white transition-colors">
                                <Square size={12} />
                            </button>
                        </div>
                    )}

                    {/* Input Area */}
                    <form onSubmit={handleSearch} className="p-6 glass border-t border-white/10 flex gap-4 backdrop-blur-2xl relative z-20">
                        <div className="relative flex-1 group">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-accent/50 font-mono text-sm group-focus-within:text-glow transition-all">&gt;</span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t("chat.command")}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-accent/40 focus:bg-white/10 transition-all text-sm font-sans tracking-wide text-white placeholder-white/20"
                            />
                            <button
                                type="submit"
                                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 border border-white/10 px-4 py-2 glass-card rounded-xl hover:bg-accent hover:text-bg hover:border-transparent transition-all shadow-lg active:scale-95"
                            >
                                INIT <CornerDownLeft size={12} />
                            </button>
                        </div>
                    </form>
                </div>

                {/* YouTube Audio — needs real dimensions (1x1px) offscreen for audio to play */}
                {isPlaying && (
                    <iframe
                        ref={iframeRef}
                        src="https://www.youtube.com/embed/6vNnB4oLZNo?autoplay=1&loop=1&playlist=6vNnB4oLZNo&enablejsapi=1"
                        allow="autoplay; encrypted-media"
                        style={{ position: 'fixed', left: '-9999px', top: '-9999px', width: '1px', height: '1px', border: 'none', opacity: 0 }}
                        title="Background Music"
                    />
                )}
            </div>
        </section>
    );
}
