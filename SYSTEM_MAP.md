# SYSTEM_MAP.md

# Project Summary
- **Owner**: Professional Portfolio
- **Tech Stack**:
  * Framework: Next.js 14+ (App Router)
  * Styling: Tailwind CSS + Glassmorphism
  * Animation: Framer Motion + Anime.js (Floating BG)
  * Canvas: Native HTML5 Canvas API (Scroll Image Sequence)
  * Fonts: Space Grotesk (Display) + Inter (Body)
  * Deployment: Vercel Ready
- **Architecture**: Component-based SPA with Scroll-Driven Sequence

# Core Visual Flow (Animation & Scroll Map)

  **Scroll Sequence Engine**
  Scroll Event -> useScrollProgress[hook]
               -> frameIndex calculation
               -> CanvasSequence.draw[render]
               -> Image Preload Fallback

  **Parallax Text**
  Scroll Event -> useParallax[hook]
               -> transform: translateY[framer]
               -> opacity fade[framer]

  **Background Depth**
  Anime.js -> FloatingBackground[component]
           -> translate Loop[animation]
           -> blur-xl[css]

  **Project Interaction**
  Hover Event -> Card scale + y-offset[framer]
               -> Overlay reveal[framer]
               -> Icon stagger[framer]
  Filter Event -> AnimatePresence[framer]
               -> Layout transitions[framer]

# Clean Tree
/
├── app/
│   ├── page.tsx         <- Entrypoint (orchestration)
│   ├── layout.tsx       <- Global layout & providers
│   └── globals.css      <- Design tokens & glassmorphism
├── components/
│   ├── canvas/          <- Scroll image sequence engine
│   ├── sections/        <- Hero, About, Projects, Contact
│   ├── layout/          <- Navbar, Footer
│   └── ui/              <- FloatingBackground (Anime.js)
├── hooks/               <- useScrollProgress, useParallax
├── data/                <- projects.ts, skills.ts
├── lib/                 <- utils.ts (cn helper)
└── public/
    └── frames/          <- Sequence storage (frame_001.webp...)

# Module Map
- `app/page.tsx`: Sets up the section stack (Hero -> About -> Projects -> Contact).
- `components/canvas/CanvasSequence.tsx`: High-performance frame rendering with preloading.
- `hooks/useScrollProgress.ts`: Normalizes scroll position to 0-1 range for a specific container.
- `components/sections/Hero.tsx`: Sticky container hosting the Canvas and Parallax text.
- `components/sections/Projects.tsx`: Interactive grid with category filtering logic.
- `components/ui/FloatingBackground.tsx`: Anime.js powered ambient particles.
- `data/projects.ts`: Central source of truth for work items.

# Visual & Config
- **Tailwind**: `tailwind.config.ts` includes custom color tokens (`bg`, `accent`, `surface`).
- **Typography**: Font variables mapping Space Grotesk and Inter to Tailwind font-families.
- **Glassmorphism**: `.glass` and `.glass-card` utilities in `globals.css`.

# Animation & Effect Registry
- Scroll Canvas Sequence -> `CanvasSequence.tsx`
- Parallax Text Overlay  -> `useParallax.ts` / `Hero.tsx`
- Floating Particles    -> `FloatingBackground.tsx` (Anime.js)
- Navbar Hide on Scroll -> `Navbar.tsx`
- Project Grid Filter   -> `Projects.tsx` (AnimatePresence)
- Section Fade-In       -> `whileInView` (Framer Motion)

# Risks / Blind Spots
- **Frames Missing**: `CanvasSequence` includes a placeholder fallback if frames are not found in `/public/frames`.
- **Canvas Memory**: Component includes cleanup for image array and render triggers.
- **Next.js 15 Compatibility**: Using `use client` where necessary to support server/client boundary.
- **Performance**: Scroll listeners are `passive: true` to minimize main thread blocking.
