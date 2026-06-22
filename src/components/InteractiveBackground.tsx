"use client";

import { useEffect, useRef } from "react";

interface Dot {
  ox: number; // origin x
  oy: number; // origin y
  x: number;  // current x
  y: number;  // current y
  vx: number; // velocity x
  vy: number; // velocity y
  size: number;
  brightness: number; // 0–1
}

const GRID_SPACING = 36;
const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 5;
const SPRING = 0.08;
const DAMPING = 0.82;

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef<Dot[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0;
    let H = 0;

    // Build dot grid
    const buildGrid = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      const dots: Dot[] = [];
      const cols = Math.ceil(W / GRID_SPACING) + 1;
      const rows = Math.ceil(H / GRID_SPACING) + 1;
      const offsetX = (W - (cols - 1) * GRID_SPACING) / 2;
      const offsetY = (H - (rows - 1) * GRID_SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offsetX + c * GRID_SPACING;
          const oy = offsetY + r * GRID_SPACING;
          dots.push({
            ox, oy, x: ox, y: oy,
            vx: 0, vy: 0,
            size: Math.random() * 0.8 + 0.6,
            brightness: Math.random() * 0.25 + 0.08,
          });
        }
      }
      dotsRef.current = dots;
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repulsion
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          dot.vx += (dx / dist) * force;
          dot.vy += (dy / dist) * force;
        }

        // Spring back to origin
        dot.vx += (dot.ox - dot.x) * SPRING;
        dot.vy += (dot.oy - dot.y) * SPRING;

        // Damping
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Displacement-based brightness boost
        const disp = Math.hypot(dot.x - dot.ox, dot.y - dot.oy);
        const alpha = Math.min(1, dot.brightness + disp * 0.012);

        // Proximity glow
        const proximityGlow = dist < REPEL_RADIUS
          ? (1 - dist / REPEL_RADIUS) * 0.7
          : 0;
        const finalAlpha = Math.min(1, alpha + proximityGlow);
        const radius = dot.size + proximityGlow * 1.8;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${finalAlpha.toFixed(3)})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      // Slowly reset — just push mouse far away
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const handleResize = () => {
      buildGrid();
    };

    buildGrid();
    render();

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[3] pointer-events-auto"
      aria-hidden
    />
  );
}
