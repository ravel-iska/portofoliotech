/**
 * Tujuan      : Menyimpan data metadata proyek portofolio ("Gudang Portofolio")
 * Caller      : components/sections/Projects.tsx
 * Dependensi  : None
 * Main Func   : Array projects
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: "web" | "mobile" | "design" | "oss";
  github: string | null;
  live: string | null;
  featured: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Vibe Commerce",
    description: "High-performance e-commerce engine with real-time inventory and glassmorphism UI.",
    image: "/projects/project-1.webp",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma", "Stripe"],
    category: "web",
    github: "https://github.com/vibe-dev/commerce",
    live: "https://vibe-commerce.vercel.app",
    featured: true,
    year: 2024,
  },
  {
    id: "project-2",
    title: "Nebula Dashboard",
    description: "Analytical dashboard for cloud monitoring with interactive charts and dark mode.",
    image: "/projects/project-2.webp",
    tags: ["React", "D3.js", "Express", "PostgreSQL"],
    category: "web",
    github: "https://github.com/vibe-dev/nebula",
    live: "https://nebula-dashboard.io",
    featured: true,
    year: 2023,
  },
  {
    id: "project-3",
    title: "Zenith Mobile App",
    description: "Health and wellness tracker with personalized AI recommendations and sleek animations.",
    image: "/projects/project-3.webp",
    tags: ["React Native", "Firebase", "Redux"],
    category: "mobile",
    github: "https://github.com/vibe-dev/zenith",
    live: null,
    featured: false,
    year: 2024,
  },
  {
    id: "project-4",
    title: "Aura Design System",
    description: "A premium design system for building modern web applications with accessibility in mind.",
    image: "/projects/project-4.webp",
    tags: ["Figma", "Storybook", "Framer Motion"],
    category: "design",
    github: "https://github.com/vibe-dev/aura-ds",
    live: "https://aura-design.com",
    featured: true,
    year: 2023,
  },
  {
    id: "project-5",
    title: "Nexus API Gateway",
    description: "A distributed microservices architecture orchestrator written in Go for extreme performance.",
    image: "/projects/project-3.webp",
    tags: ["Go", "Docker", "Kubernetes", "Redis", "gRPC"],
    category: "oss",
    github: "https://github.com/vibe-dev/nexus-api",
    live: null,
    featured: false,
    year: 2023,
  },
  {
    id: "project-6",
    title: "FinTrack Ecosystem",
    description: "Fullstack personal finance application handling thousands of concurrent real-time banking streams.",
    image: "/projects/project-1.webp",
    tags: ["SvelteKit", "Node.js", "Prisma", "PostgreSQL"],
    category: "web",
    github: "https://github.com/vibe-dev/fintrack",
    live: "https://fintrack.app",
    featured: true,
    year: 2024,
  },
  {
    id: "project-7",
    title: "Lumina Studio",
    description: "A sophisticated headless CMS for creative agencies boasting a robust plugin architecture.",
    image: "/projects/project-2.webp",
    tags: ["Vue", "Nuxt", "Express", "MongoDB", "GraphQL"],
    category: "web",
    github: "https://github.com/vibe-dev/lumina-cms",
    live: null,
    featured: false,
    year: 2022,
  },
  {
    id: "project-8",
    title: "Orbit Weather",
    description: "Minimalist weather checking experience using meteorological data visualization.",
    image: "/projects/project-4.webp",
    tags: ["React", "Tailwind", "Vite", "OpenWeather"],
    category: "web",
    github: "https://github.com/vibe-dev/orbit-weather",
    live: "https://orbit-weather.vercel.app",
    featured: false,
    year: 2022,
  },
  {
    id: "project-9",
    title: "Quantum Cipher CLI",
    description: "Open-source encryption utility tool designed for secure CLI data transfers.",
    image: "/projects/project-3.webp",
    tags: ["Rust", "CLI", "Cryptography", "Action"],
    category: "oss",
    github: "https://github.com/vibe-dev/quantum-cli",
    live: null,
    featured: false,
    year: 2023,
  },
  {
    id: "project-10",
    title: "Nova Chat",
    description: "Real-time encrypted messaging application natively compiled for iOS and Android.",
    image: "/projects/project-1.webp",
    tags: ["Flutter", "Dart", "Firebase", "WebSockets"],
    category: "mobile",
    github: "https://github.com/vibe-dev/nova-chat",
    live: null,
    featured: true,
    year: 2024,
  },
  {
    id: "project-11",
    title: "Synthetix AI Video",
    description: "Video rendering pipeline utilizing Python background workers and a React dashboard.",
    image: "/projects/project-4.webp",
    tags: ["Python", "FastAPI", "React", "FFmpeg", "AWS S3"],
    category: "web",
    github: null,
    live: "https://synthetix-video.io",
    featured: false,
    year: 2024,
  },
  {
    id: "project-12",
    title: "Horizon UI Components",
    description: "A meticulously crafted set of accessible React components optimized for seamless integration.",
    image: "/projects/project-2.webp",
    tags: ["React", "Radix UI", "Tailwind CSS", "NPM"],
    category: "design",
    github: "https://github.com/vibe-dev/horizon-ui",
    live: "https://horizon-ui.com",
    featured: true,
    year: 2023,
  }
];
