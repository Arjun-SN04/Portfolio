"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view" | "copy">("default");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 900, mass: 0.08 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);
    document.body.classList.add("has-custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Bubble up to find interactive elements
      const interactiveEl = target.closest("a, button, [data-cursor]");
      if (interactiveEl) {
        const type = interactiveEl.getAttribute("data-cursor") || "pointer";
        setCursorType(type as any);
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full flex items-center justify-center transition-[width,height] duration-150 ease-out
        ${cursorType === "default" ? "w-3 h-3 bg-white" : ""}
        ${cursorType === "pointer" ? "w-14 h-14 bg-white" : ""}
        ${cursorType === "view" ? "w-20 h-20 bg-white" : ""}
        ${cursorType === "copy" ? "w-20 h-20 bg-white" : ""}
      `}
    >
      {cursorType === "view" && (
        <span className="text-[10px] font-extrabold text-black tracking-widest font-mono select-none">VIEW</span>
      )}
      {cursorType === "copy" && (
        <span className="text-[10px] font-extrabold text-black tracking-widest font-mono select-none">COPY</span>
      )}
    </motion.div>
  );
}
