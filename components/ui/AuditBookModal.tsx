"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, BookOpen, ShieldAlert, Code, CheckCircle, Search, Layers } from "lucide-react";

interface AuditBookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const chapters = [
    {
        title: "Chapter 1: Esensi Audit Keamanan",
        icon: <BookOpen size={24} className="text-blue-900" />,
        heading: "Mengapa Smart Contract Perlu Diaudit?",
        content: (
            <div className="space-y-4">
                <p className="text-black/80 font-serif leading-relaxed text-base md:text-lg">
                    Audit keamanan kontrak pintar adalah proses tinjauan teliti dan metodis terhadap kode (biasanya Solidity atau Rust) oleh pakar keamanan. Tujuannya adalah menemukan celah kerentanan (vulnerabilities), eksploitasi logika, dan masalah kontrol akses sebelum kode dideploy ke Mainnet.
                </p>
                <div className="p-5 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg mt-4 shadow-sm">
                    <h5 className="font-bold text-blue-900 mb-2">Sifat Immutable Blockchain</h5>
                    <p className="text-blue-800/80 text-sm leading-relaxed">
                        Berbeda dengan Web2 standar, kode pada Web3 bersifat <strong>immutable</strong> (tidak dapat diubah) setelah rilis. Institusi mengelola miliaran dolar dalam satu kontrak; satu bug kecil dapat mengakibatkan pengurasan likuiditas permanen tanpa adanya mekanisme undo.
                    </p>
                </div>
            </div>
        )
    },
    {
        title: "Chapter 2: Lanskap Ancaman Web3",
        icon: <ShieldAlert size={24} className="text-red-900" />,
        heading: "Anatomi Cyber-Attack DeFi",
        content: (
            <div className="space-y-4">
                <p className="text-black/80 font-serif leading-relaxed text-base md:text-lg">
                    Hacker mengeksploitasi celah tingkat lanjut yang tidak ada dalam pengembangan tradisional. Beberapa vektor serangan yang paling umum dan menghancurkan antara lain:
                </p>
                <ul className="list-none space-y-3 mt-4">
                    <li className="flex gap-3 items-start">
                        <span className="text-red-600 mt-1">●</span>
                        <div>
                            <strong className="block text-red-900">Reentrancy Attacks</strong>
                            <span className="text-black/70 text-sm">Masuk kembali ke sebuah fungsi sebelum transaksi sebelumnya selesai mengupdate state/saldo.</span>
                        </div>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="text-red-600 mt-1">●</span>
                        <div>
                            <strong className="block text-red-900">Flash Loan Manipulation</strong>
                            <span className="text-black/70 text-sm">Distorsi harga Oracle sesaat menggunakan jutaan dolar modal tanpa agunan.</span>
                        </div>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="text-red-600 mt-1">●</span>
                        <div>
                            <strong className="block text-red-900">Front-running & MEV</strong>
                            <span className="text-black/70 text-sm">Mengeksploitasi urutan transaksi di Mempool untuk mendahului trade pengguna lain.</span>
                        </div>
                    </li>
                </ul>
            </div>
        )
    },
    {
        title: "Chapter 3: Metodologi Audit Institusional",
        icon: <Layers size={24} className="text-indigo-900" />,
        heading: "Pendekatan Lapis Ganda (Defense in Depth)",
        content: (
            <div className="space-y-4">
                <p className="text-black/80 font-serif leading-relaxed text-base md:text-lg">
                    Untuk memberikan jaminan sekelas institusi, kami menerapkan perlindungan defensif secara berlapis. Audit tidak hanya membaca kode, tetapi menguji limit matematika dan teori permainan di dalam sistem kontrak.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white p-4 rounded-xl border border-black/10 shadow-sm">
                        <h6 className="font-bold text-indigo-900 text-sm mb-2">1. Static Analysis</h6>
                        <p className="text-xs text-black/60">Pengecekan ribuan pola cacat keamanan umum menggunakan script secara instan.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-black/10 shadow-sm">
                        <h6 className="font-bold text-indigo-900 text-sm mb-2">2. Fuzzing</h6>
                        <p className="text-xs text-black/60">Memberikan jutaan input acak ke fungsi smart contract untuk mencari celah overflow/underflow.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-black/10 shadow-sm">
                        <h6 className="font-bold text-indigo-900 text-sm mb-2">3. Formal Verification</h6>
                        <p className="text-xs text-black/60">Pembuktian matematis bahwa sebuah fungsi pasti berjalan sesuai spesifikasinya dalam kondisi apa pun.</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-black/10 shadow-sm">
                        <h6 className="font-bold text-indigo-900 text-sm mb-2">4. Manual Review</h6>
                        <p className="text-xs text-black/60">Pakar menganalisis niat bisnis dan interaksi kompleks antar berbagai fungsi dan protokol.</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Chapter 4: Alat & Fuzzing Otomatis",
        icon: <Search size={24} className="text-amber-900" />,
        heading: "Otomatisasi Pengecekan Bug",
        content: (
            <div className="space-y-4">
                <p className="text-black/80 font-serif leading-relaxed text-base md:text-lg">
                    Infrastruktur audit bergantung pada mesin analisa mutakhir yang membedah Abstract Syntax Tree (AST) kontrak. Hal ini meminimalisir 'human-error' dalam kasus-kasus trivial.
                </p>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200 mt-4">
                    <h5 className="font-bold text-amber-900 mb-3 text-sm uppercase tracking-widest font-mono">Tools Ecosystem</h5>
                    <ul className="space-y-2 text-sm text-amber-800">
                        <li>✅ <strong>Slither:</strong> Analyzer untuk kerentanan solidity.</li>
                        <li>✅ <strong>Echidna:</strong> Smart contract property-based fuzzer.</li>
                        <li>✅ <strong>Mythril:</strong> Symbolic execution tool untuk EVM.</li>
                        <li>✅ <strong>Foundry / Forge test:</strong> Unit test berkecepatan tinggi dengan Rust.</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        title: "Chapter 5: Proses Resolusi & Verifikasi",
        icon: <CheckCircle size={24} className="text-emerald-900" />,
        heading: "Dari Temuan Menuju Standar Aman",
        content: (
            <div className="space-y-4">
                <p className="text-black/80 font-serif leading-relaxed text-base md:text-lg">
                    Setiap celah yang ditemukan diurutkan berdasarkan skala prioritas: Critical, High, Medium, Low, dan Informational. Setelah diidentifikasi, auditor merancang rekomendasi solusi optimal.
                </p>
                <p className="text-black/80 font-serif leading-relaxed text-base md:text-lg">
                    Tim pengembang akan menerapkan perbaikan, yang kemudian melewati proses verifikasi ulang (Re-audit) untuk memastikan bahwa patch tersebut berhasil menutup celah tanpa menciptakan bug baru. Hasil final dicetak dalam laporan publik berbentuk PDF.
                </p>
                <div className="p-4 bg-emerald-100/50 rounded-lg border border-emerald-200 mt-4 text-center">
                    <span className="text-emerald-800 font-bold tracking-widest uppercase text-xs">Ready for Mainnet Deployment</span>
                </div>
            </div>
        )
    },
    {
        title: "Chapter 6: Studi Kasus Konkret",
        icon: <Code size={24} className="text-gray-900" />,
        heading: "Implementasi & Perbaikan",
        content: (
            <div className="space-y-4">
                <p className="text-black/70 leading-relaxed text-sm font-serif">
                    Berikut adalah komparasi langsung antara sebuah kode primitif yang rentan (Vulnerable) melawan kode standar aman Web3 (Secure) yang telah melewati audit Reentrancy Guard dan penerapan pola Checks-Effects-Interactions.
                </p>

                <div className="mt-4 bg-[#1e1e1e] p-5 rounded-lg border border-black/10 shadow-inner overflow-hidden">
                    <p className="text-gray-400 font-mono text-[10px] mb-3 border-b border-white/10 pb-2">// Studi Kasus: Reentrancy Attack</p>

                    <div className="font-mono text-[10px] leading-relaxed">
                        <div className="text-red-400 bg-red-400/5 p-3 rounded mb-4 border border-red-400/20 shadow-sm relative">
                            <span className="absolute top-2 right-2 text-[8px] border border-red-400/50 px-2 py-0.5 bg-red-400/10 rounded">VULNERABLE</span>
                            <span className="block text-red-300 font-bold mb-2">// ❌ KODE RENTAN</span>
                            <span className="block">{"require(balances[msg.sender] > 0, 'Insf.');"}</span>
                            <span className="block">{"(bool success,) = msg.sender.call{value: balances[msg.sender]}('');"}</span>
                            <span className="block">{"require(success);"}</span>
                            <span className="block">balances[msg.sender] = 0; <span className="text-gray-500 italic block mt-1">// Bug: Saldo diubah SETELAH transfer dana! Penyerang jahat dapat melakukan re-enter via fallback!</span></span>
                        </div>

                        <div className="text-emerald-400 bg-emerald-400/5 p-3 rounded border border-emerald-400/20 shadow-sm relative">
                            <span className="absolute top-2 right-2 text-[8px] border border-emerald-400/50 px-2 py-0.5 bg-emerald-400/10 rounded">SECURE</span>
                            <span className="block text-emerald-300 font-bold mb-2">// ✅ SOLUSI AMAN (Checks-Effects-Interactions)</span>
                            <span className="block">{"uint256 bal = balances[msg.sender];"}</span>
                            <span className="block">{"require(bal > 0, 'Insf.');"}</span>
                            <span className="block">balances[msg.sender] = 0; <span className="text-gray-500 italic block mt-1">// Benar: Ubah memori internal (Effects) SEBELUM kirim eksternal (Interactions)</span></span>
                            <span className="block">{"(bool success,) = msg.sender.call{value: bal}('');"}</span>
                            <span className="block">{"require(success);"}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
];

export default function AuditBookModal({ isOpen, onClose }: AuditBookModalProps) {
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Reset pagination when opened
    useEffect(() => {
        if (isOpen) setPage(0);
    }, [isOpen]);

    if (!mounted || typeof document === "undefined") return null;

    const nextPage = () => {
        if (page < chapters.length - 1) setPage(p => p + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(p => p - 1);
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="audit-book-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
                >
                    {/* Background click to close */}
                    <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

                    {/* Book Container with pseudo-3D opening animation */}
                    <motion.div
                        key="audit-book-content"
                        initial={{ scale: 0.5, rotateY: 90, opacity: 0, x: -100 }}
                        animate={{ scale: 1, rotateY: 0, opacity: 1, x: 0 }}
                        exit={{ scale: 0.5, rotateY: 90, opacity: 0, x: -100 }}
                        transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 20,
                            mass: 1.2
                        }}
                        style={{ transformOrigin: "left center", perspective: "1500px" }}
                        className="relative z-10 w-full max-w-6xl h-[90vh] md:h-[700px] bg-[#fdfbf7] rounded-r-3xl rounded-l-xl shadow-[20px_20px_60px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(0,0,0,0.05)] border-l-[16px] border-[#1e293b] flex flex-col md:flex-row overflow-hidden"
                    >
                        {/* Book Spine Highlight Overlay */}
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none z-50" />

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 hover:scale-110 active:scale-95 transition-all shadow-md group"
                        >
                            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="flex flex-col md:flex-row w-full h-full relative z-10">
                            {/* Left Panel (Header & Context Info) */}
                            <div className="w-full md:w-1/3 bg-[#f3f0e8] border-b md:border-b-0 md:border-r border-black/10 p-8 md:p-12 flex flex-col justify-between relative shadow-inner shrink-0 overflow-y-auto custom-scrollbar">
                                <div>
                                    <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-black/40 mb-8 border-b border-black/10 pb-4">
                                        Web3 Security Division
                                    </h4>

                                    <h2 className="text-3xl md:text-4xl font-display font-black text-[#1e293b] mb-4 leading-tight">
                                        The Institutional Audit Book
                                    </h2>
                                    <p className="text-black/50 font-serif text-sm leading-relaxed mb-8">
                                        Materi eksklusif seputar audit kerentanan Smart Contract, standar pengamanan tingkat dewa, dan eksekusi pertahanan lapis ganda.
                                    </p>

                                    {/* Chapter Indicators */}
                                    <div className="space-y-2 mt-8">
                                        {chapters.map((ch, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setPage(idx)}
                                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${page === idx ? 'bg-white shadow-md border border-black/5' : 'hover:bg-black/5 border border-transparent'}`}
                                            >
                                                <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${page === idx ? 'bg-blue-600 text-white' : 'bg-black/10 text-black/50'}`}>
                                                    <span className="text-[10px] font-bold">{idx + 1}</span>
                                                </div>
                                                <span className={`text-xs font-bold leading-tight ${page === idx ? 'text-blue-900' : 'text-black/60'}`}>{ch.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 text-[9px] font-mono text-black/30 uppercase tracking-widest text-center shrink-0">
                                    CONFIDENTIAL - AUTHORIZED PERSONNEL ONLY
                                </div>
                            </div>

                            {/* Right Panel (Content Pages) */}
                            <div className="w-full md:w-2/3 p-8 md:p-14 relative bg-[#fdfbf7] flex flex-col h-full">
                                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={page}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-black/10 gap-4">
                                                <div className="flex items-center gap-3 text-black/50">
                                                    {chapters[page].icon}
                                                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest">{chapters[page].title}</h3>
                                                </div>
                                                <div className="font-mono text-xs font-bold text-black/30 bg-black/5 px-3 py-1 rounded-full shrink-0 w-fit">
                                                    PG. 0{page + 1}
                                                </div>
                                            </div>

                                            <h4 className="text-3xl md:text-5xl font-display font-black text-black mb-10 leading-tight">
                                                {chapters[page].heading}
                                            </h4>

                                            {chapters[page].content}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Pagination Controls */}
                                <div className="mt-8 pt-6 border-t border-black/10 flex flex-wrap items-center justify-between shrink-0 gap-4">
                                    <button
                                        onClick={prevPage}
                                        disabled={page === 0}
                                        className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs tracking-widest uppercase transition-all ${page === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-black/5 hover:bg-black/10 text-black'}`}
                                    >
                                        <ChevronLeft size={16} /> Prev
                                    </button>

                                    <div className="flex gap-2">
                                        {chapters.map((_, idx) => (
                                            <div key={idx} className={`w-2 h-2 rounded-full transition-all duration-300 ${page === idx ? 'bg-blue-600 w-8' : 'bg-black/20'}`} />
                                        ))}
                                    </div>

                                    <button
                                        onClick={nextPage}
                                        disabled={page === chapters.length - 1}
                                        className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs tracking-widest uppercase transition-all ${page === chapters.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30'}`}
                                    >
                                        Next <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
