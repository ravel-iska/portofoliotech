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
    const [isOpen, setIsOpen] = useState(false);

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
                const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`, {
                    headers: { 'Accept-Language': 'id' }
                });
                const geoData = await geoRes.json();

                const village = geoData.address.village ||
                    geoData.address.suburb ||
                    geoData.address.neighbourhood ||
                    geoData.address.city_district ||
                    "Unknown Sector";

                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                const weatherData = await weatherRes.json();

                const temp = Math.round(weatherData.current_weather.temperature);
                const code = weatherData.current_weather.weathercode;

                let icon = <Sun className="text-yellow-400" size={16} />;
                let desc = "Cerah";

                if (code >= 1 && code <= 3) { desc = "Berawan"; icon = <Cloud className="text-blue-300" size={16} />; }
                else if (code >= 51 && code <= 67) { desc = "Hujan Ringan"; icon = <CloudRain className="text-blue-400" size={16} />; }
                else if (code >= 71 && code <= 86) { desc = "Salju/Dingin"; icon = <Wind className="text-blue-100" size={16} />; }
                else if (code >= 95) { desc = "Badai"; icon = <CloudLightning className="text-purple-400" size={16} />; }

                setWeather({ temp, description: desc, village, icon });
            } catch (err) {
                console.error(err);
                setError("Data failed");
            } finally {
                setLoading(false);
            }
        }, () => {
            setError("GPS Permission Denied");
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-[100]">
            {/* Small toggle icon — less intrusive */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/10 transition-all"
            >
                {weather?.icon || <Cloud size={14} />}
            </button>

            {/* Expandable panel on click */}
            <AnimatePresence>
                {isOpen && weather && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-12 left-0 p-3 bg-black/90 border border-white/10 rounded-xl shadow-2xl min-w-[180px]"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                                {weather.icon}
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <MapPin size={8} className="text-blue-400" />
                                    <span className="text-white/40 font-mono text-[8px] uppercase">{weather.village}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-display font-medium text-sm">{weather.temp}°C</span>
                                    <span className="text-white/30 font-mono text-[9px]">{weather.description}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
