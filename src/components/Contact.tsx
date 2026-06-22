"use client";

import { useState } from "react";
import { Copy, Check, Mail, GitFork, Link2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "2004arjunsnair@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/Arjun-SN04",
      icon: GitFork,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/arjun-s-nair",
      icon: Link2,
    },
  ];

  return (
    <section id="contact" className="py-section-gap px-[5vw] text-center relative z-20 border-t border-border-subtle overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-10">

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-indigo-400/70 block"
        >
          05 — Get In Touch
        </motion.span>

        <a
          href={`mailto:${email}`}
          className="font-hanken text-[9vw] sm:text-[8vw] md:text-[7vw] lg:text-[6.5vw] font-extrabold uppercase leading-[1.05] tracking-tighter text-accent-white hover:text-text-muted transition-colors duration-300 block select-none"
        >
          <span className="block overflow-hidden pb-1 md:pb-2">
            <motion.span
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="block"
            >
              Let&apos;s Build
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1 md:pb-2">
            <motion.span
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
              className="block"
            >
              Together
            </motion.span>
          </span>
        </a>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <motion.a
            href={`mailto:${email}`}
            whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-accent-white bg-surface-dim border border-border-subtle px-6 py-3.5 transition-colors duration-300"
          >
            <Mail className="h-3.5 w-3.5" />
            Send Email
          </motion.a>

          <motion.button
            onClick={handleCopy}
            data-cursor="copy"
            whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-accent-white bg-surface-dim border border-border-subtle px-6 py-3.5 transition-colors duration-300"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Email
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-between gap-6"
        >
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "#ffffff" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest text-text-muted"
            >
              <Icon className="h-4 w-4" />
              {label}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
