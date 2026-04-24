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

    const getAIResponse = (input: string): string => {
        const q = input.toLowerCase().trim();

        // --- Music controls ---
        if (q === "play" || q === "play music" || q === "musik" || q === "putar" || q === "putar musik") {
            setIsPlaying(true);
            return "🎵 Music started! Enjoy the vibes. Type \"stop\" to pause.";
        }
        if (q === "stop" || q === "stop music" || q === "pause" || q === "berhenti") {
            setIsPlaying(false);
            return "⏹️ Music stopped. Type \"play\" to start again.";
        }

        // --- Greetings ---
        if (/^(hi|halo|hello|hey|hai|selamat|assalam|salam|yo|oi)/.test(q)) {
            return "👋 Halo! Selamat datang di Vibe Studio. Saya adalah Vibe AI Agent, asisten virtual Bagus Priambudi. Ketik \"help\" untuk melihat apa saja yang bisa saya bantu!";
        }

        // --- Help / Menu ---
        if (/^(help|menu|bantuan|tolong|commands|perintah|\?)/.test(q)) {
            return "📋 Berikut topik yang bisa kamu tanyakan:\n\n• \"siapa bagus\" — Profil lengkap\n• \"skill\" — Keahlian teknis\n• \"project\" — Daftar proyek\n• \"email\" / \"wa\" — Info kontak\n• \"sosmed\" — Link media sosial\n• \"pengalaman\" — Riwayat karir\n• \"pendidikan\" — Riwayat pendidikan\n• \"tech stack\" — Teknologi yang digunakan\n• \"cv\" — Download CV\n• \"play\" — Putar musik\n• \"stop\" — Hentikan musik";
        }

        // --- Identity / About ---
        if (/siapa|who|tentang|about|profil|profile|background|latar/.test(q)) {
            return "🧑‍💻 Bagus Priambudi, S.Kom — IT Data Analyst, Web3 Programmer, Vibe AI Specialist & Trader. Lulusan S1 Teknik Informatika dengan konsentrasi Data Analisis. Spesialisasi dalam arsitektur Web3, perdagangan algoritmik, dan membangun dashboard analytics berperforma tinggi.";
        }

        // --- Skills ---
        if (/skill|keahlian|kemampuan|bisa apa|abilities|expertise/.test(q)) {
            return "⚡ Keahlian Utama:\n\n• Frontend: React, Next.js, TypeScript, TailwindCSS\n• Backend: Node.js, Go, REST API, GraphQL\n• Data: Python, Pandas, SQL, Data Pipeline\n• Web3: Solidity, Smart Contracts, DeFi Protocols\n• Trading: Algorithmic Trading, Quantitative Analysis\n• DevOps: Docker, Vercel, CI/CD\n• Design: Figma, GSAP Animations, UI/UX";
        }

        // --- Tech Stack ---
        if (/tech|stack|teknologi|framework|tools|alat/.test(q)) {
            return "🛠️ Tech Stack:\n\n• Next.js 15 + TypeScript\n• TailwindCSS v4 + Framer Motion\n• Drizzle ORM + Vercel Postgres\n• GSAP + Anime.js Animations\n• Vercel Edge Deployment\n• Lucide Icons + Custom Design System";
        }

        // --- Projects ---
        if (/project|proyek|karya|portfolio|portofolio|kerja/.test(q)) {
            return "🚀 Proyek Unggulan:\n\n1. Vibe Commerce — E-commerce engine dengan inventaris real-time & glassmorphism UI\n2. Nebula Dashboard — Analitik cloud monitoring dengan grafik interaktif\n3. Aura Design System — Sistem desain premium untuk aplikasi web modern\n\nScroll ke bagian \"Karya Pilihan\" untuk melihat lebih detail!";
        }

        // --- Contact: WhatsApp ---
        if (/wa|whatsapp|chat|hubungi/.test(q)) {
            return `📱 Hubungi Bagus via WhatsApp: ${t("contact.wa")}\n\nSilakan langsung chat untuk diskusi proyek atau kolaborasi!`;
        }

        // --- Contact: Email ---
        if (/email|mail|surat|kirim/.test(q)) {
            return `📧 Email resmi: ${t("contact.email")}\n\nAtau scroll ke bagian \"Kontak\" di bawah untuk langsung mengirim pesan dari website ini!`;
        }

        // --- Social Media ---
        if (/sosmed|social|instagram|github|ig|link|media/.test(q)) {
            return `🌐 Media Sosial:\n\n• GitHub: ${t("contact.github")}\n• Instagram: ${t("contact.instagram")}\n\nFollow untuk update proyek terbaru!`;
        }

        // --- Experience ---
        if (/pengalaman|experience|karir|career|kerja|job|pekerjaan/.test(q)) {
            return "💼 Riwayat Profesional:\n\nBagus telah terjun ke industri perangkat lunak, mengembangkan sistem berskala besar. Spesialisasi di bidang Fullstack Development, Data Analytics, dan Algorithmic Trading di pasar Crypto & Forex.";
        }

        // --- Education ---
        if (/pendidikan|education|kuliah|sekolah|universitas|kampus|belajar/.test(q)) {
            return "🎓 Pendidikan:\n\n• S1 Teknik Informatika — Konsentrasi Data Analisis\n• Bootcamp & Sertifikasi — Spesialisasi Web3 & AI\n• Self-learning — Algorithmic Trading, Quantitative Finance";
        }

        // --- CV / Resume ---
        if (/cv|resume|curriculum|download|unduh/.test(q)) {
            return "📄 CV tersedia untuk di-download! Scroll ke bagian terminal \"CV Extraction Protocol\" di bawah, atau klik tombol DOWNLOAD CV setelah animasi terminal selesai.";
        }

        // --- Trading ---
        if (/trading|trader|crypto|forex|bitcoin|btc|eth|binance|futures/.test(q)) {
            return "📈 Trading Profile:\n\nBagus adalah Algorithmic Trader aktif di pasar Crypto Futures & Forex. Spesialisasi:\n• Quantitative Analysis & Signal Generation\n• Automated execution strategies\n• Risk management & portfolio optimization\n\nLihat dashboard trading di bagian \"Analisis Kuantitatif\"!";
        }

        // --- Web3 ---
        if (/web3|blockchain|smart contract|solidity|defi|nft|decentralized/.test(q)) {
            return "🔗 Web3 Expertise:\n\nBagus membangun kontrak pintar performa tinggi, protokol DeFi, dan arsitektur terdesentralisasi. Lihat bagian \"Arsitektur Terdesentralisasi\" untuk detail lebih lanjut!";
        }

        // --- AI ---
        if (/ai|artificial|intelligence|machine learning|ml|deep learning/.test(q)) {
            return "🤖 Saya adalah Vibe AI Agent — asisten virtual yang berjalan secara lokal di browser kamu. Saat ini saya bekerja dengan knowledge base offline. Di masa depan, Bagus berencana menghubungkan saya ke LLM backend untuk respons yang lebih cerdas!";
        }

        // --- Thanks ---
        if (/terima kasih|thanks|thank you|makasih|thx/.test(q)) {
            return "😊 Sama-sama! Senang bisa membantu. Jangan ragu untuk bertanya lagi kapan saja!";
        }

        // --- Location ---
        if (/lokasi|location|dimana|where|alamat|address|kota|city/.test(q)) {
            return "📍 Bagus berbasis di Indonesia. Terbuka untuk kolaborasi remote maupun on-site di wilayah Asia Tenggara.";
        }

        // --- Hire ---
        if (/hire|rekrut|available|tersedia|freelance|collab|kolaborasi/.test(q)) {
            return "✅ Bagus terbuka untuk peluang kolaborasi dan freelance! Silakan hubungi via:\n\n• WhatsApp: " + t("contact.wa") + "\n• Email: " + t("contact.email") + "\n\nAtau kirim pesan langsung dari form kontak di bawah!";
        }

        // --- Fallback: helpful suggestion ---
        return "🤔 Hmm, saya belum punya info spesifik untuk pertanyaan itu. Coba tanyakan salah satu topik berikut:\n\n• \"siapa bagus\" — Profil\n• \"skill\" — Keahlian\n• \"project\" — Proyek\n• \"email\" / \"wa\" — Kontak\n• \"help\" — Semua perintah\n\nAtau ketik \"help\" untuk daftar lengkap! 😊";
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMsg = { role: 'user', text: query };
        setHistory(prev => [...prev, userMsg]);
        const currentQuery = query;
        setQuery("");
        setIsTyping(true);

        setTimeout(() => {
            const response = getAIResponse(currentQuery);
            const aiMsg = { role: 'ai', text: response };
            setHistory(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 800 + Math.random() * 600);
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
                                        <p className="font-medium whitespace-pre-line">{msg.text}</p>
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

                {/* YouTube Audio — rendered always to bypass some autoplay restrictions on dynamic insertion */}
                <iframe
                    ref={iframeRef}
                    src={isPlaying ? "https://www.youtube.com/embed/6vNnB4oLZNo?autoplay=1&loop=1&playlist=6vNnB4oLZNo&enablejsapi=1" : "about:blank"}
                    allow="autoplay; encrypted-media"
                    style={{ position: 'fixed', left: '-9999px', top: '-9999px', width: '1px', height: '1px', border: 'none', opacity: 0, pointerEvents: 'none' }}
                    title="Background Music"
                />
            </div>
        </section>
    );
}
