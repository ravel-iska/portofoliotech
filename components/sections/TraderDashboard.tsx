import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity, BarChart2, Wallet, ArrowUpRight, ArrowDownRight, RefreshCcw, Globe2, Layers, Grid3X3 } from "lucide-react";
import GlobeHeatmap from "@/components/canvas/GlobeHeatmap";
import TradingCubes from "@/components/canvas/TradingCubes";
import TokenGrid3D from "@/components/canvas/TokenGrid3D";
import { useGlobal } from "@/components/core/GlobalProvider";

type CryptoData = {
    price: string;
    change: number;
    color: string;
};

export default function TraderDashboard() {
    const { t } = useGlobal();
    const [btc, setBtc] = useState<CryptoData>({ price: 'Loading...', change: 0, color: 'text-gray-400' });
    const [eth, setEth] = useState<CryptoData>({ price: 'Loading...', change: 0, color: 'text-gray-400' });
    const [sol, setSol] = useState<CryptoData>({ price: 'Loading...', change: 0, color: 'text-gray-400' });
    const [balance, setBalance] = useState("$124,530.00");
    const [profit, setProfit] = useState("+12.4%");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Live WebSockets for real-time crypto prices
    useEffect(() => {
        const wsBtc = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');
        const wsEth = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@ticker');
        const wsSol = new WebSocket('wss://stream.binance.com:9443/ws/solusdt@ticker');

        const handleMessage = (setter: any) => (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            const price = parseFloat(data.c).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
            const changeStr = parseFloat(data.P).toFixed(2);
            const change = parseFloat(changeStr);
            const color = change >= 0 ? "text-[#00ff87]" : "text-[#ff2a5f]";
            setter({ price, change, color });
        };

        wsBtc.onmessage = handleMessage(setBtc);
        wsEth.onmessage = handleMessage(setEth);
        wsSol.onmessage = handleMessage(setSol);

        return () => {
            wsBtc.close();
            wsEth.close();
            wsSol.close();
        };
    }, []);

    // Random Balance Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            const base = 124500;
            const volatility = Math.random() * 2000 - 1000;
            const newBal = base + volatility;
            setBalance(newBal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
            setProfit(volatility > 0 ? `+${(Math.random() * 2 + 10).toFixed(1)}%` : `-${(Math.random() * 2).toFixed(1)}%`);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Simulated Candlestick Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frameId: number;
        let offset = 0;

        const drawChart = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const w = 8;
            const gap = 4;
            const cols = Math.floor(canvas.width / (w + gap));

            for (let i = 0; i < cols; i++) {
                const x = i * (w + gap);
                // Math wizardry for nice looking fake candles
                const noise = Math.sin((i + offset) * 0.2) * 20 + Math.cos((i * 0.5 + offset)) * 10;
                const candleH = Math.abs(noise);
                const baseY = canvas.height / 2 - noise;

                ctx.fillStyle = Math.sin((i + offset) * 0.1) > 0 ? '#00ff87' : '#ff2a5f';
                ctx.fillRect(x, baseY, w, candleH + 10);

                // Wick
                ctx.fillRect(x + w / 2 - 0.5, baseY - 5, 1, candleH + 20);
            }
            offset += 0.5;
            frameId = requestAnimationFrame(drawChart);
        };
        drawChart();

        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <section id="trading" className="relative py-16 px-6 overflow-hidden min-h-[50vh] flex items-center bg-bg">
            {/* Holographic Order Book Glows */}
            <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#00ff87]/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#ff2a5f]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container max-w-7xl mx-auto relative z-10">
                <div className="mb-16 text-center lg:text-left">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 glass-card text-white/50 text-[10px] uppercase font-mono tracking-widest mb-6">
                            <Activity size={14} className="text-[#00ff87]" /> {t("dashboard.stats")}
                        </div>
                        <h2 className="text-3xl md:text-8xl font-display font-black text-white tracking-tighter leading-none mb-4 md:mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{t("dashboard.title")}</span> <br />
                            <span className="text-[#00ff87] italic drop-shadow-[0_0_20px_rgba(0,255,135,0.4)]">{t("dashboard.role")}.</span>
                        </h2>
                        <p className="text-white/40 font-mono text-sm max-w-2xl mx-auto lg:mx-0">
                            {t("dashboard.desc")}
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Live Tracking Column */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Token Card */}
                        {[
                            { name: 'BTC/USDT', data: btc, logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=029' },
                            { name: 'ETH/USDT', data: eth, logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029' },
                            { name: 'SOL/USDT', data: sol, logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=029' },
                        ].map((token) => (
                            <motion.div key={token.name} whileHover={{ scale: 1.02 }} className="p-6 glass-card border border-white/10 rounded-3xl flex items-center justify-between shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#00ff87]/0 to-transparent group-hover:from-[#00ff87]/5 transition-all duration-500" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center p-2.5">
                                        <img src={token.logo} alt={token.name} className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                                    </div>
                                    <div>
                                        <div className="text-white font-display font-bold text-lg">{token.name}</div>
                                        <div className="text-white/40 font-mono text-[10px] tracking-widest">PERPETUAL</div>
                                    </div>
                                </div>
                                <div className="text-right relative z-10">
                                    <div className="text-white font-mono font-bold text-xl">{token.data.price}</div>
                                    <div className={`font-mono text-xs flex items-center justify-end gap-1 ${token.data.color}`}>
                                        {token.data.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        {token.data.change > 0 ? '+' : ''}{token.data.change}%
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Chart & Wallet Column */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Interactive Wallet Balance */}
                        <div className="p-8 md:p-12 glass-card border border-white/10 rounded-[2.5rem] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-white/5 to-transparent blur-2xl" />
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Wallet className="text-white/40" size={20} />
                                        <span className="text-white/40 font-mono text-xs uppercase tracking-widest">{t("dashboard.wallet")}</span>
                                    </div>
                                    <motion.div
                                        key={balance}
                                        initial={{ opacity: 0.8, y: -2 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-3xl md:text-8xl font-display font-black text-white tracking-tighter"
                                        style={{ fontVariantNumeric: 'tabular-nums' }}
                                    >
                                        {balance}
                                    </motion.div>
                                    <div className={`flex items-center gap-2 mt-4 font-mono ${profit.startsWith('+') ? 'text-[#00ff87]' : 'text-[#ff2a5f]'}`}>
                                        <TrendingUp size={16} /> <span className="text-sm">{t("dashboard.pnl")}: {profit}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div
                                        onClick={() => window.open("https://www.binance.com", "_blank")}
                                        className="px-5 py-3 glass rounded-2xl border border-white/10 flex items-center justify-between gap-6 hover:bg-white/5 cursor-pointer transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src="https://cdn.simpleicons.org/binance/F0B90B" alt="Binance" className="w-5 h-5" />
                                            <span className="text-white/60 font-mono text-xs">Binance</span>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-[#00ff87] shadow-[0_0_8px_#00ff87]" />
                                    </div>
                                    <div
                                        onClick={() => window.open("https://www.bybit.com", "_blank")}
                                        className="px-5 py-3 glass rounded-2xl border border-white/10 flex items-center justify-between gap-6 hover:bg-white/5 cursor-pointer transition-all"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src="https://cdn.simpleicons.org/bybit/white" alt="Bybit" className="w-5 h-5" />
                                            <span className="text-white/60 font-mono text-xs">Bybit</span>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-[#00ff87] shadow-[0_0_8px_#00ff87]" />
                                    </div>
                                    <div
                                        onClick={() => window.open("https://www.bitget.com", "_blank")}
                                        className="px-5 py-3 glass rounded-2xl border border-white/10 flex items-center justify-between gap-6 hover:bg-white/5 cursor-pointer transition-all gap-8"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img src="https://cdn.simpleicons.org/bitget/00F0FF" alt="Bitget" className="w-5 h-5" />
                                            <span className="text-white/60 font-mono text-xs">Bitget</span>
                                        </div>
                                        <RefreshCcw size={12} className="text-white/20 animate-spin" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Animated Canvas Chart Container replaced with Premium 3D Cubes */}
                        <div className="flex-1 space-y-8">
                            <div className="flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-2xl w-fit">
                                <Layers size={16} className="text-blue-400" />
                                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">3D Infrastructure View</span>
                            </div>
                            <TradingCubes />
                        </div>
                    </div>

                    {/* New Token Grid 3D Row */}
                    <div className="lg:col-span-12 mt-12">
                        <div className="flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-2xl w-fit mb-8">
                            <Grid3X3 size={16} className="text-purple-400" />
                            <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">{t("dashboard.wall")}</span>
                        </div>
                        <TokenGrid3D />
                    </div>

                    {/* Interactive Globe Row */}
                    <div className="lg:col-span-12 p-8 md:p-12 glass-card border border-white/10 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-10 mt-8">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-accent/10 to-transparent blur-3xl rounded-full" />
                        <div className="w-full md:w-1/3 z-10 relative">
                            <div className="flex items-center gap-3 mb-6">
                                <Globe2 className="text-accent" size={24} />
                                <span className="text-white font-mono uppercase tracking-[0.3em] text-sm">Server Latency Node</span>
                            </div>
                            <h3 className="text-4xl lg:text-6xl font-display font-black text-white leading-none mb-6">GLOBAL <span className="text-accent">ROUTING</span></h3>
                            <p className="text-white/40 font-mono text-sm leading-relaxed mb-8">
                                Visualizing real-time websocket connections to major financial engines across optimal regions: NY, SF, London, Dubai, and Singapore.
                            </p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-white/30 font-mono text-xs uppercase">NY (Equinix NY4)</span>
                                    <span className="text-accent font-mono text-xs">8ms</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-white/30 font-mono text-xs uppercase">Tokyo (TY3)</span>
                                    <span className="text-accent font-mono text-xs">12ms</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-2/3 h-[400px] lg:h-[500px] relative z-0 flex items-center justify-center -mr-10 -my-10">
                            <GlobeHeatmap />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
