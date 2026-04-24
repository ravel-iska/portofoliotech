"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineData = [
    {
        year: "2018",
        title: "The Beginning",
        description: "Wrote my very first line of code. Started experimenting with basic HTML & CSS, discovering the magic of the web.",
        highlight: "HTML/CSS"
    },
    {
        year: "2020",
        title: "Frontend Mastery",
        description: "Adopted React and modern JavaScript. Started building interactive web applications and diving into ecosystem tooling.",
        highlight: "React"
    },
    {
        year: "2022",
        title: "Fullstack Architecture",
        description: "Expanded to backend microservices, learning Node.js, databases, and Docker. Transitioned into a confident fullstack engineer.",
        highlight: "Node & Docker"
    },
    {
        year: "2024",
        title: "Advanced Systems",
        description: "Orchestrating cloud-native architectures with Next.js, Golang, and building complex immersive animations.",
        highlight: "Next.js & Go"
    },
    {
        year: "Present",
        title: "Continuous Innovation",
        description: "Focusing on creating premium aesthetics, glassmorphism designs, and high-performance immersive experiences.",
        highlight: "Web Architecture"
    }
];

export default function JourneyTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={sectionRef} className="relative py-32 bg-bg overflow-hidden border-t border-white/5">
            {/* Background Glow */}
            <div className="absolute right-[10%] top-[30%] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-display-md font-display font-bold text-white tracking-tighter drop-shadow-lg mb-4">
                        JOURNEY <span className="text-accent text-glow">TIMELINE</span>
                    </h2>
                    <p className="text-white/60 font-light max-w-xl mx-auto">
                        The evolution of logic, design, and architecture over the years.
                    </p>
                </div>

                <div className="relative">
                    {/* Line Background */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

                    {/* Animated Line Progress */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute left-4 md:left-1/2 top-0 w-px bg-gradient-to-b from-accent to-blue-500 shadow-[0_0_10px_rgba(0,255,135,0.5)] -translate-x-1/2 origin-top"
                    />

                    {/* Timeline Items */}
                    <div className="space-y-16">
                        {timelineData.map((item, i) => (
                            <TimelineItem key={i} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ item, index }: { item: any; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row w-full`}
        >
            {/* Timeline Node */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-bg border-2 border-accent shadow-[0_0_10px_rgba(0,255,135,0.4)] -translate-x-1/2 z-10" />

            {/* Content Box */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0">
                <div className={`glass-card p-8 rounded-3xl border border-white/10 hover:border-accent/30 transition-all ${isEven ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-bold tracking-widest text-accent uppercase mb-4 shadow-sm">
                        {item.year}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">
                        {item.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {item.description}
                    </p>
                    <div className="text-[10px] font-black tracking-widest text-white/40 uppercase">
                        // {item.highlight}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
