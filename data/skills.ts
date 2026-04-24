/**
 * Tujuan      : Menyimpan daftar skill teknologi beserta icon Devicon
 * Caller      : components/sections/About.tsx
 * Dependensi  : None
 * Main Func   : Object skills
 */

export interface Skill {
    name: string;
    icon: string;
}

export const skills: { frontend: Skill[], backend: Skill[], database: Skill[], tools: Skill[] } = {
    frontend: [
        { name: "React", icon: "https://cdn.simpleicons.org/react/white" },
        { name: "Vite", icon: "https://cdn.simpleicons.org/vite/white" },
        { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
        { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/white" },
        { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/white" },
        { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/white" },
        { name: "CSS3", icon: "https://cdn.simpleicons.org/css3/white" },
    ],
    backend: [
        { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/white" },
        { name: "Express", icon: "https://cdn.simpleicons.org/express/white" },
        { name: "Go", icon: "https://cdn.simpleicons.org/go/white" },
        { name: "Python", icon: "https://cdn.simpleicons.org/python/white" },
        { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/white" },
    ],
    database: [
        { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/white" },
        { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/white" },
        { name: "Redis", icon: "https://cdn.simpleicons.org/redis/white" },
        { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/white" },
    ],
    tools: [
        { name: "Docker", icon: "https://cdn.simpleicons.org/docker/white" },
        { name: "Git", icon: "https://cdn.simpleicons.org/git/white" },
        { name: "Figma", icon: "https://cdn.simpleicons.org/figma/white" },
        { name: "Linux", icon: "https://cdn.simpleicons.org/linux/white" },
    ],
};
