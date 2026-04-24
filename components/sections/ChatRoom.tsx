"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, MessageSquare } from "lucide-react";

export default function ChatRoom() {
    const [messages, setMessages] = useState([
        { id: 1, user: "System", text: "Welcome to the Vibe Room.", time: "12:00", self: false },
        { id: 2, user: "Alex", text: "Yo, check out the new dashboard!", time: "12:05", self: false },
    ]);
    const [inputValue, setInputValue] = useState("");

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage = {
            id: Date.now(),
            user: "You",
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            self: true
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    return (
        <section id="chatroom" className="py-24 px-6 border-t border-white/5 bg-surface/10 relative z-10">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-display font-bold mb-4">CHAT <span className="text-accent">ROOM</span></h2>
                    <p className="text-muted">A space for real-time collaboration and feedback.</p>
                </div>

                <div className="glass-card flex flex-col h-[600px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">General Station</h3>
                                <p className="text-[10px] text-accent uppercase tracking-widest font-bold">4 Online</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex items-start gap-3 ${msg.self ? "flex-row-reverse" : ""}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${msg.self ? "bg-accent text-bg" : "bg-white/10 text-white"}`}>
                                        {msg.self ? "U" : msg.user[0]}
                                    </div>
                                    <div className={`max-w-[70%] p-4 rounded-2xl ${msg.self ? "bg-accent/10 border border-accent/20 text-white" : "bg-white/5 border border-white/10 text-muted"}`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <span className="block mt-2 text-[8px] opacity-50 text-right">{msg.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Input Area */}
                    <form onSubmit={sendMessage} className="p-6 border-t border-white/5 bg-white/5 flex gap-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type progress updates..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent transition-colors text-sm"
                        />
                        <button type="submit" className="p-3 bg-accent text-bg rounded-xl hover:scale-105 active:scale-95 transition-transform shrink-0 shadow-lg shadow-accent/20">
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
