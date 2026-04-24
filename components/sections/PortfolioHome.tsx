"use client";

import { useState, useEffect } from "react";
import nextDynamic from "next/dynamic";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { projects, Project } from "@/data/projects";

const Hero = nextDynamic(() => import("@/components/sections/Hero"), { ssr: true });
const About = nextDynamic(() => import("@/components/sections/About"), { ssr: true });
const InfiniteMarquee = nextDynamic(() => import("@/components/ui/InfiniteMarquee"), { ssr: true });
const PremiumCryptoShowcase = nextDynamic(() => import("@/components/sections/PremiumCryptoShowcase"), { ssr: false });
const QuantumArbitrageVisualizer = nextDynamic(() => import("@/components/sections/QuantumArbitrageVisualizer"), { ssr: false });
const TraderDashboard = nextDynamic(() => import("@/components/sections/TraderDashboard"), { ssr: false });
const LifeJourney = nextDynamic(() => import("@/components/sections/LifeJourney"), { ssr: false });
const IsometricTimeline = nextDynamic(() => import("@/components/sections/IsometricTimeline"), { ssr: false });
const ProfileSlide = nextDynamic(() => import("@/components/sections/ProfileSlide"), { ssr: false });
const Projects = nextDynamic(() => import("@/components/sections/Projects"), { ssr: false });
const ProjectSlider = nextDynamic(() => import("@/components/sections/ProjectSlider"), { ssr: false });
const HackerCV = nextDynamic(() => import("@/components/sections/HackerCV"), { ssr: false });
const SmartChat = nextDynamic(() => import("@/components/sections/SmartChat"), { ssr: false });
const ContactSection = nextDynamic(() => import("@/components/sections/ContactSection"), { ssr: false });
const Footer = nextDynamic(() => import("@/components/sections/Footer"), { ssr: true });
const WelcomeRobot = nextDynamic(() => import("@/components/ui/WelcomeRobot"), { ssr: false });
const MeshBackground = nextDynamic(() => import("@/components/ui/MeshBackground"), { ssr: true });
const MemoryGallery = nextDynamic(() => import("@/components/sections/MemoryGallery"), { ssr: false });
const AdminDashboard = nextDynamic(() => import("@/components/admin/AdminDashboard"), { ssr: false });
const SponsorMarquee = nextDynamic(() => import("@/components/sections/SponsorMarquee"), { ssr: false });
const WeatherWidget = nextDynamic(() => import("@/components/ui/WeatherWidget"), { ssr: false });

export default function PortfolioHome() {
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

    useGsapScroll();

    return (
        <div className="flex flex-col min-h-screen relative z-10 w-full overflow-hidden bg-bg">
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
                    <QuantumArbitrageVisualizer />
                </div>
                <TraderDashboard />
                <LifeJourney />
                <IsometricTimeline />
                <ProfileSlide />
                <Projects setSelectedProject={setSelectedProject} />
                <ProjectSlider selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                <MemoryGallery />
                {isAdminVisible && <AdminDashboard />}
                <HackerCV />
                <SmartChat />
                <ContactSection />
                <Footer />
                <WelcomeRobot />
                <WeatherWidget />
            </div>
        </div>
    );
}
