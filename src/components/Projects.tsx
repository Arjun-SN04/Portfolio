"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ExternalLink, GitFork } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  tech: string[];
  category: "fullstack" | "frontend";
  year: string;
  liveLink: string;
  githubLink: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Horizn",
    subtitle: "AI-Integrated Travel Listing Platform",
    description:
      "A full-stack travel listing platform with AI-integrated features where users can discover, create, and review travel destinations. Features interactive maps, cloud image uploads, and secure role-based authentication.",
    points: [
      "Designed RESTful APIs with Joi schema validation and role-based authorization middleware for secure listing management.",
      "Integrated Mapbox geocoding for interactive destination maps and Cloudinary API for cloud-based image storage.",
      "Implemented Passport.js authentication with MongoDB-persisted sessions for production-grade user security.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Mapbox", "Cloudinary", "Passport.js"],
    category: "fullstack",
    year: "2024",
    liveLink: "https://horizn-og89.vercel.app/",
    githubLink: "https://github.com/Arjun-SN04/Horizn",
    image: "/images/horizn.png",
  },
  {
    title: "NexChat",
    subtitle: "Real-Time Messaging Application",
    description:
      "A real-time chat application with WebSocket-powered messaging, JWT authentication, and persistent message history. Built for fast, secure, concurrent communication.",
    points: [
      "Built event-driven WebSocket architecture with Socket.io enabling sub-50ms real-time message delivery.",
      "Implemented JWT authentication with bcrypt password hashing and MongoDB persistence for secure stateful sessions.",
      "Optimized connection handling to support multiple simultaneous users without performance degradation.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "Socket.io", "MongoDB", "JWT", "bcrypt"],
    category: "fullstack",
    year: "2024",
    liveLink: "https://nex-chat-six.vercel.app/home",
    githubLink: "https://github.com/Arjun-SN04/NexChat",
    image: "/images/nexchat.png",
  },
  {
    title: "WorldAtlas",
    subtitle: "Country Data Explorer",
    description:
      "A React SPA that fetches, filters, and visualizes structured data for 250+ countries with multi-criteria search, dynamic routing, and drill-down detail pages.",
    points: [
      "Fetched and filtered data for 250+ countries using the REST Countries API with multi-criteria search by region, population, and area.",
      "Implemented React Router dynamic routing with drill-down country detail pages handling nested API responses.",
      "Applied client-side caching strategies to minimize redundant API requests and improve performance.",
    ],
    tech: ["React.js", "REST Countries API", "React Router", "CSS3"],
    category: "frontend",
    year: "2023",
    liveLink: "https://worldatlas2004.netlify.app/",
    githubLink: "https://github.com/Arjun-SN04/WorldAtlas",
    image: "/images/worldatlas.png",
  },
];

type FilterCategory = "all" | "fullstack" | "frontend";

const filterTabs: { label: string; value: FilterCategory }[] = [
  { label: "All",        value: "all"       },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Frontend",   value: "frontend"  },
];

