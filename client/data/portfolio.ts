export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: "Full Stack" | "Frontend" | "Mobile";
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
  role: "Full-Stack Web Developer specializing in React & Node.js",
  shortBio:
    "I build modern, scalable web applications that solve real-world problems. Passionate about clean code, user experience, and cutting-edge technologies.",
  fullBio: [
    "My journey into web development began three years ago with a simple curiosity about how websites function. What started as casual experimentation with HTML and CSS soon ignited a deep passion for crafting meaningful digital experiences that address real-world problems.",
    "Since then, I've dedicated countless hours to learning, building, and refining my skills. I thrive on solving complex challenges and continuously seek to push the boundaries of what's possible with modern web technologies. Whether it's front-end design or full-stack development, I'm driven by the opportunity to create purposeful, user-centered solutions that make a tangible impact.",
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
    id: "harmony-chat",
    title: "Harmony Chat Application",
    description:
      "Real-time Discord-inspired web communication platform supporting custom servers, channels, direct messaging, file sharing, and live presence updates.",
    tech: ["React", "Socket.io", "Express.js", "Supabase", "Tailwind CSS"],
    category: "Full Stack",
    image: "/harmony.png",
    githubUrl: "https://github.com/ktejas25/DiscordWeb",
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
    featured: false,
  },
  {
    id: "ai-tts",
    title: "AI Text-to-Speech",
    description:
      "Interactive voice synthesis application with multiple speech models, customizable voice settings, rate control, and instant browser audio streaming.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Shadcn UI", "Web Speech API", "Node.js", "Express.js"],
    category: "Frontend",
    image: "/voiceforge.jpg",
    githubUrl: "https://github.com/ktejas25/TTS",
    featured: true,
  },
];

export const SKILL_CATEGORIES: Record<string, string[]> = {
  "Frontend Development": ["React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript ES6+"],
  "Backend & Database": ["Node.js", "Express.js", "Python", "MySQL", "Firebase Firestore", "REST APIs"],
  "Mobile Development": ["Android Programming", "Mobile UI Design"],
  "Development Tools": ["Git", "GitHub", "VS Code", "npm / pnpm", "Vite", "Webpack", "Postman"],
  "Languages": ["English", "Hindi", "Marathi (Native)"],
};
