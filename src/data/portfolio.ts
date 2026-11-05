/**
 * Single source of truth for all portfolio content.
 * Components only render this data — edit here to update the site.
 * Keep the AI assistant's facts (src/lib/portfolio-chat.functions.ts) in sync.
 */

export const profile = {
  name: "Muhammed Ishaq",
  handle: "M.ISHAQ",
  location: "Keffi, Nigeria",
  emails: ["techiemuaishaq@gmail.com", "muhammedishaqjamb20@gmail.com"],
  phone: "+234 806 863 8021",
  photo: "/site-assets/401fab8c1fa71576.jpg",
  summary:
    "AI/ML and full-stack engineer from Nigeria. Computer Science graduate of FUDMA — Second Class Upper, CGPA 4.39. I build secure, production-ready systems, not vulnerable prototypes. Builder of TechTrust AI.",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/muaishaq" },
    { label: "GitHub", href: "https://github.com/muaishaq" },
    { label: "X / Twitter", href: "https://twitter.com/muaishaq" },
    { label: "Instagram", href: "https://instagram.com/techiemuaishaq" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UCNFd2UENwxUTvWjsc9FoPPA" },
  ],
} as const;

export const typewriterPhrases = [
  "Secure & Scalable Full-Stack Web Apps",
  "Hardened, Production-Ready Machine Learning",
  "Autonomous AI Agents",
  "Systems Built Right — Not Just Vibe-Coded",
];

export const tickerItems = [
  "NEW · Mercor “Introduction to Agents” certificate earned — Oct 2026",
  "TechTrust AI reached the Huawei ICT Innovation National Finals",
  "B.Sc. Computer Science, FUDMA — 2:1, CGPA 4.39",
  "Led 2,000+ students as President, Faculty of Computing & NACOS FUDMA",
  "Organised the first state-wide tech hackathon in Katsina — ₦4.5M+ budget",
  "Open to internships, freelance & AI training work",
];

export const stats = [
  { value: "3+", label: "Years building" },
  { value: "30+", label: "Projects shipped" },
  { value: "2×", label: "Student president" },
  { value: "4.39", label: "CGPA · CS graduate" },
];

export const stackPillars = [
  { title: "AI / ML Engineering", items: ["Python", "MindSpore", "MLP Neural Nets", "TensorFlow/Keras", "NumPy / Pandas", "Model Evaluation"] },
  { title: "Full-Stack Engineering", items: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "MySQL", "Tailwind", "API Design"] },
  { title: "Defensive Engineering", items: ["OWASP Top 10", "Auth & RBAC", "Input validation", "Rate limiting", "Secrets hygiene", "Secure API design"] },
  { title: "AI-Assisted Delivery", items: ["Prompt Engineering", "LLM APIs", "AI Agents", "Rapid Prototyping"] },
];

export type ProjectCategory = "ai" | "fullstack" | "campus" | "foundations";

export const categoryLabels: Record<ProjectCategory | "all", string> = {
  all: "All",
  ai: "AI & ML",
  fullstack: "Full-Stack",
  campus: "Campus & Community",
  foundations: "Foundations",
};

export interface Project {
  id: string;
  title: string;
  year: string;
  category: ProjectCategory;
  summary: string;
  stack: string[];
  live?: string;
  /** Live-capture screenshot served from /site-assets for the animated card preview. */
  preview?: string;
  repo?: string;
  flagship?: boolean;
  /** Short engineering notes shown in the detail view. */
  highlights?: string[];
}

