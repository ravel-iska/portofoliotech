"use client";

import { Download } from "lucide-react";
import { downloadVCard } from "@/lib/vcard";
import { motion } from "framer-motion";

export default function VCardButton() {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadVCard}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-white hover:border-accent hover:text-accent transition-all duration-300 shadow-lg backdrop-blur-md"
        >
            <Download size={16} />
            <span>SAVE CONTACT (vCARD)</span>
        </motion.button>
    );
}
