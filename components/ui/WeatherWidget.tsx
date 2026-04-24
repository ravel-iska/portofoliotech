"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind, MapPin, Loader2, CloudLightning } from 'lucide-react';

interface WeatherData {
    temp: number;
    description: string;
    village: string;
    icon: React.ReactNode;
}

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError("Gps not supported");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                // 1. Get Village Name via Reverse Geocoding (Nominatim)
                const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`, {
                    headers: { 'Accept-Language': 'id' }
                });
                const geoData = await geoRes.json();

                // Village names in ID can be in 'village', 'suburb', or 'neighbourhood'
                const village = geoData.address.village ||
                    geoData.address.suburb ||
                    geoData.address.neighbourhood ||
                    geoData.address.city_district ||
                    "Unknown Sector";

                // 2. Get Weather Data (Open-Meteo)
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                const weatherData = await weatherRes.json();

                const temp = Math.round(weatherData.current_weather.temperature);
                const code = weatherData.current_weather.weathercode;

                let icon = <Sun className="text-yellow-400" size={18} />;
                let desc = "Cerah";

                if (code >= 1 && code <= 3) { desc = "Berawan"; icon = <Cloud className="text-blue-300" size={18} />; }
                else if (code >= 51 && code <= 67) { desc = "Hujan Ringan"; icon = <CloudRain className="text-blue-400" size={18} />; }
                else if (code >= 71 && code <= 86) { desc = "Salju/Dingin"; icon = <Wind className="text-blue-100" size={18} />; }
                else if (code >= 95) { desc = "Badai"; icon = <CloudLightning className="text-purple-400" size={18} />; }

                setWeather({ temp, description: desc, village, icon });
            } catch (err) {
                console.error(err);
                setError("Data failed");
            } finally {
                setLoading(false);
            }
        }, (err) => {
            setError("GPS Permission Denied");
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="fixed bottom-8 left-8 z-[100] group">
            <AnimatePresence mode="wait">
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white/40 font-mono text-[10px] tracking-widest uppercase"
                    >
                        <Loader2 size={14} className="animate-spin text-blue-400" />
                        Scanning Signal...
                    </motion.div>
                ) : weather ? (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 p-1 pl-4 pr-6 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full hover:border-blue-500/50 transition-all cursor-pointer group shadow-[0_0_40px_rgba(37,99,235,0.1)]"
                        onClick={fetchWeather}
                    >
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <MapPin size={10} className="text-blue-400 animate-pulse" />
                                <span className="text-white/40 font-mono text-[9px] uppercase tracking-tighter">Locals: {weather.village}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-white font-display font-medium text-sm">{weather.temp}°C</span>
                                <span className="text-white/30 font-mono text-[10px] uppercase">{weather.description}</span>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                            {weather.icon}
                        </div>
                    </motion.div>
                ) : error ? (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={fetchWeather}
                        className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 font-mono text-[10px] uppercase hover:bg-red-500/20 transition-all"
                    >
                        {error} (Retry)
                    </motion.button>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
