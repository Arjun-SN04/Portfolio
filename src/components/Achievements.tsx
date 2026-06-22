"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { GraduationCap, Award, CheckCircle2, Bookmark } from "lucide-react";

const honors = [
  { label: "Smart India Hackathon (SIH)", badge: "Qualifier" },
  { label: "Microsoft Imagine Cup", badge: "Qualifier" },
  { label: "Technical Quiz Event", badge: "1st Prize" },
  { label: "Circuit Design Competition", badge: "1st Prize" },
  { label: "Hackathon Competition", badge: "2nd Prize" },
  { label: "Developer Bootcamp", badge: "Selected" },
  { label: "24-Hour Live Coding Hackathon", badge: "Participant" },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 25%"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.65], [0, 1]);
  const y = useSpring(rawY, { stiffness: 65, damping: 18 });
  const opacity = useSpring(rawOpacity, { stiffness: 65, damping: 18 });

  return (
    <section ref={sectionRef} id="honors" className="py-section-gap px-[5vw] relative z-20 border-t border-border-subtle">
      <motion.div style={{ y, opacity }}>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 relative pb-6">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-hanken text-4xl md:text-5xl font-bold uppercase tracking-tight"
          >
            Education &amp; Honors
          </motion.h2>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-indigo-400/70 mt-2 md:mt-0"
        >
          04 — Credentials
        </motion.span>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-border-subtle origin-left"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-gutter-grid">

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
          className="lg:col-span-4"
        >
          <div className="border border-border-subtle bg-surface-dim p-8 h-full flex flex-col justify-between transition-colors duration-300 group">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">Academic Record</span>
                <motion.div whileHover={{ rotate: 10, scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <GraduationCap className="h-5 w-5 text-text-muted group-hover:text-accent-white transition-colors duration-300" />
                </motion.div>
              </div>
              <h3 className="font-hanken text-xl font-extrabold uppercase tracking-tight text-accent-white mb-6">
                Education
              </h3>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h4 className="font-hanken text-sm font-extrabold uppercase text-accent-white">
                    B.Tech, Computer Science &amp; Engineering
                  </h4>
                  
                  <div className="flex items-center gap-2 mt-2 font-mono text-[10px]">
                    <span className="text-border-accent">|</span>
                    <span className="text-text-muted">2022 – 2026</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="pt-4 border-t border-border-subtle/50"
                >
                  <h4 className="font-hanken text-sm font-bold uppercase text-accent-white">
                    St Columbus School
                  </h4>
                  <div className="space-y-1 mt-2 font-mono text-[10px] text-text-muted">
                    <div>Class XII:(2022)</div>
                    <div>Class X: (2020)</div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="font-mono text-[9px] text-text-muted mt-12 uppercase tracking-widest">
              
            </div>
          </div>
        </motion.div>

        {/* Honors Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
          whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
          className="lg:col-span-5"
        >
          <div className="border border-border-subtle bg-surface-dim p-8 h-full flex flex-col justify-between transition-colors duration-300 group">
            <div>
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-xs text-text-muted uppercase tracking-widest">Competition</span>
                <motion.div whileHover={{ rotate: 10, scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <Award className="h-5 w-5 text-text-muted group-hover:text-accent-white transition-colors duration-300" />
                </motion.div>
              </div>
              <h3 className="font-hanken text-xl font-extrabold uppercase tracking-tight text-accent-white mb-6">
                Honors &amp; Hackathons
              </h3>

              <ul className="space-y-3">
                {honors.map((honor, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-accent-white font-mono text-[10px] mt-0.5 select-none shrink-0">/ </span>
                      <span className="font-hanken text-[13px] text-text-muted">{honor.label}</span>
                    </div>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                      className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 shrink-0 ${
                        honor.badge.includes("1st")
                          ? "border border-accent-white/30 text-accent-white/80 bg-white/5"
                          : honor.badge === "Qualifier" || honor.badge === "Selected"
                          ? "border border-border-accent text-text-muted"
                          : "border border-border-subtle text-text-muted"
                      }`}
                    >
                      {honor.badge}
                    </motion.span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="font-mono text-[9px] text-text-muted mt-12 uppercase tracking-widest">
              COMPETITIVE TEAM PLAYER
            </div>
          </div>
        </motion.div>

        {/* Certs + Pursuing */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
            whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
            className="border border-border-subtle bg-surface-dim p-6 transition-colors duration-300 group flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] text-text-muted uppercase">Verified</span>
                <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <CheckCircle2 className="h-4 w-4 text-text-muted group-hover:text-accent-white transition-colors duration-300" />
                </motion.div>
              </div>
              <h4 className="font-hanken text-xs font-extrabold uppercase tracking-tight text-accent-white mb-4">
                Certifications
              </h4>
              <div className="space-y-3 font-hanken text-xs text-text-muted">
                {["Full-Stack Web Development", "Data Structures & Algorithms", "Cisco Cybersecurity"].map((cert, i) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className={i > 0 ? "pt-2 border-t border-border-subtle/50" : ""}
                  >
                    {cert}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
            whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
            className="border border-border-subtle bg-surface-dim p-6 transition-colors duration-300 group flex-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] text-text-muted uppercase">In Progress</span>
                <Bookmark className="h-4 w-4 text-text-muted animate-pulse" />
              </div>
              <h4 className="font-hanken text-xs font-extrabold uppercase tracking-tight text-accent-white mb-4">
                Currently Pursuing
              </h4>
              <div className="space-y-3 font-hanken text-xs text-text-muted">
                {["Prompt Engineering for Generative AI", "Machine Learning Fundamentals (Python)"].map((course, i) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className={i > 0 ? "pt-2 border-t border-border-subtle/50" : ""}
                  >
                    {course}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </motion.div>
    </section>
  );
}
