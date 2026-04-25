"use client";

import { useState, useEffect } from "react";
import nextDynamic from "next/dynamic";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { projects, Project } from "@/data/projects";

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
const SkillTree3D = null; // DELETED
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
const EarthLanding = nextDynamic(() => import("@/components/sections/EarthLanding"), { ssr: false });
import LazySection from "@/components/ui/LazySection";

export default function PortfolioHome() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isAdminVisible, setIsAdminVisible] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        const handleHashChange = () => {
            setIsAdminVisible(window.location.hash === "#admin");
        };
        window.addEventListener("hashchange", handleHashChange);
        handleHashChange();
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    useGsapScroll();

    return (
        <div className={`flex flex-col relative z-10 w-full bg-bg ${!isUnlocked ? "h-screen overflow-hidden" : "min-h-screen overflow-hidden"}`}>
            {!isUnlocked && <EarthLanding onUnlock={() => setIsUnlocked(true)} />}

            <MeshBackground />
            <Hero />
            <SponsorMarquee />
            <InfiniteMarquee />

            <div className="w-full relative z-10 bg-gradient-to-b from-transparent via-black/20 to-black/95">
                <About />
                <div id="innovation">
                    <PremiumCryptoShowcase />
                </div>
                <div id="hft">
                    <TechFlowChart />
                </div>
                <TraderDashboard />
                <LazySection minHeight="300px">
                    <LifeJourney />
                </LazySection>
                <IsometricTimeline />
                <ProfileSlide />
                <Projects setSelectedProject={setSelectedProject} />
                <ProjectSlider selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                <MemoryGallery />
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
    );
}
