import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Lock, Unlock, ShieldAlert, Award, Database, Code2 } from "lucide-react";
import Image from "next/image";

export default function Web3Vault() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const handleConnect = async () => {
        setIsConnecting(true);
        if (typeof window !== "undefined" && typeof (window as any).ethereum !== "undefined") {
            try {
                // Request account access
                const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);

                    // Add a slight delay for dramatic effect before shattering the lock
                    setTimeout(() => {
                        setIsUnlocked(true);
                        setIsConnecting(false);
                    }, 800);
                }
            } catch (err) {
                console.error("Wallet connection failed:", err);
                setIsConnecting(false);
                alert("Connection rejected or failed. Please try again.");
            }
        } else {
            setIsConnecting(false);
            alert("No Web3 wallet detected! Please install MetaMask or Trust Wallet to access the vault.");
        }
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-[60vh] py-24 bg-[#0a0f1d] flex flex-col items-center justify-center overflow-hidden border-y border-white/5">
            {/* Ambient Background Glow */}
            <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,184,255,0.05),transparent_70%)] transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-30'}`} />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center">

                <AnimatePresence mode="wait">
                    {!isUnlocked ? (
                        // LOCKED STATE
                        <motion.div
                            key="locked"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)", rotate: 5 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto glass p-12 rounded-3xl border border-white/10 relative overflow-hidden"
                        >
                            {/* Animated scanner line effect inside the box */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-[2px] bg-red-500/50 blur-[2px] z-0"
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />

                            <div className="relative z-10 bg-red-500/10 p-6 rounded-full border border-red-500/30 mb-8 shadow-[0_0_40px_rgba(255,0,0,0.2)]">
                                <Lock className="w-16 h-16 text-red-500" strokeWidth={1.5} />
                            </div>

                            <h3 className="text-2xl md:text-4xl font-display font-black tracking-widest text-red-500 uppercase mb-4 text-glow">
                                Classified Assets
                            </h3>
                            <p className="text-white/60 font-mono text-sm md:text-base leading-relaxed mb-8">
                                WARNING: LEVEL 5 CLEARANCE REQUIRED. CONNECT A VERIFIED WEB3 WALLET TO DECRYPT SECURE PROTOCOLS AND ACCESS THE VAULT ARCHIVE.
                            </p>

                            <button
                                onClick={handleConnect}
                                disabled={isConnecting}
                                className="relative group overflow-hidden bg-transparent border border-red-500/50 hover:border-red-500 text-red-500 px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50"
                            >
                                <div className="absolute inset-0 bg-red-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <div className="relative flex items-center gap-3">
                                    <ShieldAlert className={`w-4 h-4 ${isConnecting ? 'animate-pulse' : ''}`} />
                                    <span>{isConnecting ? "DECRYPTING..." : "CONNECT WALLET"}</span>
                                </div>
                            </button>
                        </motion.div>
                    ) : (
                        // UNLOCKED STATE
                        <motion.div
                            key="unlocked"
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="w-full flex flex-col items-center"
                        >
                            <div className="flex flex-col items-center text-center mb-16">
                                <motion.div
                                    initial={{ y: -20 }}
                                    animate={{ y: 0 }}
                                    className="bg-[#00ff87]/10 p-4 rounded-full border border-[#00ff87]/30 mb-6 shadow-[0_0_30px_rgba(0,255,135,0.2)]"
                                >
                                    <Unlock className="w-10 h-10 text-[#00ff87]" strokeWidth={2} />
                                </motion.div>
                                <h3 className="text-sm md:text-base font-mono font-bold tracking-[0.3em] text-[#00ff87] uppercase mb-2">
                                    Access Granted
                                </h3>
                                <p className="text-white/40 font-mono text-xs tracking-widest break-all">
                                    Identity Verified: {walletAddress}
                                </p>
                            </div>

                            {/* Vault Gallery Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass-card p-8 flex flex-col gap-4 border border-[#00ff87]/20 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Award className="w-24 h-24 text-[#00ff87]" />
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-[#00ff87]/10 flex items-center justify-center border border-[#00ff87]/30">
                                        <Award className="w-6 h-6 text-[#00ff87]" />
                                    </div>
                                    <h4 className="text-xl font-display font-bold text-white mt-4">Smart Contract Auditor</h4>
                                    <p className="text-white/50 text-sm font-mono leading-relaxed">
                                        Certified Web3 Security Level 3. Found 12+ critical vulnerabilities in production DeFi protocols.
                                    </p>
                                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Proof of Work</span>
                                        <span className="text-xs text-[#00ff87] font-mono">VERIFIED</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="glass-card p-8 flex flex-col gap-4 border border-[#00b8ff]/20 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Code2 className="w-24 h-24 text-[#00b8ff]" />
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-[#00b8ff]/10 flex items-center justify-center border border-[#00b8ff]/30">
                                        <Code2 className="w-6 h-6 text-[#00b8ff]" />
                                    </div>
                                    <h4 className="text-xl font-display font-bold text-white mt-4">Solidity Architect</h4>
                                    <p className="text-white/50 text-sm font-mono leading-relaxed">
                                        Engineered gas-optimized ERC-721A minting contracts saving an estimated 40% in deployment fees.
                                    </p>
                                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Lines of Code</span>
                                        <span className="text-xs text-[#00b8ff] font-mono">15,000+</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="glass-card p-8 flex flex-col gap-4 border border-[#ff9000]/20 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Database className="w-24 h-24 text-[#ff9000]" />
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-[#ff9000]/10 flex items-center justify-center border border-[#ff9000]/30">
                                        <Database className="w-6 h-6 text-[#ff9000]" />
                                    </div>
                                    <h4 className="text-xl font-display font-bold text-white mt-4">HFT Bot Operator</h4>
                                    <p className="text-white/50 text-sm font-mono leading-relaxed">
                                        Proprietary MEV arbitrage scripts querying mempool RPCs in sub-millisecond speeds.
                                    </p>
                                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Transactions</span>
                                        <span className="text-xs text-[#ff9000] font-mono">2.4M+</span>
                                    </div>
                                </motion.div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
