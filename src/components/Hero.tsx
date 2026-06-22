"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, GitFork, Link2 } from "lucide-react";
import Globe from "./Globe";

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });
  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }}
      onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}

const ROLES = [
  "MERN Developer",
  "AI Developer",
  "Full Stack Engineer",
  "LLM Builder",
  "React Developer",
  "Node.js Engineer",
  "Next.js Developer",
  "TypeScript Developer",
  "REST API Developer",
  "AI Integration Engineer",
  "Real-time Systems Dev",
  "Backend Developer",
];

const nameLines = [
  { text: "ARJUN", gradient: false },
  { text: "S",     gradient: false },
  { text: "NAIR",  gradient: true  },
];

export default function Hero() {
  const { scrollY } = useScroll();
  const dynamicSpacing = useTransform(scrollY, [0, 650], ["-0.02em", "0.38em"]);

  const [isMobile, setIsMobile] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);

    const el = document.getElementById("contact");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const current = ROLES[roleIdx];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTyping(false), 2000);
      return () => clearTimeout(t);
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 38);
        return () => clearTimeout(t);
      }
      setRoleIdx(i => (i + 1) % ROLES.length);
      setTyping(true);
    }
  }, [displayed, typing, roleIdx]);

  const nameSpacing = isMobile ? "-0.02em" : dynamicSpacing;

  const handleScrollToWork = () => {
    const el = document.getElementById("work");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <section className="relative h-[100svh] md:h-screen min-h-[660px] flex flex-col bg-background">

      {/* ── Globe — centered, fades on scroll ── */}
      <div className="fixed inset-0 z-5">
        <Globe />
      </div>

      {/* ── Vignettes ── */}
      <div className="absolute inset-0 pointer-events-none z-[8]"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(5,5,5,0.68) 100%)" }}
        aria-hidden />
      <div className="absolute top-0 left-0 right-0 h-36 pointer-events-none z-[8]"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.92), transparent)" }}
        aria-hidden />
      <div className="absolute bottom-0 left-0 right-0 h-52 pointer-events-none z-[8]"
        style={{ background: "linear-gradient(to top, rgba(5,5,5,0.98), transparent)" }}
        aria-hidden />

      {/* ── TOP BAR ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2 }}
        className="relative z-20 flex justify-between items-center px-[4vw] pt-7"
      >
        
        {/* placeholder right so space-between works */}
        <div />
      </motion.div>

      {/* ── RIGHT SIDE SOCIAL STRIP ── */}
      <motion.div
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: contactVisible ? 0 : 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-5 pointer-events-none"
        style={{ pointerEvents: contactVisible ? "none" : "auto" }}
      >
        <a href="https://github.com/Arjun-SN04" target="_blank" rel="noopener noreferrer"
          className="group text-text-muted hover:text-accent-white transition-colors duration-300">
          <GitFork className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
        </a>
        <span className="h-12 w-[1px] bg-border-subtle" />
        <a href="https://linkedin.com/in/arjun-s-nair" target="_blank" rel="noopener noreferrer"
          className="group text-text-muted hover:text-accent-white transition-colors duration-300">
          <Link2 className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
        </a>
      </motion.div>

      {/* ── NAME BLOCK — vertically centered, large ── */}
      <div className="relative z-20 flex flex-col justify-start flex-1 px-[4vw] pt-[10svh] md:pt-[10vh] select-none">

        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-text-muted mb-3 block"
        >
          Full Stack AI Integration Developer
        </motion.span>

        <h1 className="text-left">
          {nameLines.map((line, li) => (
            <div key={li} className="overflow-hidden leading-none">
              <motion.div
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 + li * 0.13 }}
                style={{ letterSpacing: nameSpacing }}
                className={`font-hanken font-black uppercase
                  text-[9vw] sm:text-[8vw] md:text-[7.5vw] lg:text-[7vw]
                  leading-[0.92]
                  ${line.gradient ? "gradient-text" : "text-accent-white"}
                `}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Intro line below name */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-hanken text-sm sm:text-[15px] text-text-muted leading-relaxed max-w-[480px]"
        >
          Full-stack developer specializing in AI integration crafting LLM-powered
          platforms, real-time systems, and scalable MERN applications.
        </motion.p>
      </div>

      {/* ── BOTTOM ROW ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="relative z-20 px-[4vw] pb-10"
      >
        <div className="h-[1px] w-full bg-border-subtle mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="flex items-center gap-2"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted/50">
              /
            </span>
            <span className="font-mono text-[13px] sm:text-sm text-accent-white tracking-wide">
              {displayed}
              <span className="inline-block w-0.5 h-[1em] bg-accent-white align-middle ml-0.5 animate-pulse" />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="flex items-center gap-3 shrink-0"
          >
            <motion.button
              onClick={handleScrollToWork}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] bg-accent-white text-black px-7 py-3 rounded-full hover:bg-white/90 transition-colors duration-300"
            >
              Explore Projects
              <ArrowUpRight className="h-3 w-3 group-hover:translate-x-px group-hover:-translate-y-px transition-transform duration-300" />
            </motion.button>

            <motion.a
              href="/Arjun_Nair_Resume.pdf"
              download="Arjun_Nair_Resume.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="flex items-center font-mono text-[10px] uppercase tracking-[0.18em] border border-border-subtle text-text-muted px-7 py-3 rounded-full hover:border-accent-white/40 hover:text-accent-white transition-all duration-300"
            >
              Download CV
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── SCROLL indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer"
        onClick={handleScrollToWork}
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-text-muted/50">Scroll</span>
        <Magnetic>
          <ArrowDown className="h-3 w-3 text-text-muted/50 animate-bounce" />
        </Magnetic>
      </motion.div>

    </section>
  );
}
