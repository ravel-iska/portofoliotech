"use client";

import { useState, useEffect } from "react";
import nextDynamic from "next/dynamic";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { projects, Project } from "@/data/projects";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = nextDynamic(() => import("@/components/sections/Hero"), { ssr: true });
const About = nextDynamic(() => import("@/components/sections/About"), { ssr: true });
const InfiniteMarquee = nextDynamic(() => import("@/components/ui/InfiniteMarquee"), { ssr: true });
const PremiumCryptoShowcase = nextDynamic(() => import("@/components/sections/PremiumCryptoShowcase"), { ssr: false });
const QuantumArbitrageVisualizer = null; // DELETED
const TraderDashboard = nextDynamic(() => import("@/components/sections/TraderDashboard"), { ssr: false });
const LifeJourney = nextDynamic(() => import("@/components/sections/LifeJourney"), { ssr: false });
const IsometricTimeline = nextDynamic(() => import("@/components/sections/IsometricTimeline"), { ssr: false });
const ProfileSlide = nextDynamic(() => import("@/components/sections/ProfileSlide"), { ssr: false });
const Projects = nextDynamic(() => import("@/components/sections/Projects"), { ssr: false });
const ProjectSlider = nextDynamic(() => import("@/components/sections/ProjectSlider"), { ssr: false });
const HackerCV = nextDynamic(() => import("@/components/sections/HackerCV"), { ssr: false });
const SkillTree3D = nextDynamic(() => import("@/components/sections/SkillTree3D"), { ssr: false });
const TechFlowChart = nextDynamic(() => import("@/components/sections/TechFlowChart"), { ssr: false });
const Web3Vault = nextDynamic(() => import("@/components/sections/Web3Vault"), { ssr: false });
const SmartChat = nextDynamic(() => import("@/components/sections/SmartChat"), { ssr: false });
const ContactSection = nextDynamic(() => import("@/components/sections/ContactSection"), { ssr: false });
const Footer = nextDynamic(() => import("@/components/sections/Footer"), { ssr: true });
const WelcomeRobot = nextDynamic(() => import("@/components/ui/WelcomeRobot"), { ssr: false });
const MeshBackground = nextDynamic(() => import("@/components/ui/MeshBackground"), { ssr: true });
const MemoryGallery = nextDynamic(() => import("@/components/sections/MemoryGallery"), { ssr: false });
const SponsorMarquee = nextDynamic(() => import("@/components/sections/SponsorMarquee"), { ssr: false });
const WeatherWidget = nextDynamic(() => import("@/components/ui/WeatherWidget"), { ssr: false });
const NetworkTrafficMap = nextDynamic(() => import("@/components/ui/NetworkTrafficMap"), { ssr: false });
import LazySection from "@/components/ui/LazySection";
import { createPortal } from "react-dom";

export default function PortfolioHome() {
    // New Order: Storytelling Mockup -> Unlocked (Main Portfolio)
    // Dropping Earth Landing
    const [flowState, setFlowState] = useState<'story' | 'unlocked'>('story');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isAdminVisible, setIsAdminVisible] = useState(false);

    useEffect(() => {
        const handleHashChange = () => {
            setIsAdminVisible(window.location.hash === "#admin");
        };
        window.addEventListener("hashchange", handleHashChange);
        handleHashChange();
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            if (flowState === 'story') {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                // Need a tiny delay for GSAP to adapt to the restored scroll layout
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 100);
            }
        }
        return () => {
            if (typeof document !== 'undefined') document.body.style.overflow = '';
        };
    }, [flowState]);

    // Apply GSAP animations natively right from the start!
    useGsapScroll(true);

    return (
        <div className={`flex flex-col relative w-full bg-bg min-h-screen`}>

            {/* Phase 1: Scroll-driven Storytelling (Isolated via Portal) */}
            {flowState === 'story' && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[999999] bg-[#050508] text-white">
                    <IsometricTimeline onComplete={() => setFlowState('unlocked')} />
                </div>,
                document.body
            )}

            {/* The main portfolio content is always rendered so GSAP builds the DOM layout natively */}
            <div className={`relative w-full overflow-x-hidden min-h-screen ${flowState === 'story' ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-1000'}`}>
                <MeshBackground />
                <Hero />
                <SponsorMarquee />
                <InfiniteMarquee />

                <div className="w-full relative z-10 bg-gradient-to-b from-transparent via-black/20 to-black/95">
                    <About />
                    <LazySection minHeight="300px">
                        <LifeJourney />
                    </LazySection>
                    <LazySection minHeight="400px">
                        <SkillTree3D />
                    </LazySection>
                    <ProfileSlide />
                    <Projects setSelectedProject={setSelectedProject} />
                    <ProjectSlider selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                    <MemoryGallery />

                    {/* Web3 / Trading / Crypto Group */}
                    <div id="innovation" className="relative overflow-hidden">
                        <NetworkTrafficMap />
                        <PremiumCryptoShowcase />
                    </div>
                    <div id="hft" className="relative overflow-hidden">
                        <NetworkTrafficMap />
                        <TechFlowChart />
                    </div>
                    <TraderDashboard />
                    <LazySection minHeight="300px">
                        <Web3Vault />
                    </LazySection>
                    <HackerCV />
                    <LazySection minHeight="400px">
                        <SmartChat />
                    </LazySection>
                    <ContactSection />
                    <Footer />
                    <WelcomeRobot />
                    <WeatherWidget />
                </div>
            </div>
        </div>
    );
}
