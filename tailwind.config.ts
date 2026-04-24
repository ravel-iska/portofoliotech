import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "#0A1128",
                surface: "#111827",
                border: "#1E293B",
                accent: "#00ff87",
                "accent-2": "#0070f3",
                text: "#ededed",
                muted: "#888888",
            },
            fontFamily: {
                display: ["var(--font-clash)", "sans-serif"],
                sans: ["var(--font-satoshi)", "sans-serif"],
            },
            fontSize: {
                "display-xl": "clamp(3rem, 10vw, 8rem)",
                "display-lg": "clamp(2rem, 6vw, 5rem)",
                "display-md": "clamp(1.5rem, 4vw, 3rem)",
            },
            backgroundImage: {
                "glass-gradient": "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))",
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    plugins: [],
};
export default config;
