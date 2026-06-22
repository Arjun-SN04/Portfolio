"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

interface ExpJob {
  title: string;
  company: string;
  companyFull: string;
  location: string;
  period: string;
  current: boolean;
  badge: React.ReactNode;
  points: { num: string; text: React.ReactNode }[];
  tools: string[];
}

const jobs: ExpJob[] = [
  {
    title: "Full Stack AI Integration Developer",
    company: "IFOA",
    companyFull: "International Flight Operational Academy",
    location: "New Delhi, IN",
    period: "March 2026 – Present",
    current: true,
    badge: (
      <>4 Production Systems &middot; <strong>13+ Defects Resolved</strong> &middot; Active Role</>
    ),
    points: [
      {
        num: "01/",
        text: (
          <>
            Architected a provider-agnostic{" "}
            <strong className="text-accent-white/80">LLM abstraction layer</strong> (Gemini
            primary, Groq/OpenAI-compatible fallback) with automatic failover and token-usage
            logging; built an Edge-TTS audio pipeline with SHA-256 token signing, Mermaid.js
            concept-flow rendering, and Mongoose-cached AI responses powering rule explanations,
            scenario decision trees, and auto-graded quizzes.
          </>
        ),
      },
      {
        num: "02/",
        text: (
          <>
            Engineered a{" "}
            <strong className="text-accent-white/80">JWT/bcrypt-secured MERN certificate service</strong>{" "}
            generating EASA Part ORO.GEN.110(c) and ICAO Doc 10106/9868-compliant PDFs via
            pdf-lib and PDFKit, with Mongoose schemas modeling 12 selectable recurrent-training
            modules and full participant CRUD.
          </>
        ),
      },
      {
        num: "03/",
        text: (
          <>
            Built a{" "}
            <strong className="text-accent-white/80">Stripe-integrated subscription billing service</strong>{" "}
            with the Gemini SDK, MJML-templated transactional email pipelines, node-cron renewal
            jobs, ExcelJS reporting exports, and helmet/express-rate-limit hardening; resolved
            13+ defects across payment, renewal, and email subsystems.
          </>
        ),
      },
      {
        num: "04/",
        text: "Contributed to a MERN operations platform with Socket.io real-time event broadcasting, Multer file-upload handling, express-validator request validation, and role-gated HR/sprint/leave-management modules.",
      },
    ],
    tools: [
      "Gemini SDK", "Groq API", "LLM Integration", "Node.js", "Express.js",
      "MongoDB", "Stripe API", "pdf-lib", "Socket.io", "JWT/bcrypt", "MJML", "node-cron",
    ],
  },
  {
    title: "Web Development Intern",
    company: "Brainpulse",
    companyFull: "",
    location: "Noida, IN",
    period: "June 2025 – August 2025",
    current: false,
    badge: (
      <>Delivered <strong>20% improvement</strong> in UI responsiveness</>
    ),
    points: [
      {
        num: "01/",
        text: (
          <>
            Built and refined responsive front-end layouts using{" "}
            <strong className="text-accent-white/80">React.js</strong>, HTML5, CSS3, and
            JavaScript across multiple client projects. Applied Python scripts to automate content
            structuring and data formatting tasks.
          </>
        ),
      },
      {
        num: "02/",
        text: "Collaborated in a cross-functional agile team to deliver cross-browser-compatible interfaces, debug UI issues, and optimize page load performance.",
      },
      {
        num: "03/",
        text: "Assisted in organizing project documentation and content assets, contributing to structured LMS platform content development workflows.",
      },
    ],
    tools: ["React.js", "JavaScript", "HTML5/CSS3", "Python", "Agile", "UI Optimization"],
  },
];

function ExperienceCard({ job }: { job: ExpJob }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center 65%"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const cardX = useSpring(rawX, { stiffness: 65, damping: 18 });
  const cardOpacity = useSpring(rawOpacity, { stiffness: 65, damping: 18 });

  return (
    <motion.div
      ref={cardRef}
      style={{ x: cardX, opacity: cardOpacity }}
      whileHover={{ borderColor: "rgba(255,255,255,0.12)" }}
      className="group relative border border-border-subtle bg-surface-dim p-8 md:p-10 transition-colors duration-300 overflow-hidden"
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-0.75 ${
          job.current
            ? "bg-linear-to-b from-emerald-400/70 via-emerald-400/20 to-transparent"
            : "bg-linear-to-b from-indigo-500/70 via-indigo-500/20 to-transparent"
        }`}
      />
      <motion.div
        initial={{ opacity: 0.3 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 right-0 w-8 h-8 border-t border-r border-border-accent"
      />

      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-hanken text-xl md:text-2xl font-extrabold uppercase tracking-tight text-accent-white"
          >
            {job.title}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-2 mt-2 text-text-muted font-mono text-xs"
          >
            <span className="font-bold text-accent-white uppercase">{job.company}</span>
            {job.companyFull && (
              <span className="text-text-muted/60">— {job.companyFull}</span>
            )}
            <span>•</span>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{job.location}</span>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 bg-surface-container-low border border-border-subtle px-3 py-1.5 rounded font-mono text-xs text-text-muted"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>{job.period}</span>
          </motion.div>
          {job.current && (
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-emerald-400">
              Current Role
            </span>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6 inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded text-accent-white font-mono text-xs"
      >
        <span>{job.badge}</span>
      </motion.div>

      <div className="space-y-4 font-hanken text-sm text-text-muted leading-relaxed">
        {job.points.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 + i * 0.12 }}
            className="flex gap-3"
          >
            <span className="text-accent-white font-bold select-none mt-0.5 font-mono text-xs shrink-0">
              {item.num}
            </span>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 pt-6 border-t border-border-subtle flex flex-wrap gap-2 items-center"
      >
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest mr-2">
          Core Tools:
        </span>
        {job.tools.map((tool) => (
          <motion.span
            key={tool}
            whileHover={{ scale: 1.08, color: "#ffffff" }}
            transition={{ duration: 0.15 }}
            className="font-mono text-[9px] uppercase tracking-wider bg-surface-container-lowest border border-border-subtle px-2 py-0.5 text-text-muted cursor-default"
          >
            {tool}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 30%"],
  });
  const rawSectionY = useTransform(sectionProgress, [0, 1], [60, 0]);
  const rawSectionOpacity = useTransform(sectionProgress, [0, 0.7], [0, 1]);
  const sectionY = useSpring(rawSectionY, { stiffness: 65, damping: 18 });
  const sectionOpacity = useSpring(rawSectionOpacity, { stiffness: 65, damping: 18 });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-section-gap px-margin-page relative z-20 border-t border-border-subtle"
    >
      <motion.div
        style={{ y: sectionY, opacity: sectionOpacity }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter-grid"
      >
        {/* Left column */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-[0.28em] text-indigo-400/70 mb-4 block"
            >
              02 — Professional History
            </motion.span>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="font-hanken text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none"
              >
                Work<br />Experience
              </motion.h2>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden lg:block font-mono text-[11px] text-text-muted mt-8"
          >
            PRACTICAL EXPERIENCE & PROFESSIONAL GROWTH
          </motion.div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-8 space-y-12">
          {jobs.map((job) => (
            <ExperienceCard key={job.company} job={job} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
