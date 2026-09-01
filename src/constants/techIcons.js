/**
 * Tech icon mapping using lucide-react for tree-shakeable, lightweight icons.
 * For tech logos where no exact match exists, we use a semantically close icon.
 */
import {
  Atom,         // React
  SquareCode,   // TypeScript
  Server,       // Node.js
  Route,        // Express
  Database,     // MongoDB, Supabase, PostgreSQL
  Layers,       // MERN Stack, Drizzle ORM
  Paintbrush,   // Tailwind CSS
  Sparkles,     // Gemini AI
  Plug,         // Socket.io, API
  Key,          // JWT
  IterationCcw, // Next.js
  Brain,        // Groq AI
  Bot,          // LLaMA
} from "lucide-react";

export const TECH_ICON_MAP = {
  React: Atom,
  TypeScript: SquareCode,
  "Node.js": Server,
  Express: Route,
  Supabase: Database,
  "MERN Stack": Layers,
  "Tailwind CSS": Paintbrush,
  "Gemini API": Plug,
  "Gemini AI": Sparkles,
  MongoDB: Database,
  "Socket.io": Plug,
  JWT: Key,
  "Next.js": IterationCcw,
  "Drizzle ORM": Layers,
  "Groq AI": Brain,
  LLaMA: Bot,
  PostgreSQL: Database,
  Redis: Database,
  GraphQL: Plug,
  Docker: Server,
  AWS: Server,
  GitHub: SquareCode,
};

export const getTechIcon = (name) => TECH_ICON_MAP[name] || Layers;
