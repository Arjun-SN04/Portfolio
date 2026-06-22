"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navItems = [
    { label: "Work",       href: "#work"       },
    { label: "Experience", href: "#experience" },
    { label: "Skills",     href: "#skills"     },
    { label: "Honors",     href: "#honors"     },
    { label: "Contact",    href: "#contact"    },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-background/80 backdrop-blur-xl">
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-indigo-500/70 origin-left"
          style={{ scaleX }}
        />

        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-[5vw] py-5">
          <a
            href="#"
            className="font-mono text-sm font-extrabold tracking-widest uppercase text-accent-white hover:text-accent-hover transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ASN
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-widest text-text-muted">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="hover:text-accent-white transition-colors duration-300 relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
              </a>
            ))}

            <a
              href="/Arjun_Nair_Resume.pdf"
              download="Arjun_Nair_Resume.pdf"
              className="group relative flex items-center gap-2 border border-border-accent bg-surface-dim hover:bg-accent-white hover:text-black hover:border-accent-white px-4 py-2 text-accent-white transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 rounded-sm border border-accent-white/30 animate-ping opacity-20 group-hover:hidden" />
              <Download className="h-3 w-3" />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block md:hidden text-accent-white hover:opacity-75 transition-opacity"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 bottom-0 right-0 z-[60] w-full max-w-xs h-[100dvh] bg-background border-l border-white/10 p-8 flex flex-col justify-between md:hidden shadow-2xl transition-transform duration-300 ease-out overflow-y-auto
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div>
          <div className="flex justify-between items-center mb-12">
            <span className="font-mono text-xs font-bold text-accent-white">MENU</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-accent-white hover:opacity-75 transition-opacity"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-0 font-mono text-base uppercase tracking-wider">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-white/80 hover:text-white transition-colors py-4 border-b border-white/10"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/Arjun_Nair_Resume.pdf"
              download="Arjun_Nair_Resume.pdf"
              className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-accent-white border border-border-accent px-4 py-3 hover:bg-accent-white hover:text-black transition-all duration-300 mt-4"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </div>
        </div>
        <div className="font-mono text-xs text-text-muted">
          © 2026 ARJUN S NAIR.
        </div>
      </div>
    </>
  );
}
