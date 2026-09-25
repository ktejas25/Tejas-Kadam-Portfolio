export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: "Full Stack" | "Frontend" | "Mobile" | "AI / ML";
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface ProfileInfo {
  name: string;
  role: string;
  shortBio: string;
  fullBio: string[];
  education: {
    degree: string;
    description: string;
  };
  socials: {
    github: string;
    linkedin: string;
    email: string;
  };
  resumePath: string;
}

export const PROFILE_INFO: ProfileInfo = {
  name: "Tejas Kadam",
  role: "Full-Stack Web Developer specializing in React, Node.js & Cloud Solutions",
  shortBio:
    "I build modern, scalable web and mobile applications that solve real-world problems. Passionate about clean code, user experience, and cutting-edge technologies.",
  fullBio: [
    "My journey into web development began three years ago with a simple curiosity about how websites function. What started as casual experimentation with HTML and CSS soon ignited a deep passion for crafting meaningful digital experiences that address real-world problems.",
    "Since then, I've dedicated countless hours to learning, building, and refining my skills across full-stack and mobile stacks. I thrive on solving complex challenges and continuously seek to push the boundaries of what's possible with modern web technologies. Whether it's front-end design, microservices, or full-stack architecture, I'm driven by the opportunity to create purposeful, user-centered solutions that make a tangible impact.",
  ],
  education: {
    degree: "Bachelor of Business Administration in Computer Applications (BBA CA)",
    description:
      "Combining business insight with software development acumen gives me a comprehensive understanding of both user needs and market requirements.",
  },
  socials: {
    github: "https://github.com/ktejas25",
    linkedin: "https://www.linkedin.com/in/tejas-kadam-876759267/",
    email: "ktejas0425@gmail.com",
  },
  resumePath: "/Tejas-Kadam-Resume.pdf",
};