// ── Per-card scroll-stacking animation ──
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  // Full scroll range through viewport — drives all card transforms
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress,
    [0, 0.18, 0.82, 1],
    [60, 0, 0, -20]
  );
  const rawScale = useTransform(scrollYProgress,
    [0, 0.15, 0.82, 1],
    [0.97, 1, 1, 0.98]
  );

  const y     = useSpring(rawY,     { stiffness: 80, damping: 22 });
  const scale = useSpring(rawScale, { stiffness: 80, damping: 22 });

  const imgY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center
        ${isEven ? "" : "lg:flex-row-reverse"}
      `}
    >
      {/* ── Project Cover Image — clicks to live demo ── */}
      <motion.a
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-[50%] aspect-[16/10] overflow-hidden border border-border-subtle group relative cursor-pointer"
        data-cursor="view"
      >
        {/* Parallax layer — slightly oversized so movement doesn't show edges */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imgY }}
        >
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain grayscale transition-[filter] duration-500 group-hover:grayscale-0"
          />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55 group-hover:bg-black/20 transition-colors duration-500 z-10" />

        {/* Hover reveal: project name */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20">
          <motion.span
            initial={{ opacity: 0.15 }}
            whileHover={{ opacity: 1, scale: 1.04 }}
            transition={{ duration: 0.35 }}
            className="font-hanken text-5xl md:text-6xl font-extrabold uppercase tracking-tighter text-white select-none drop-shadow-2xl"
          >
            {project.title}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/70"
          >
            {project.category === "fullstack" ? "Full-Stack" : "Frontend"}
          </motion.span>
        </div>

        {/* Corner accents */}
        <motion.div
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/50 z-20"
        />
        <motion.div
          initial={{ opacity: 0.3 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/50 z-20"
        />
      </motion.a>

      {/* ── Project Info — staggered text reveal ── */}
      <div className="w-full lg:w-[50%] space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <motion.span
              initial={{ opacity: 0, x: isEven ? -12 : 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-mono text-xs text-text-muted tracking-widest uppercase mb-1 block"
            >
              {project.subtitle}
            </motion.span>
            <div className="overflow-hidden">
              <motion.h3
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="font-hanken text-2xl md:text-3xl font-extrabold uppercase tracking-tight"
              >
                {project.title}
              </motion.h3>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-muted">
              {project.category === "fullstack" ? "Full-Stack" : "Frontend"}
            </span>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-hanken text-sm text-text-muted leading-relaxed"
        >
          {project.description}
        </motion.p>

        {/* Bullet points — each staggers in */}
        <ul className="space-y-3">
          {project.points.map((pt, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.25 + i * 0.1 }}
              className="flex gap-3 font-hanken text-[13px] text-accent-white/80 leading-relaxed"
            >
              <span className="text-text-muted font-mono text-[10px] select-none mt-0.5 shrink-0">
                {(i + 1).toString().padStart(2, "0")}/
              </span>
              <span>{pt}</span>
            </motion.li>
          ))}
        </ul>

        {/* Tech Pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap gap-2 pt-2"
        >
          {project.tech.map((tech, ti) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.45 + ti * 0.04 }}
              whileHover={{ scale: 1.06, borderColor: "rgba(255,255,255,0.3)" }}
              className="font-mono text-[10px] uppercase tracking-wider bg-surface-container-low border border-border-subtle hover:text-accent-white px-2.5 py-1 text-text-muted transition-colors duration-200 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center gap-6 pt-4 border-t border-border-subtle/40"
        >
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent-white border border-accent-white/30 px-4 py-2 hover:bg-accent-white hover:text-black transition-all duration-300 group"
          >
            Live Demo
            <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>

          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-muted border border-border-subtle px-4 py-2 hover:text-accent-white hover:border-accent-white/40 transition-all duration-300 group"
          >
            <GitFork className="h-3.5 w-3.5 group-hover:rotate-12 transition-transform duration-300" />
            GitHub
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filtered = projects.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  return (
    <section id="work" className="pt-16 pb-section-gap px-margin-page relative z-20 border-t border-border-subtle">

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-10 relative pb-6">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-indigo-400/70 mb-3 block"
          >
            Selected Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-hanken text-4xl md:text-5xl font-bold uppercase tracking-tight"
          >
            Featured Projects
          </motion.h2>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-xs text-text-muted mt-2 md:mt-0"
        >
          ({projects.length.toString().padStart(2, "0")}) PROJECTS
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle origin-left"
        />
      </div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-2 mb-20"
      >
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={`font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
              activeFilter === tab.value
                ? "border-accent-white bg-accent-white text-background"
                : "border-border-subtle text-text-muted hover:border-border-accent hover:text-accent-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Projects — scroll-stacking cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col"
        >
          {filtered.map((project, index) => (
            <div key={project.title} className="py-20">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
