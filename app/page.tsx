"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useGsapScroll } from "@/hooks/useGsapScroll";
import { projects, Project } from "@/data/projects";

const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: true });
const About = dynamic(() => import("@/components/sections/About"), { ssr: true });
const InfiniteMarquee = dynamic(() => import("@/components/ui/InfiniteMarquee"), { ssr: true });
const PremiumCryptoShowcase = dynamic(() => import("@/components/sections/PremiumCryptoShowcase"), { ssr: false });
const QuantumArbitrageVisualizer = dynamic(() => import("@/components/sections/QuantumArbitrageVisualizer"), { ssr: false });
const TraderDashboard = dynamic(() => import("@/components/sections/TraderDashboard"), { ssr: false });
const LifeJourney = dynamic(() => import("@/components/sections/LifeJourney"), { ssr: false });
const IsometricTimeline = dynamic(() => import("@/components/sections/IsometricTimeline"), { ssr: false });
const ProfileSlide = dynamic(() => import("@/components/sections/ProfileSlide"), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false });
const ProjectSlider = dynamic(() => import("@/components/sections/ProjectSlider"), { ssr: false });
const HackerCV = dynamic(() => import("@/components/sections/HackerCV"), { ssr: false });
const SmartChat = dynamic(() => import("@/components/sections/SmartChat"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: true });
const WelcomeRobot = dynamic(() => import("@/components/ui/WelcomeRobot"), { ssr: false });
const MeshBackground = dynamic(() => import("@/components/ui/MeshBackground"), { ssr: true });
const MemoryGallery = dynamic(() => import("@/components/sections/MemoryGallery"), { ssr: false });
const AdminDashboard = dynamic(() => import("@/components/admin/AdminDashboard"), { ssr: false });
const SponsorMarquee = dynamic(() => import("@/components/sections/SponsorMarquee"), { ssr: false });
const WeatherWidget = dynamic(() => import("@/components/ui/WeatherWidget"), { ssr: false });


export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminVisible, setIsAdminVisible] = useState(false);

  // Toggle admin via hash in useEffect
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminVisible(window.location.hash === "#admin");
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Initialize cinematic scroll animations
  useGsapScroll();

  return (
    <div className="flex flex-col min-h-screen relative z-10 w-full overflow-hidden bg-bg">
      <MeshBackground />
      <Hero />
      <SponsorMarquee />
      <InfiniteMarquee />

      <div className="w-full relative z-10 bg-gradient-to-b from-transparent via-black/20 to-black/95 backdrop-blur-[2px]">
        <About />

        {/* Premium Portfolio Highlight */}
        <div id="innovation">
          <PremiumCryptoShowcase />
        </div>

        {/* The New Web3 HFT Innovation Showcase */}
        <div id="hft">
          <QuantumArbitrageVisualizer />
        </div>

        {/* Core Trader Skills & Web3 Presence */}
        < TraderDashboard />

        {/* Career & Timeline */}
        <LifeJourney />
        <IsometricTimeline />

        {/* Persona & Projects */}
        <ProfileSlide />
        <Projects setSelectedProject={setSelectedProject} />
        <ProjectSlider selectedProject={selectedProject} setSelectedProject={setSelectedProject} />

        {/* macOS Memories Gallery */}
        <MemoryGallery />

        {/* Administrative Layer (Vibe Console) */}
        {isAdminVisible && <AdminDashboard />}

        {/* Interactive CV & Contact Flow */}
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