export const projects: Project[] = [
  {
    id: "techtrust",
    title: "TechTrust — AI Developer Credential Verification",
    year: "2026",
    category: "ai",
    flagship: true,
    summary:
      "AI platform that verifies developer credentials and matches them with recruiters. Built as Team Leader for the Huawei ICT Innovation Competition (National Finals, Jan 29, 2026) and final-year project at FUDMA.",
    stack: ["MindSpore MLP", "GitHub API", "Node.js", "Express", "MongoDB"],
    repo: "https://github.com/fudmatechteam1/techtrust-frontend",
    highlights: [
      "MindSpore MLP neural network scores credential authenticity",
      "GitHub API integration for evidence-based verification",
      "Node.js + Express backend with MongoDB persistence",
    ],
  },
  {
    id: "nova",
    title: "Nova — AI Chatbot Builder",
    year: "2026",
    category: "ai",
    flagship: true,
    summary: "Customer-support chatbot builder. Configure persona, tone and knowledge in one editor with a live streaming test chat.",
    stack: ["React", "LLM APIs", "TypeScript"], preview: "/site-assets/preview-nova.jpg", live: "https://blossom-engine-pro.lovable.app",
    repo: "https://github.com/Muaishaq/blossom-engine-pro",
    highlights: ["Persona & tone configuration", "Streaming responses", "Knowledge-grounded answers"],
  },
  {
    id: "sentinel",
    title: "Sentinel — AI Content Moderation",
    year: "2026",
    category: "ai",
    flagship: true,
    summary: "Multimodal moderation console: transformer text classifiers and CNN image analysis flag hate speech, harassment and violence in real time.",
    stack: ["React", "Transformers", "CNN"], preview: "/site-assets/preview-sentinel.jpg", live: "https://sparkle-mind-render.lovable.app",
    repo: "https://github.com/Muaishaq/sparkle-mind-render",
    highlights: ["Text + image classification", "Real-time flagging", "Trust & safety focus"],
  },
  {
    id: "nacos-hub",
    title: "NACOS FUDMA Chapter Hub",
    year: "2025",
    category: "campus",
    flagship: true,
    summary: "Official hub for the NACOS FUDMA Chapter, built during my tenure as President — executives, events, congresses and identity.",
    stack: ["React", "TypeScript", "Tailwind"], preview: "/site-assets/preview-nacos-hub.jpg", live: "https://nacosfudmachpater.netlify.app",
    repo: "https://github.com/Muaishaq/nacos-fudma-hub-main",
  },
  { id: "churnguard", title: "ChurnGuard AI", year: "2025", category: "ai", summary: "ANN-powered churn prediction with explainable AI — feature attributions, batch scoring and an analyst dashboard.", stack: ["TensorFlow/Keras", "React", "Explainable AI"], preview: "/site-assets/preview-churnguard.jpg", live: "https://churn-mua.lovable.app", repo: "https://github.com/Muaishaq/churn-mua" },
  { id: "aquality", title: "Aquality.ai — ML Water Quality", year: "2026", category: "ai", summary: "Predicts water potability from physicochemical inputs, with a curated dataset and explainable results.", stack: ["Python", "ML", "React"], preview: "/site-assets/preview-aquality.jpg", live: "https://pure-spark-creation.lovable.app", repo: "https://github.com/Muaishaq/pure-spark-creation" },
  { id: "ai-impact", title: "AI Impact — ML & NLP Demo", year: "2026", category: "ai", summary: "Interactive demo exploring ML and NLP concepts for FUDMA 2026 with live visualisations.", stack: ["React", "NLP", "ML"], preview: "/site-assets/preview-ai-impact.jpg", live: "https://pure-charm-engine.lovable.app", repo: "https://github.com/Muaishaq/pure-charm-engine" },
  { id: "ramadan", title: "NACOS Ramadan Message App", year: "2025", category: "campus", summary: "Daily Ramadan reminders and reflections for the Muslim community of FUDMA.", stack: ["React", "TypeScript", "Tailwind"], preview: "/site-assets/preview-ramadan.jpg", live: "https://ramadanapp-nacosfudma.netlify.app/", repo: "https://github.com/Muaishaq/Ramadan-App-Nacos" },
  { id: "hackathon", title: "FUDMA Tech Hackathon 2025", year: "2025", category: "campus", summary: "Site for the first state-wide Tech Innovation Hackathon — 5 tracks, 4 stages.", stack: ["React", "TypeScript", "Tailwind"], preview: "/site-assets/preview-hackathon.jpg", live: "https://nacosfdm-hackathon.lovable.app", repo: "https://github.com/Muaishaq/fudma-forge" },
  { id: "conference", title: "FUDMA Conference", year: "2026", category: "campus", summary: "Conference platform for the Faculty of Computing — programme, speakers, registration.", stack: ["React", "TypeScript", "Tailwind"], preview: "/site-assets/preview-conference.jpg", live: "https://reliable-chimera-78ed85.netlify.app", repo: "https://github.com/Muaishaq/FUDMA-CONFERENECE" },
  { id: "sports", title: "NACOS Sports Portal", year: "2026", category: "campus", summary: "Sports management portal — fixtures, teams and results.", stack: ["React", "TypeScript", "Tailwind"], preview: "/site-assets/preview-sports.jpg", live: "https://nacossportsportal.lovable.app" },
  { id: "survey", title: "The Database Dividend — Field Survey", year: "2026", category: "fullstack", summary: "9-question instrument measuring how database infrastructure shapes organisational performance.", stack: ["React", "TypeScript", "Forms"], preview: "/site-assets/preview-survey.jpg", live: "https://indy-shine.lovable.app", repo: "https://github.com/Muaishaq/indy-shine" },
  { id: "kusada", title: "Kusada Local Government Site", year: "2026", category: "fullstack", summary: "Official-style web presence for Kusada LGA — departments, news and citizen information.", stack: ["React", "TypeScript", "Tailwind"], repo: "https://github.com/Muaishaq/kusadalocalgovernment" },
  { id: "cmp331", title: "CMP 331 Group 5A Web Project", year: "2024", category: "foundations", summary: "Led the team on a 4-page static site — Home, About, Registration, Contact.", stack: ["HTML", "CSS"], preview: "/site-assets/preview-cmp331.jpg", live: "https://muaishaq.github.io/Group-5A-CMP331-Project/", repo: "https://github.com/Muaishaq/Group-5A-CMP331-Project" },
  { id: "portal", title: "FUDMA Student Portal Clone", year: "2025", category: "foundations", summary: "UX redesign and improved responsiveness for the student portal.", stack: ["HTML", "CSS", "JavaScript"], preview: "/site-assets/preview-portal.jpg", live: "https://muaishaq.github.io/Project--Fudma-portal-/" },
  { id: "forex", title: "Muaishaq Forex Academy", year: "2024", category: "foundations", summary: "Forex education platform — lessons, structure and trader resources.", stack: ["HTML", "CSS", "JavaScript"], preview: "/site-assets/preview-forex.jpg", live: "https://muaishaq.github.io/MFA/" },
  { id: "quiz", title: "Football Quiz App", year: "2025", category: "foundations", summary: "Timed quiz rounds with a persistent leaderboard.", stack: ["JavaScript"], preview: "/site-assets/preview-quiz.jpg", live: "https://muaishaq.github.io/QuizApp/" },
  { id: "todo", title: "To-Do List App", year: "2025", category: "foundations", summary: "Local-storage to-do with priority tags.", stack: ["JavaScript", "LocalStorage"], preview: "/site-assets/preview-todo.jpg", live: "https://muaishaq.github.io/TodoApp/" },
];

