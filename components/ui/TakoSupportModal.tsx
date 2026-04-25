"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Loader2 } from "lucide-react";

interface TakoSupportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TakoSupportModal({ isOpen, onClose }: TakoSupportModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        amount: "",
        paymentMethod: "qris",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/tako-support", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success && data.paymentUrl) {
                // Redirect user to Tako.id payment page
                window.open(data.paymentUrl, "_blank");
                onClose();
            } else {
                console.error("Tako API response:", data);
                // Stringify the data if it lacks a message, to help us debug
                let errMsg = data.message;
                if (!errMsg) {
                    errMsg = JSON.stringify(data);
                }
                setError(errMsg);
            }
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Network error. Could not connect to support node.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-lg bg-[#02050a]/90 glass border border-white/10 rounded-2xl p-6 md:p-8 pointer-events-auto relative overflow-hidden"
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none" />

                            <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <Heart className="w-6 h-6 text-blue-400 animate-pulse" />
                                <h2 className="text-2xl font-display font-bold text-white tracking-wider">SUPPORT</h2>
                            </div>

                            <p className="text-white/60 font-mono text-xs mb-8">
                                Initialize a direct transfer via the Tako.id protocol.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Identifier (Name)</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-colors"
                                            placeholder="Anonymous"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Connect Email</label>
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-colors"
                                            placeholder="alias@domain.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Amount (IDR)</label>
                                        <input
                                            required
                                            type="number"
                                            min="10000"
                                            value={formData.amount}
                                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-colors"
                                            placeholder="50000"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Protocol</label>
                                        <select
                                            value={formData.paymentMethod}
                                            onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                                        >
                                            <option value="qris">QRIS (Global)</option>
                                            <option value="gopay">GoPay</option>
                                            <option value="dana">DANA</option>
                                            <option value="paypal">PayPal</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1 pt-2">
                                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Encrypted Message</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-colors h-24 resize-none"
                                        placeholder="Add an optional message payload..."
                                    />
                                </div>

                                {error && (
                                    <div className="text-red-400 text-xs font-mono bg-red-400/10 border border-red-400/20 p-3 rounded-lg">
                                        [ERROR]: {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full relative group overflow-hidden bg-white/5 border border-white/10 hover:border-blue-500/50 rounded-lg px-4 py-4 mt-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <div className="relative flex items-center justify-center gap-2">
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                                                <span className="text-white text-sm font-mono font-bold tracking-widest uppercase text-glow">Processing...</span>
                                            </>
                                        ) : (
                                            <span className="text-white text-sm font-mono font-bold tracking-widest uppercase group-hover:text-glow transition-all">
                                                Transmit Funds
                                            </span>
                                        )}
                                    </div>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
