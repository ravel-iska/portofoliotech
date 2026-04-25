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
        currency: "IDR",
        paymentMethod: "qris",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Configuration for dynamic behavior based on currency
    const currencyConfig: Record<string, { protocols: { value: string; label: string }[]; min: number; placeholder: string }> = {
        IDR: {
            protocols: [
                { value: "qris", label: "QRIS (Global)" },
                { value: "gopay", label: "GoPay" },
                { value: "dana", label: "DANA" },
            ],
            min: 10000,
            placeholder: "50000"
        },
        USD: {
            protocols: [
                { value: "paypal", label: "PayPal" }
            ],
            min: 1,
            placeholder: "5"
        },
        EUR: {
            protocols: [
                { value: "paypal", label: "PayPal" }
            ],
            min: 1,
            placeholder: "5"
        },
        SGD: {
            protocols: [
                { value: "paypal", label: "PayPal" }
            ],
            min: 1,
            placeholder: "5"
        }
    };

    const currentConfig = currencyConfig[formData.currency] || currencyConfig["IDR"];

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = e.target.value;
        const newConfig = currencyConfig[newCurrency];

        // If current protocol isn't available in new currency (and isn't crypto), switch to first available
        let newPaymentMethod = formData.paymentMethod;
        if (newPaymentMethod !== "crypto" && !newConfig.protocols.find(p => p.value === newPaymentMethod)) {
            newPaymentMethod = newConfig.protocols[0].value;
        }

        setFormData({
            ...formData,
            currency: newCurrency,
            paymentMethod: newPaymentMethod
        });
    };

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

            // The actual payload is inside `data.result` according to the 206 status response
            const success = data.success || data.result?.success;
            const paymentUrl = data.paymentUrl || data.result?.paymentUrl;

            if (success && paymentUrl) {
                // Redirect user to Tako.id payment page
                window.open(paymentUrl, "_blank");
                onClose();
            } else {
                console.error("Tako API response:", data);
                let errMsg = data.message || data.result?.message;
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
                                    {formData.paymentMethod !== "crypto" && (
                                        <>
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
                                        </>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {formData.paymentMethod !== "crypto" && (
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="space-y-1 col-span-2">
                                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Amount</label>
                                                <input
                                                    required
                                                    type="number"
                                                    min={currentConfig.min}
                                                    value={formData.amount}
                                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-colors"
                                                    placeholder={currentConfig.placeholder}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Currency</label>
                                                <select
                                                    value={formData.currency}
                                                    onChange={handleCurrencyChange}
                                                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-colors appearance-none text-center"
                                                >
                                                    <option value="IDR">IDR</option>
                                                    <option value="USD">USD</option>
                                                    <option value="EUR">EUR</option>
                                                    <option value="SGD">SGD</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                    <div className={`space-y-1 ${formData.paymentMethod === 'crypto' ? 'col-span-2' : ''}`}>
                                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Protocol</label>
                                        <select
                                            value={formData.paymentMethod}
                                            onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                                        >
                                            <optgroup label="Fiat">
                                                {currentConfig.protocols.map((protocol) => (
                                                    <option key={protocol.value} value={protocol.value}>
                                                        {protocol.label}
                                                    </option>
                                                ))}
                                            </optgroup>
                                            <optgroup label="Web3">
                                                <option value="crypto">Web3 / Crypto</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>

                                {/* Crypto specific view */}
                                {formData.paymentMethod === "crypto" && (
                                    <div className="p-4 glass border border-[#00ff87]/30 bg-[#00ff87]/5 rounded-lg flex flex-col items-center justify-center gap-3">
                                        <p className="text-white/60 font-mono text-xs text-center">
                                            Send ERC-20, BEP-20, or Polygon tokens directly to our secure vault.
                                        </p>
                                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-3 rounded-lg w-full justify-between">
                                            <span className="font-mono text-xs text-[#00ff87] md:text-sm tracking-wider truncate">
                                                0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => navigator.clipboard.writeText("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")}
                                                className="text-[10px] uppercase font-bold text-white bg-blue-500/20 hover:bg-blue-500/40 px-3 py-1.5 rounded transition-colors shrink-0"
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {formData.paymentMethod !== "crypto" && (
                                    <div className="space-y-1 pt-2">
                                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Encrypted Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-colors h-24 resize-none"
                                            placeholder="Add an optional message payload..."
                                        />
                                    </div>
                                )}

                                {error && (
                                    <div className="text-red-400 text-xs font-mono bg-red-400/10 border border-red-400/20 p-3 rounded-lg">
                                        [ERROR]: {error}
                                    </div>
                                )}

                                {formData.paymentMethod !== "crypto" ? (
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
                                ) : (
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="w-full bg-[#00ff87]/10 hover:bg-[#00ff87]/20 border border-[#00ff87]/30 text-[#00ff87] rounded-lg px-4 py-4 mt-4 transition-all duration-300 font-mono font-bold tracking-widest uppercase text-sm"
                                    >
                                        DONE
                                    </button>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