export const PROJECTS: Project[] = [
  {
    id: "delivery-proof",
    title: "DeliveryProof Manager",
    description:
      "Enterprise-grade multi-tenant proof-of-delivery, fleet tracking, and AI-driven dispute resolution platform with real-time socket updates, photo verification, and signature capture.",
    tech: ["React 18", "TypeScript", "Tailwind CSS", "FastAPI", "Express.js", "MySQL", "Socket.io", "Vite"],
    category: "Full Stack",
    image: "/deliveryproof.png",
    githubUrl: "https://github.com/ktejas25/Delivery-Proof",
    featured: true,
  },
  // {
  //   id: "soundsync",
  //   title: "SoundSync Audio Platform",
  //   description:
  //     "Modern dark-glassmorphic collaborative music streaming web application featuring real-time playlist synchronization, modular audio widgets, and responsive UI.",
  //   tech: ["React", "TypeScript", "Node.js", "Express.js", "SQL", "Tailwind CSS", "Vite"],
  //   category: "Full Stack",
  //   image: "/soundsync.png",
  //   githubUrl: "https://github.com/ktejas25/SoundSync",
  //   featured: true,
  // },
  {
    id: "harmony-chat",
    title: "Harmony Chat Application",
    description:
      "Real-time Discord-inspired web communication platform supporting custom servers, channels, direct messaging, media file sharing, and live presence updates.",
    tech: ["React", "Socket.io", "Express.js", "Supabase", "Tailwind CSS"],
    category: "Full Stack",
    image: "/harmony.png",
    githubUrl: "https://github.com/ktejas25/DiscordWeb",
    featured: true,
  },
  {
    id: "ai-tts",
    title: "AI Text-to-Speech",
    description:
      "Interactive voice synthesis application with multiple neural speech models, customizable voice settings, rate control, and instant browser audio streaming.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Shadcn UI", "Web Speech API", "Node.js"],
    category: "AI / ML",
    image: "/voiceforge.jpg",
    githubUrl: "https://github.com/ktejas25/TTS",
    featured: true,
  },
  // {
  //   id: "personal-shopper-ghost",
  //   title: "Personal Shopper Ghost",
  //   description:
  //     "AI-powered personal shopping intelligence engine pairing an NLP recommendation microservice with full-stack product discovery and user preference profiling.",
  //   tech: ["React", "TypeScript", "Python", "FastAPI", "NLP", "Node.js", "Express.js", "PostgreSQL"],
  //   category: "AI / ML",
  //   image: "/ghostshopper.jpg",
  //   githubUrl: "https://github.com/ktejas25/PersonalShopperGhost",
  //   featured: true,
  // },
  // {
  //   id: "osmique",
  //   title: "Osmique Luxury Fragrance Platform",
  //   description:
  //     "High-end digital experience and backend architecture for luxury fragrance branding, featuring automated fragrance consultation audits, authentication, and newsletter pipelines.",
  //   tech: ["Python", "FastAPI", "React", "Docker", "PostgreSQL", "Tailwind CSS"],
  //   category: "Full Stack",
  //   image: "/osmique.jpg",
  //   githubUrl: "https://github.com/ktejas25/Osmique",
  //   featured: true,
  // },
  {
    id: "music-by-tk",
    title: "MusicByTK Streaming & Stats",
    description:
      "Full-stack music streaming service and analytics platform integrating Spotify API listening history caching, track statistics, and real-time audio playback.",
    tech: ["React", "TypeScript", "Spotify API", "Node.js", "Express.js", "PostgreSQL"],
    category: "Full Stack",
    image: "/musicbytk.png",
    githubUrl: "https://github.com/ktejas25/MusicByTK",
    featured: true,
  },
  {
    id: "shopx-website",
    title: "ShopX Shopping Website",
    description:
      "Full-stack e-commerce web platform featuring product catalog management, secure checkout, user authentication, and an administrative dashboard.",
    tech: ["HTML5", "CSS3", "JavaScript", "MySQL", "Node.js", "Express.js"],
    category: "Full Stack",
    image: "/logowhite.png",
    githubUrl: "https://github.com/ktejas25/ShopX-Shopping-Website",
    featured: true,
  },
  {
    id: "shopx-mobile",
    title: "ShopX Shopping App",
    description:
      "Native mobile e-commerce Android application with real-time cloud data synchronization, category filtering, cart management, and user authentication.",
    tech: ["Android", "Java", "Firebase Firestore"],
    category: "Mobile",
    image: "/logowhite.png",
    githubUrl: "https://github.com/ktejas25/ShopX-Shopping-App",
    featured: true,
  },
  // {
  //   id: "sparkal-beauty",
  //   title: "Sparkal Beauty Platform",
  //   description:
  //     "E-commerce and salon booking web system with MySQL inventory management, client appointment scheduling, and responsive product catalog showcases.",
  //   tech: ["JavaScript", "Node.js", "Express.js", "MySQL", "HTML5", "CSS3"],
  //   category: "Full Stack",
  //   image: "/sparkal.png",
  //   githubUrl: "https://github.com/ktejas25/sparkal-beauty-server",
  //   featured: true,
  // },
  {
    id: "tic-tac-toe",
    title: "Interactive Tic-Tac-Toe",
    description:
      "Responsive web browser puzzle game implementing win-condition evaluation algorithms, interactive UI state, score tracking, and reset capabilities.",
    tech: ["JavaScript ES6", "HTML5", "CSS3"],
    category: "Frontend",
    image: "/tictactoe.png",
    githubUrl: "https://github.com/ktejas25/tic-tac-toe",
    featured: true,
  },
];

export const SKILL_CATEGORIES: Record<string, string[]> = {
  "Frontend Development": ["React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript ES6+"],
  "Backend & Database": ["Node.js", "Express.js", "Python", "FastAPI", "MySQL", "PostgreSQL", "Firebase Firestore", "REST APIs"],
  "Mobile Development": ["Android Programming", "Java", "Mobile UI Design"],
  "Development Tools": ["Git", "GitHub", "Docker", "VS Code", "npm / pnpm", "Vite", "Postman"],
  "Languages": ["English", "Hindi", "Marathi (Native)"],
};
