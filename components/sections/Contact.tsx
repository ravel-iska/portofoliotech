/**
 * Tujuan      : Contact section dengan form dan social links
 * Caller      : app/page.tsx
 * Dependensi  : Framer Motion, Lucide React
 */

"use client";

import { motion } from "framer-motion";
import { Send, Mail, Code, User, Globe, MapPin } from "lucide-react";
import PremiumMap from "@/components/ui/PremiumMap";

export default function Contact() {
    return (
        <section id="contact" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Info Side */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-display-md font-display font-bold mb-8"
                        >
                            LET'S START A <br />
                            <span className="text-accent">PROJECT</span> TOGETHER
                        </motion.h2>

                        <div className="space-y-8 mt-12">
                            <ContactInfoItem
                                icon={<Mail className="text-accent" />}
                                title="Email Me"
                                value="hello@vibestudio.com"
                                link="mailto:hello@vibestudio.com"
                            />
                            <ContactInfoItem
                                icon={<MapPin className="text-accent" />}
                                title="Location"
                                value="Yogyakarta, Indonesia"
                            />
                        </div>

                        <div className="mt-16">
                            <h4 className="text-xs uppercase tracking-[0.3em] font-bold text-muted mb-6">
                                Social Profiles
                            </h4>
                            <div className="flex gap-4">
                                <SocialLink icon={<Code size={20} />} href="#" />
                                <SocialLink icon={<User size={20} />} href="#" />
                                <SocialLink icon={<Globe size={20} />} href="#" />
                            </div>
                        </div>

                        {/* Premium Animated Map */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <PremiumMap />
                        </motion.div>
                    </div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 md:p-12 relative overflow-hidden"
                    >
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -z-10" />

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted">Message</label>
                                <textarea
                                    placeholder="Tell me about your project..."
                                    rows={5}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent transition-colors resize-none"
                                />
                            </div>

                            <button className="w-full bg-accent text-bg font-bold py-4 rounded-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                                <span>Send Message</span>
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ContactInfoItem({ icon, title, value, link }: any) {
    return (
        <div className="flex items-start gap-4">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                {icon}
            </div>
            <div>
                <h4 className="text-xs font-bold text-muted uppercase tracking-widest mb-1">{title}</h4>
                {link ? (
                    <a href={link} className="text-xl font-medium text-white hover:text-accent transition-colors">
                        {value}
                    </a>
                ) : (
                    <p className="text-xl font-medium text-white">{value}</p>
                )}
            </div>
        </div>
    );
}

function SocialLink({ icon, href }: any) {
    return (
        <a
            href={href}
            className="p-4 bg-white/5 border border-white/10 rounded-xl text-muted hover:text-accent hover:border-accent transition-all"
        >
            {icon}
        </a>
    );
}
