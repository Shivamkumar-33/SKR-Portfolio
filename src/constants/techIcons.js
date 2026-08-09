import { RiReactjsLine } from "react-icons/ri";
import {
  SiExpress,
  SiMongodb,
  SiNodedotjs,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiDrizzle,
} from "react-icons/si";
import { TbApi, TbBrain, TbRobot, TbSparkles } from "react-icons/tb";
import { FaLayerGroup, FaKey } from "react-icons/fa6";

export const TECH_ICON_MAP = {
  React: RiReactjsLine,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Supabase: SiSupabase,
  "MERN Stack": FaLayerGroup,
  "Tailwind CSS": SiTailwindcss,
  "Gemini API": TbApi,
  "Gemini AI": TbSparkles,
  MongoDB: SiMongodb,
  "Socket.io": SiSocketdotio,
  JWT: FaKey,
  "Next.js": SiNextdotjs,
  "Drizzle ORM": SiDrizzle,
  "Groq AI": TbBrain,
  LLaMA: TbRobot,
};

export const getTechIcon = (name) => TECH_ICON_MAP[name] || FaLayerGroup;

