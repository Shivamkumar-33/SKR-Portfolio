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
