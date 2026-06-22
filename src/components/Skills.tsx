"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiSocketdotio,
  SiTailwindcss, SiJavascript, SiPython, SiHtml5, SiCss,
  SiGit, SiGithub, SiVercel, SiPostman, SiMysql, SiNumpy, SiPandas,
  SiStripe, SiCloudinary, SiMapbox, SiOpenjdk, SiNetlify, SiJsonwebtokens, SiRender,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface Tech {
  name: string;
  Icon: IconType;
  color: string;
}

const techStack: Tech[] = [
  { name: "React",      Icon: SiReact,       color: "#61DAFB" },
  { name: "Node.js",    Icon: SiNodedotjs,   color: "#6DB33F" },
  { name: "MongoDB",    Icon: SiMongodb,     color: "#47A248" },
  { name: "JavaScript", Icon: SiJavascript,  color: "#F7DF1E" },
  { name: "Python",     Icon: SiPython,      color: "#FFD43B" },
  { name: "Express",    Icon: SiExpress,     color: "#c8c8c8" },
  { name: "Socket.io",  Icon: SiSocketdotio, color: "#c8c8c8" },
  { name: "Tailwind",   Icon: SiTailwindcss, color: "#38bdf8" },
  { name: "HTML5",      Icon: SiHtml5,       color: "#E34F26" },
  { name: "CSS3",       Icon: SiCss,         color: "#1572B6" },
  { name: "Git",        Icon: SiGit,         color: "#F05032" },
  { name: "GitHub",     Icon: SiGithub,      color: "#d0d0d0" },
  { name: "Postman",    Icon: SiPostman,     color: "#FF6C37" },
  { name: "Vercel",     Icon: SiVercel,      color: "#d0d0d0" },
  { name: "MySQL",      Icon: SiMysql,       color: "#4479A1" },
  { name: "NumPy",      Icon: SiNumpy,       color: "#4dabcf" },
  { name: "Pandas",     Icon: SiPandas,      color: "#e870b8" },
  { name: "Stripe",     Icon: SiStripe,      color: "#635BFF" },
  { name: "Cloudinary", Icon: SiCloudinary,  color: "#3448C5" },
  { name: "Mapbox",     Icon: SiMapbox,      color: "#4264FB" },
  { name: "Java",       Icon: SiOpenjdk,     color: "#F89820" },
  { name: "Render",     Icon: SiRender,      color: "#46E3B7" },
  { name: "Netlify",    Icon: SiNetlify,     color: "#00C7B7" },
  { name: "JWT",        Icon: SiJsonwebtokens, color: "#d63aff" },
];

function TechIcon({ tech, index }: { tech: Tech; index: number }) {
  const { Icon, color, name } = tech;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.82 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.04,
      }}
      whileHover={{ scale: 1.1 }}
      className="group relative flex flex-col items-center justify-center gap-2.5 p-3.5 border border-border-subtle bg-surface-dim cursor-default transition-all duration-300"
      style={
        {
          "--glow": `${color}14`,
        } as React.CSSProperties
      }
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}45`;
        (e.currentTarget as HTMLDivElement).style.backgroundColor = `${color}0d`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "";
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "";
      }}
    >
      <Icon
        className="text-[26px] sm:text-[30px] transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
        style={{ color }}
      />
      <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider text-text-muted group-hover:text-accent-white/70 transition-colors duration-300 text-center leading-tight">
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 20%"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.65], [0, 1]);
  const y = useSpring(rawY, { stiffness: 65, damping: 18 });
  const opacity = useSpring(rawOpacity, { stiffness: 65, damping: 18 });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-section-gap px-margin-page relative z-20 border-t border-border-subtle"
    >
      <motion.div
        style={{ y, opacity }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter-grid"
      >
        {/* Left column */}
        <div className="lg:col-span-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-indigo-400/70 mb-4 block"
          >
            03 — Capabilities
          </motion.span>

          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-hanken text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none"
            >
              Technical<br />Stack
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-hanken text-sm text-text-muted max-w-sm leading-relaxed"
          >
            Full-stack + AI toolkit spanning LLM integration (Gemini, Groq), backend systems, databases, and devtools — built through production work at IFOA and personal projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 space-y-3"
          >
            <div className="font-mono text-[9px] text-text-muted uppercase tracking-widest mb-3">
              Primary Stack
            </div>
            {[
              { name: "React.js",  color: "#61DAFB" },
              { name: "Node.js",   color: "#6DB33F" },
              { name: "MongoDB",   color: "#47A248" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-accent-white"
              >
                <span className="text-text-muted/40">•</span>
                {item.name}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right column — icon grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
            {techStack.map((tech, i) => (
              <TechIcon key={tech.name} tech={tech} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
