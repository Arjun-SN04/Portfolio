"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function GridBackground() {
  const { scrollY } = useScroll();
  // Fade the grid lines out completely by the time you've scrolled past the hero
  const opacity = useTransform(scrollY, [0, 480], [1, 0]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      style={{ opacity }}
    >
      {/* Side margin guides — visible only in hero */}
      <div className="absolute top-0 bottom-0 left-[5vw] w-[1px] bg-border-subtle" />
      <div className="absolute top-0 bottom-0 right-[5vw] w-[1px] bg-border-subtle" />
    </motion.div>
  );
}
