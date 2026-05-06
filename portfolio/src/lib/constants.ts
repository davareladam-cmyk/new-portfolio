export const PERSONAL = {
  firstName: "Alex",
  lastName: "Morgan",
  initials: "AM",
  role: ["Full Stack Developer", "UI/UX Designer", "Creative Coder"],
  bio: "I craft digital experiences that blend technical precision with creative vision. With a passion for clean code and pixel-perfect design, I transform complex problems into elegant, user-centric solutions. Based in Jakarta, I work with teams worldwide to build products that matter.",
  location: "Jakarta, Indonesia",
  email: "hello@alexmorgan.dev",
  social: {
    github: "https://github.com/alexmorgan",
    linkedin: "https://linkedin.com/in/alexmorgan",
    twitter: "https://twitter.com/alexmorgan",
    dribbble: "https://dribbble.com/alexmorgan",
  },
};

export const STATS = {
  years: 8,
  projects: 120,
  clients: 45,
};

export const PROJECTS = [
  {
    id: 1,
    title: "Nebula Dashboard",
    description: "A real-time analytics dashboard with dynamic data visualization and AI-powered insights for enterprise clients.",
    stack: ["Next.js", "TypeScript", "D3.js", "Supabase"],
    category: "web",
    image: "/images/project1.webp",
    live: "https://nebula-dashboard.vercel.app",
    repo: "https://github.com/alexmorgan/nebula",
    featured: true,
  },
  {
    id: 2,
    title: "Pulse Health",
    description: "Mobile-first health tracking app with personalized recommendations and wearable device integration.",
    stack: ["React Native", "Firebase", "Node.js"],
    category: "mobile",
    image: "/images/project2.webp",
    live: "https://pulse-health.vercel.app",
    repo: "https://github.com/alexmorgan/pulse",
    featured: false,
  },
  {
    id: 3,
    title: "Artisan Market",
    description: "E-commerce platform connecting local artisans with global buyers, featuring AR product previews.",
    stack: ["Next.js", "Stripe", "Prisma", "Three.js"],
    category: "web",
    image: "/images/project3.webp",
    live: "https://artisan-market.vercel.app",
    repo: "https://github.com/alexmorgan/artisan",
    featured: false,
  },
  {
    id: 4,
    title: "Synth Studio",
    description: "Browser-based music production tool with real-time collaboration and cloud-rendered audio.",
    stack: ["WebAudio API", "WebSocket", "React", "WebAssembly"],
    category: "web",
    image: "/images/project4.webp",
    live: "https://synth-studio.vercel.app",
    repo: "https://github.com/alexmorgan/synth",
    featured: false,
  },
  {
    id: 5,
    title: "Brand Identity — Luxe",
    description: "Complete brand redesign for a luxury fashion house including logo, typography system, and digital guidelines.",
    stack: ["Figma", "After Effects", "Design System"],
    category: "design",
    image: "/images/project5.webp",
    live: "https://luxe-brand.vercel.app",
    repo: null,
    featured: false,
  },
  {
    id: 6,
    title: "FitTrack Pro",
    description: "Fitness tracking application with custom workout builder and social community features.",
    stack: ["React Native", "GraphQL", "AWS"],
    category: "mobile",
    image: "/images/project6.webp",
    live: "https://fittrack-pro.vercel.app",
    repo: "https://github.com/alexmorgan/fittrack",
    featured: false,
  },
];

export const SKILLS = {
  languages: ["TypeScript", "JavaScript", "Python", "Go", "Rust", "SQL"],
  frameworks: ["Next.js", "React", "React Native", "Node.js", "Express", "Tailwind CSS"],
  tools: ["Figma", "Docker", "Vercel", "AWS", "Git", "PostgreSQL"],
  design: ["Motion Design", "Design Systems", "Prototyping", "User Research", "Accessibility"],
};

export const EXPERIENCE = [
  {
    company: "TechCorp Global",
    role: "Senior Full Stack Developer",
    period: "2023 — Present",
    bullets: [
      "Led redesign of core platform serving 2M+ users, improving engagement by 40%",
      "Architected microservices migration reducing deployment time by 60%",
      "Mentored a team of 5 junior developers through structured code reviews",
    ],
  },
  {
    company: "Creative Studio",
    role: "Lead Developer & Designer",
    period: "2021 — 2023",
    bullets: [
      "Built 30+ client websites and web applications from concept to deployment",
      "Established design system adopted across 12 product teams",
      "Shipped interactive 3D experiences using Three.js and WebGL",
    ],
  },
  {
    company: "StartupXYZ",
    role: "Frontend Developer",
    period: "2019 — 2021",
    bullets: [
      "Developed responsive web application with React and TypeScript",
      "Implemented real-time collaboration features using WebSockets",
      "Optimized Core Web Vitals achieving 98+ Lighthouse scores",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer & Designer",
    period: "2017 — 2019",
    bullets: [
      "Delivered 20+ projects for startups and small businesses",
      "Specialized in e-commerce and portfolio websites",
      "Built long-term client relationships with 95% retention rate",
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO, TechCorp Global",
    text: "Alex is one of the most talented developers I've worked with. Their ability to translate complex requirements into elegant solutions is unmatched.",
    avatar: "/images/avatar1.webp",
  },
  {
    id: 2,
    name: "Marcus Rivera",
    role: "Product Director, Creative Studio",
    text: "Working with Alex transformed our design process. They bring a rare combination of technical depth and creative vision to every project.",
    avatar: "/images/avatar2.webp",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Founder, StartupXYZ",
    text: "Alex delivered our MVP in record time without compromising on quality. The attention to detail and user experience was exceptional.",
    avatar: "/images/avatar3.webp",
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO, InnovateCo",
    text: "The codebase Alex built for us is a pleasure to work with. Clean, well-documented, and incredibly performant. Highly recommended.",
    avatar: "/images/avatar4.webp",
  },
];
