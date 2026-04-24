"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

export default function Education() {
    const educationData = [
        {
            year: "2019 - 2023",
            title: "Bachelor of Computer Science",
            institution: "University of Technology",
            description: "Specialized in Software Engineering and Distributed Systems. Graduated with honors, focusing on modern web infrastructures.",
            icon: <GraduationCap size={20} />
        },
        {
            year: "2023",
            title: "Fullstack Web Engineering",
            institution: "Advanced Tech Academy",
            description: "Intensive program mastering React, Node.js, and Cloud Infrastructure to build scalable microservices.",
            icon: <BookOpen size={20} />
        },
        {
            year: "2024",
            title: "Certified Kubernetes & Docker Expert",
            institution: "Cloud Native Computing Foundation",
            description: "Achieved professional certification for building and orchestrating resilient containerized applications.",
            icon: <Award size={20} />
        }
    ];

    return (
        <section id="education" className="py-32 px-6 bg-surface/20 border-t border-white/5 relative z-10">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-display-md font-display font-bold mb-4">
                        ACADEMIC <span className="text-accent">BACKGROUND</span>
                    </h2>
                    <p className="text-muted max-w-xl mx-auto">
                        My formal education and continuous learning journey in the tech industry.
                    </p>
                </motion.div>

                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {educationData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-bg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 group-hover:bg-accent group-hover:text-bg transition-colors duration-500">
                                {item.icon}
                            </div>

                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl hover:border-accent/30 hover:-translate-y-1 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-accent tracking-widest">
                                        {item.year}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold font-display text-white mb-1">{item.title}</h3>
                                <h4 className="text-sm font-medium text-white/50 mb-4">{item.institution}</h4>
                                <p className="text-muted text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