export interface Credential {
  title: string;
  issuer: string;
  date: string;
  href?: string;
}

export const credentials: Credential[] = [
  { title: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn", date: "Jun 2025", href: "https://www.linkedin.com/learning/certificates/54fcc425bdaf2158f66e3ffa70e3a304a3d2b4a15277bff88fefe0935208b612" },
  { title: "Generative AI: Evolution of Thoughtful Online Search", issuer: "LinkedIn", date: "Jun 2025", href: "https://www.linkedin.com/learning/certificates/e6d94b994300eb26d64ecbeacbd381a465d0d298b17a3960a7d39e67d7dd455b" },
  { title: "Introduction to Artificial Intelligence", issuer: "LinkedIn", date: "Jun 2025", href: "https://www.linkedin.com/learning/certificates/e0a1cd7159f91f304dd374dc8633d17ebe5e7cee254d615afcdf00940d945273" },
  { title: "Ethics in the Age of Generative AI", issuer: "LinkedIn", date: "Jun 2025", href: "https://www.linkedin.com/learning/certificates/843b0b0e22244a0da11ce85618d1a5bc4e8cc5a0e8f9b08b48d3160bd1d4698c" },
  { title: "Learning Microsoft 365 Copilot for Work", issuer: "LinkedIn", date: "Jun 2025", href: "https://www.linkedin.com/learning/certificates/657adfd9580c8cd8bc8794704005cf682a070d2fb7d2745b729eb1d18a04e833" },
  { title: "Streamlining Your Work with Microsoft Copilot", issuer: "LinkedIn", date: "Jun 2025", href: "https://www.linkedin.com/learning/certificates/fe7d0b5627bae77cef7b16778023286c5a1058b3f4893b944f8b54222d2c1f5f" },
  { title: "What Is Generative AI?", issuer: "LinkedIn", date: "Jun 2025", href: "https://www.linkedin.com/learning/certificates/5113905c5d42b856c107f4749fa6f570a7ed324c5ac89733f4031ca52e725d58" },
  { title: "HTML Certification", issuer: "Online Assessment Platform", date: "2024–2025" },
];

export const mercorCredential = {
  title: "Introduction to Agents — Certificate of Recognition",
  issuer: "Mercor",
  id: "MRC-2026-G32FZKWF",
  date: "Oct 2026",
  href: "https://work.mercor.com/learn/verify/MRC-2026-G32FZKWF",
};

export const leadership = [
  { role: "President, Faculty of Computing", org: "FUDMA", period: "2025–2026", points: ["Represented 2,000+ students in faculty governance", "Previously Sports Director"] },
  { role: "President, NACOS FUDMA Chapter", org: "NACOS", period: "2025–2026", points: ["First state-wide hackathon in Katsina — ₦4.5M+ budget", "Launched Tech Guild & Tech Lite clubs", "Congress 2026 — “Beyond Theory”"] },
  { role: "Team Leader — Huawei ICT Innovation", org: "Huawei ICT Academy", period: "2026", points: ["Led FUDMA to the National Finals with TechTrust"] },
  { role: "Brand Ambassador", org: "Si14", period: "2026", points: ["Secured 40% sponsorship of the NACOS jersey"] },
];

export const timeline = [
  { period: "2022 – 2026", title: "B.Sc. Computer Science", org: "Federal University Dutsin-Ma (FUDMA)" },
  { period: "2023 – Present", title: "Freelance Web Developer", org: "Self-employed" },
  { period: "2025", title: "SIWES Industrial Attachment", org: "Built 3 mini-projects" },
  { period: "2021 – 2026", title: "Football Team Captain", org: "FUDMA Departmental Team" },
];

export const securityComparison = [
  { vibe: "Secrets pasted into frontend code", hardened: "Secrets kept server-side only" },
  { vibe: "Trusts whatever the user sends", hardened: "Validates every input at the boundary" },
  { vibe: "Anyone can read any record", hardened: "Role-based access on every query" },
  { vibe: "Unlimited requests", hardened: "Rate limiting & abuse protection" },
];
