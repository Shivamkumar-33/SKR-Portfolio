export const SITE = {
  name: "Shivam",
  email: "shivamjmp2@gmail.com",
  themeKey: "portfolio-theme",
  tagline:
    "Full Stack Engineer — crafting high-performance web experiences with clean architecture and scalable design.",
};

export const navItems = [
  { name: "Home", link: "#home", href: "#home", id: "home" },
  { name: "About", link: "#about", href: "#about", id: "about" },
  { name: "Projects", link: "#projects", href: "#projects", id: "projects" },
  { name: "Connect", link: "#contact", href: "#contact", id: "contact" },
];

export const sectionIds = navItems.map((item) => item.id);

export const projects = [
  {
    id: 1,
    name: "RankPulse – AI SEO Monitoring Platform",
    shortName: "RankPulse",
    industry: "AI / SEO Platform",
    description:
      "An SEO workspace for auditing websites, tracking keyword movement, and turning crawl data into practical recommendations.",
    highlights: [
      "Run a technical SEO audit from any website URL",
      "Follow keyword movement across historical reports",
      "Surface clear fixes instead of raw crawler output",
      "Generate contextual recommendations with Gemini",
      "Keep audits and reports together in one dashboard",
    ],
    href: "https://rankpulse-seo-analytics-ncp3.vercel.app/",
    image: "/assets/projects/rankpulse.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "Express" },
      { id: 5, name: "MongoDB" },
      { id: 6, name: "Gemini AI" },
    ],
  },
  {
    id: 2,
    name: "Workforce Analytics – HRMS Platform",
    shortName: "Workforce Analytics",
    industry: "Enterprise HRMS",
    description:
      "An internal HR workspace for managing access, employee records, and every transition in the employment lifecycle.",
    highlights: [
      "Invite and onboard staff without public registration",
      "Assign 4 roles across 35+ granular permissions",
      "Move employees through 9 documented lifecycle states",
      "Review a complete audit trail for sensitive changes",
      "Keep database access type-safe with Drizzle and Supabase",
    ],
    href: "#",
    image: "/assets/projects/workforce.png",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "TypeScript" },
      { id: 3, name: "Drizzle ORM" },
      { id: 4, name: "Supabase" },
      { id: 5, name: "Tailwind CSS" },
    ],
  },
  {
    id: 3,
    name: "InterviewOS – AI Interview Platform",
    shortName: "InterviewOS",
    industry: "AI Interview Platform",
    description:
      "A focused interview-preparation workspace that adapts questions to a role, explains the reasoning, and keeps progress organised.",
    highlights: [
      "Create question sets for a target role and experience level",
      "Expand concise answers into deeper explanations",
      "Save useful questions with notes and bookmarks",
      "Return fast model responses through Groq and LLaMA",
      "Track preparation from a single progress dashboard",
    ],
    href: "https://interviewprep-brown.vercel.app/",
    image: "/assets/projects/interviewos.png",
    frameworks: [
      { id: 1, name: "MERN Stack" },
      { id: 2, name: "Groq AI" },
      { id: 3, name: "LLaMA" },
    ],
  },
  {
    id: 4,
    name: "Chat-Now - Real-Time Chat System",
    shortName: "Chat-Now",
    industry: "Real-time Communication",
    description:
      "A straightforward messaging app with persistent conversations, protected accounts, and real-time delivery.",
    highlights: [
      "Send and receive messages without refreshing the page",
      "Protect account sessions with JWT authentication",
      "Restore conversation history from MongoDB",
      "Handle concurrent connections through Socket.io",
    ],
    href: "https://chat-app-gxx1.vercel.app/login",
    image: "/assets/projects/chatapp.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Socket.io" },
      { id: 5, name: "JWT" },
    ],
  },
];

export const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/shivam-kumar-3827b1352",
    icon: "ph:linkedin-logo-duotone",
  },
  {
    name: "GitHub",
    href: "https://github.com/Shivamkumar-33",
    icon: "ph:github-logo-duotone",
  },
  {
    name: "Twitter",
    href: "https://x.com/ShivamKumarRud1",
    icon: "ph:x-logo-duotone",
  },
];

export const fullStackLogos = [
  { label: "HTML5", icon: "html", color: "#E34F26", animationDelay: -48, animationDuration: 48, row: 1 },
  { label: "CSS3", icon: "css", color: "#1572B6", animationDelay: -36, animationDuration: 48, row: 1 },
  { label: "JavaScript", icon: "js", color: "#F7DF1E", animationDelay: -24, animationDuration: 48, row: 1 },
  { label: "TypeScript", icon: "ts", color: "#3178C6", animationDelay: -12, animationDuration: 48, row: 1 },
  { label: "React", icon: "react", color: "#61DAFB", animationDelay: 0, animationDuration: 48, row: 1 },

  { label: "Next.js", icon: "next", color: "#FFFFFF", animationDelay: -54, animationDuration: 54, row: 2 },
  { label: "Tailwind", icon: "tailwind", color: "#06B6D4", animationDelay: -43, animationDuration: 54, row: 2 },
  { label: "Redux", icon: "redux", color: "#764ABC", animationDelay: -32, animationDuration: 54, row: 2 },
  { label: "Vite", icon: "vite", color: "#646CFF", animationDelay: -21, animationDuration: 54, row: 2 },
  { label: "GraphQL", icon: "graphql", color: "#E10098", animationDelay: -10, animationDuration: 54, row: 2 },

  { label: "Node.js", icon: "node", color: "#339933", animationDelay: -58, animationDuration: 58, row: 3 },
  { label: "Express", icon: "express", color: "#FFFFFF", animationDelay: -46, animationDuration: 58, row: 3 },
  { label: "NestJS", icon: "nest", color: "#E0234E", animationDelay: -34, animationDuration: 58, row: 3 },
  { label: "PostgreSQL", icon: "postgres", color: "#4169E1", animationDelay: -22, animationDuration: 58, row: 3 },
  { label: "MongoDB", icon: "mongo", color: "#47A248", animationDelay: -10, animationDuration: 58, row: 3 },

  { label: "Redis", icon: "redis", color: "#DC382D", animationDelay: -52, animationDuration: 52, row: 4 },
  { label: "Docker", icon: "docker", color: "#2496ED", animationDelay: -41, animationDuration: 52, row: 4 },
  { label: "AWS", icon: "aws", color: "#FF9900", animationDelay: -30, animationDuration: 52, row: 4 },
  { label: "Git", icon: "git", color: "#F05032", animationDelay: -19, animationDuration: 52, row: 4 },
  { label: "GitHub", icon: "github", color: "#FFFFFF", animationDelay: -8, animationDuration: 52, row: 4 },
];
