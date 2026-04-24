"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, User, MessageSquare, Mail, Cpu, LayoutDashboard, Menu, X, ChevronLeft, ChevronRight, TrendingUp, Sun, Moon, Globe, Shield, Code } from "lucide-react";
import { useState } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { useGlobal } from "@/components/core/GlobalProvider";

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const { theme, toggleTheme, language, setLanguage, t } = useGlobal();
    const navItems = [
        { name: t("nav.home"), icon: <Home size={20} />, href: "#home" },
        { name: t("nav.about"), icon: <User size={20} />, href: "#about" },
        { name: t("dashboard.title"), icon: <LayoutDashboard size={20} />, href: "#trading" },
        { name: t("nav.projects"), icon: <Cpu size={20} />, href: "#projects" },
        { name: t("nav.memories"), icon: <MessageSquare size={20} />, href: "#memories" },
        { name: "Support", icon: <Mail size={20} />, href: "#contact" },
    ];

    const [isOpen, setIsOpen] = useState(false); // Mobile toggle
    const [isCollapsed, setIsCollapsed] = useState(false); // Desktop toggle
    const [active, setActive] = useState(t("nav.home"));
    const lenis = useLenis();
    const [isLangOpen, setIsLangOpen] = useState(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
        e.preventDefault();
        setActive(name);
        setIsOpen(false);

        if (lenis && href.startsWith("#")) {
            lenis.scrollTo(href, { duration: 1.5, offset: -50 });
        } else {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-6 right-6 z-[110] p-3 glass-card lg:hidden text-accent shadow-xl rounded-xl"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Desktop & Mobile */}
            <aside
                className={`fixed left-0 top-0 h-screen glass border-r border-white/10 z-[100] transition-all duration-500 overflow-visible group 
                ${isOpen ? "translate-x-0 shadow-2xl w-64" : "-translate-x-full lg:translate-x-0"} 
                ${isCollapsed && !isOpen ? "lg:w-24" : "lg:w-72"}`}
            >
                {/* Subtle inner highlight to fake 3D glass volume */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />

                {/* Desktop Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="hidden lg:flex absolute -right-4 top-8 w-8 h-8 rounded-full glass-card border border-white/20 items-center justify-center text-white/50 hover:text-accent hover:border-accent transition-all z-20 shadow-lg"
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>

                <div className="flex flex-col h-full p-6 relative z-10 w-full">
                    {/* Logo Area */}
                    <div className={`flex items-center gap-4 mb-12 mt-2 transition-all duration-300 ${isCollapsed && !isOpen ? "justify-center" : ""}`}>
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-accent to-blue-500 shadow-[0_0_20px_rgba(129,140,248,0.4)] flex items-center justify-center text-white shrink-0">
                            <LayoutDashboard size={20} />
                        </div>
                        {(!isCollapsed || isOpen) && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-lg w-[140px] font-display font-bold text-white tracking-tight drop-shadow-md whitespace-nowrap"
                            >
                                DASHBOARD <span className="text-accent text-glow">VIBE</span>
                            </motion.span>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-3 mt-4">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href, item.name)}
                                className={`relative flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 group/item overflow-hidden ${active === item.name
                                    ? "text-white shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                                    : "text-muted hover:text-white"} ${isCollapsed && !isOpen ? "justify-center" : "gap-4"}`}
                                title={isCollapsed ? item.name : undefined}
                            >
                                {/* Active background glass layer */}
                                {active === item.name && (
                                    <motion.div
                                        layoutId="nav-bg"
                                        className="absolute inset-0 bg-white/10 border border-white/10"
                                        style={{ borderRadius: "1rem" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}

                                {/* Hover background (when not active) */}
                                {active !== item.name && (
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" style={{ borderRadius: "1rem" }} />
                                )}

                                <span className={`relative z-10 transition-transform duration-300 shrink-0 ${active === item.name ? "scale-110 text-accent text-glow" : "group-hover/item:scale-110"}`}>
                                    {item.icon}
                                </span>
                                {(!isCollapsed || isOpen) && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="relative z-10 w-[120px] font-bold text-xs tracking-[0.15em] uppercase whitespace-nowrap"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </a>
                        ))}

                        {(!isCollapsed || isOpen) && (
                            <div className="pt-6 mt-6 border-t border-white/5">
                                <a
                                    href="https://github.com/ravel-iska/portfolio-v2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-2xl text-white/40 hover:text-white transition-all hover:bg-white/5 border border-transparent hover:border-white/10 group/source"
                                >
                                    <Code size={18} className="group-hover/source:text-accent" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Source Code</span>
                                </a>
                            </div>
                        )}
                    </nav>

                    {/* I18n & Theme Toggles */}
                    {(!isCollapsed || isOpen) && (
                        <div className="mt-8 mb-6 flex flex-col gap-3 relative z-50">
                            <div className="flex gap-2 w-full relative">
                                {/* Theme Toggle */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleTheme();
                                    }}
                                    type="button"
                                    className="flex-1 px-4 py-3 rounded-xl glass-card border border-white/10 flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-white/70 hover:text-white cursor-pointer active:scale-95 shadow-md"
                                >
                                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                    <span className="text-xs font-bold font-mono tracking-widest">{theme.toUpperCase()}</span>
                                </button>

                                {/* Language Select */}
                                <div className="relative flex-1">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsLangOpen(!isLangOpen);
                                        }}
                                        type="button"
                                        className="w-full px-4 py-3 rounded-xl glass-card border border-white/10 flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10 transition-all text-white/70 hover:text-white shadow-md active:scale-95"
                                    >
                                        <Globe size={16} />
                                        <span className="text-xs font-bold font-mono tracking-widest">{language}</span>
                                    </button>

                                    <AnimatePresence>
                                        {isLangOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute bottom-full left-0 w-full mb-3 glass-card border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-2xl z-[100]"
                                            >
                                                {(["ID", "EN", "JP", "ZH", "RU"] as const).map(lang => (
                                                    <button
                                                        key={lang}
                                                        onClick={() => {
                                                            setLanguage(lang);
                                                            setIsLangOpen(false);
                                                        }}
                                                        className={`py-3 px-4 text-xs font-bold font-mono tracking-widest text-center hover:bg-white/10 transition-colors cursor-pointer ${language === lang ? 'text-accent bg-white/5' : 'text-white/60'}`}
                                                    >
                                                        {lang}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer Info */}
                    {(!isCollapsed || isOpen) ? (
                        <div className="mt-auto hidden lg:flex p-4 rounded-2xl glass-card border border-white/10 items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-50" />
                            <div className="relative text-center">
                                <p className="text-white/60 text-[10px] uppercase tracking-widest font-mono">Status</p>
                                <div className="flex items-center gap-2 justify-center mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse" />
                                    <p className="text-white font-bold text-xs">AVAILABLE</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-auto hidden lg:flex items-center justify-center pt-8">
                            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse" title="Available for work" />
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content pushed by Sidebar */}
            <main className={`relative z-10 min-h-screen transition-all duration-500 ease-out
                ${isCollapsed && !isOpen
                    ? "lg:ml-24"
                    : "lg:ml-72"
                }`}
            >
                {/* Overlay to block interaction on mobile when sidebar is open */}
                {isOpen && <div className="absolute inset-0 z-[100] cursor-pointer" onClick={() => setIsOpen(false)} />}
                {children}
            </main>
        </>
    );
}
