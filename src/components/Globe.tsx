"use client";

import { useEffect, useRef } from "react";
import { mapPoints } from "./mapPointsData";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  phase: number;
  speed: number;
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interaction and physics states
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: -0.8 });
  const velocityRef = useRef({ x: 0, y: 0.003 }); // velocity for auto-rotation/spin
  const mouseHoverRef = useRef({ x: -9999, y: -9999 });
  const isHoveredRef = useRef(false);

  // Dynamic radius stored in ref
  const RRef = useRef(150);

  // Scroll tracking ref (ranges from 0 to 1.2)
  const scrollProgressRef = useRef(0);
  // Lerp-smoothed scroll value — prevents micro-jitter in spread animation
  const smoothScrollRef = useRef(0);
  // Stable viewport height to prevent scrolling height shifts on mobile devices
  const viewportHeightRef = useRef(800);

  // Initialize data arcs, stars, and point-drift vectors
  const starsRef = useRef<Star[]>([]);
  const pointDriftsRef = useRef<Point3D[]>([]);

  useEffect(() => {
    // Generate random 2D drift vectors for each map point
    // When scroll progress increases, points move along these vectors in flat screen space
    const drifts: Point3D[] = mapPoints.map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.6 + Math.random() * 0.9;
      return {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
        z: 0,
      };
    });
    pointDriftsRef.current = drifts;

    // Generate random background stars in a wide 3D viewport bounding box
    const stars: Star[] = [];
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1600,
        y: (Math.random() - 0.5) * 1000,
        z: (Math.random() - 0.5) * 600,
        size: Math.random() * 0.9 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.02,
      });
    }
    starsRef.current = stars;


  }, []);

  // Cache viewport height on mount and resize to avoid layouts shifting on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    viewportHeightRef.current = window.innerHeight || 800;
    const handleResize = () => {
      viewportHeightRef.current = window.innerHeight || 800;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track window scroll progress passively to avoid React re-renders
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = viewportHeightRef.current || 800;
      // Allow scroll target to reach 2.0 so dispersion spreads fully and fades out completely (early returns at s >= 1.9)
      scrollProgressRef.current = Math.min(2.0, Math.max(0, scrollY / viewportHeight));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    const cameraDistance = 450;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    let frameCount = 0;

    // Stable logical dimensions — set once per resize, never read from canvas mid-tick
    // This prevents mobile address-bar show/hide from causing positional jumps each frame
    let stableW = 0;
    let stableH = 0;

    const resize = () => {
      stableW = canvas.offsetWidth;
      stableH = canvas.offsetHeight;
      canvas.width = stableW * window.devicePixelRatio;
      canvas.height = stableH * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      if (stableW > 1024) {
        RRef.current = 150;
      } else if (stableW > 768) {
        RRef.current = 125;
      } else {
        RRef.current = 95;
      }
    };

    resize();
    // Mobile: only resize on orientation change — address bar hide/show fires resize
    // constantly during scroll, causing cy to shift and appear as layout stutter
    if (isMobile) {
      window.addEventListener("orientationchange", resize);
    } else {
      window.addEventListener("resize", resize);
    }

    // Render loop
    const tick = () => {
      // Lerp toward raw scroll at 60fps — smooths out micro-jitter. Faster on mobile for snappy tracking.
      const scrollTarget = scrollProgressRef.current;
      const lerpSpeed = isMobile ? 0.15 : 0.08;
      smoothScrollRef.current += (scrollTarget - smoothScrollRef.current) * lerpSpeed;
      const s = smoothScrollRef.current;

      rafId = requestAnimationFrame(tick);

      // Skip render when globe fully gone to save CPU/GPU resources
      if (s >= 1.9) {
        canvas.style.opacity = "0";
        return;
      }

      const wLogical = stableW;
      const hLogical = stableH;

      // Fade starts at s=1.1 (just past hero), fully gone at s=1.9 (well into next section)
      const canvasOpacity = Math.max(0, 1 - Math.max(0, (s - 1.1) / 0.8));
      canvas.style.opacity = canvasOpacity.toFixed(3);

      ctx.clearRect(0, 0, wLogical, hLogical);

      const cx = wLogical / 2;
      // Shift globe down slightly on mobile so it clears the hero text
      const cy = hLogical / 2 + (isMobile ? hLogical * 0.08 : 0);
      const R = RRef.current;

      // Update rotation angles with inertia
      if (!isDraggingRef.current) {
        velocityRef.current.x *= 0.95;
        velocityRef.current.y *= 0.95;

        // Auto-rotation velocity
        if (Math.abs(velocityRef.current.y) < 0.002) {
          velocityRef.current.y = 0.002;
        }

        rotationRef.current.x += velocityRef.current.x;
        rotationRef.current.y += velocityRef.current.y;
      } else {
        velocityRef.current.x *= 0.85;
        velocityRef.current.y *= 0.85;
      }

      const timeMs = Date.now();
      const floatWobble = Math.sin(timeMs * 0.0006) * 0.05;

      const rx = rotationRef.current.x + floatWobble;
      const ry = rotationRef.current.y;

      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);

      // Sine ease-out for scroll dispersion: starts quickly, cushions smoothly at the end
      // Extend easing to s=1.8 so spread continues past hero fold
      const easedScroll = Math.sin(Math.min(1.8, s) / 1.8 * Math.PI / 2);

      // Vortex swirl: reduced to 0.8 rad for fluid outward motion (was 2.4 — too chaotic)
      const swirlAngle = easedScroll * 0.8;

      // Rotates 3D points based on spin matrices (and custom Y vortex rotation)
      const getRotated = (x: number, y: number, z: number, ptIndex: number = 0, applySwirl: boolean = true): Point3D => {
        const ptSwirl = applySwirl ? swirlAngle * (0.8 + (ptIndex % 12) * 0.05) : 0;
        const currentRY = ry + ptSwirl;

        const cosY = Math.cos(currentRY);
        const sinY = Math.sin(currentRY);

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        return { x: x1, y: y2, z: z2 };
      };

      // Fade structures (rings, lines) faster than main dots
      const scrollFade = Math.max(0, 1 - s * 2.2);

      // ── Layer 0: Solid black sphere body — fades as dots spread ──
      const sphereBodyAlpha = Math.max(0, 0.92 - easedScroll * 1.1);
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(5, 5, 5, ${sphereBodyAlpha.toFixed(3)})`;
      ctx.fill();

      // ── Layer 1: Atmospheric glow (white/silver, no blue) ──
      if (scrollFade > 0) {
        const glowGrad = ctx.createRadialGradient(cx, cy, R * 0.85, cx, cy, R * 1.15);
        glowGrad.addColorStop(0, `rgba(200, 200, 200, ${0.07 * scrollFade})`);
        glowGrad.addColorStop(0.6, `rgba(255, 255, 255, ${0.03 * scrollFade})`);
        glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(cx, cy, R * 1.15, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();
      }

      // ── Layer 2: Render background stars (z < 0) ──
      starsRef.current.forEach((star) => {
        star.phase += star.speed;
        const rStar = getRotated(star.x, star.y, star.z, 0, false);
        if (rStar.z < 0) {
          // Safety check: skip drawing if star is behind/too close to the camera plane
          if (cameraDistance + rStar.z <= 10) return;

          const proj = cameraDistance / (cameraDistance + rStar.z);
          const px = cx + rStar.x * proj;
          const py = cy - rStar.y * proj;
          const size = Math.max(0.1, star.size * proj);
          const twinkle = 0.35 + Math.sin(star.phase) * 0.25;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${twinkle.toFixed(2)})`;
          ctx.fill();
        }
      });

      // ── Layer 3: Project and group world dots (with Balanced 2D screen-space dispersion) ──
      const levels: { px: number[]; py: number[]; size: number }[] = Array.from({ length: 6 }, () => ({
        px: [],
        py: [],
        size: 0,
      }));

      // Adjusted circle sizes (optimal for 4.5k Fibonacci point density)
      levels[0].size = 1.0;  // Backside
      levels[1].size = 1.5;  // Dim
      levels[2].size = 2.0;  // Medium
      levels[3].size = 2.6;  // Bright
      levels[4].size = 3.2;  // Hover lights
      levels[5].size = 4.0;  // Hover peak

      const spotlightRadius = 80;
      let mouse3D: Point3D | null = null;

      // Calculate 3D mouse vector for spotlight hover (only when globe is intact: s < 0.1)
      if (isHoveredRef.current && s < 0.1) {
        const mx = mouseHoverRef.current.x - cx;
        const my = cy - mouseHoverRef.current.y;
        const mouseDist2D = Math.sqrt(mx * mx + my * my);
        if (mouseDist2D < R * 1.1) {
          const mz = Math.sqrt(Math.max(0, R * R - mouseDist2D * mouseDist2D));
          mouse3D = { x: mx, y: my, z: mz };
        }
      }

      const drifts = pointDriftsRef.current;

      // Subsample dots on mobile to reduce point count from 4.5k to 2.25k for significant speedup
      const step = isMobile ? 2 : 1;
      for (let i = 0; i < mapPoints.length; i += step) {
        const p = mapPoints[i];
        const drift = drifts[i] || { x: 0, y: 0, z: 0 };

        // 1. Calculate spherical position
        const x_sphere = R * Math.cos(p[1]) * Math.sin(p[0]);
        const y_sphere = R * Math.sin(p[1]);
        const z_sphere = R * Math.cos(p[1]) * Math.cos(p[0]);

        // Apply constant axial tilt of 23.5° (0.41 radians) around the Z-axis
        const x_tilted = x_sphere * Math.cos(0.41) - y_sphere * Math.sin(0.41);
        const y_tilted = x_sphere * Math.sin(0.41) + y_sphere * Math.cos(0.41);
        const z_tilted = z_sphere;

        // 2. Rotate and project regular sphere position
        const r = getRotated(x_tilted, y_tilted, z_tilted, i);
        const proj = cameraDistance / (cameraDistance + r.z);

        const px_globe = cx + r.x * proj;
        const py_globe = cy - r.y * proj;

        // 3. Spread freely across screen — no boundary
        const spreadDist = isMobile ? 600 : 1100;
        const px = px_globe + (drift.x * spreadDist) * easedScroll;
        const py = py_globe + (drift.y * spreadDist) * easedScroll;

        if (r.z < 0) {
          // Backside point
          levels[0].px.push(px);
          levels[0].py.push(py);
        } else {
          // Frontside point
          let levelIdx = 1;
          const faceFactor = r.z / R;

          if (faceFactor > 0.8) {
            levelIdx = 3;
          } else if (faceFactor > 0.4) {
            levelIdx = 2;
          }

          // Spotlight hovering (disabled when dispersing: s > 0.1)
          if (mouse3D && s < 0.1) {
            const dx = r.x - mouse3D.x;
            const dy = r.y - mouse3D.y;
            const dz = r.z - mouse3D.z;
            const d3d = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (d3d < spotlightRadius) {
              const hoverFactor = 1 - d3d / spotlightRadius;
              if (hoverFactor > 0.6) {
                levelIdx = 5;
              } else if (hoverFactor > 0.2) {
                levelIdx = 4;
              } else {
                levelIdx = Math.max(levelIdx, 3);
              }
            }
          }

          levels[levelIdx].px.push(px);
          levels[levelIdx].py.push(py);
        }
      }

      // Draw batched points — no clip, dots spread freely
      // All levels brighten to full visibility during spread
      const spreadBlend = Math.min(1, easedScroll * 2.0);
      const uniformAlpha = (0.55 + spreadBlend * 0.45).toFixed(3);
      const opacities = [
        `rgba(255, 255, 255, ${uniformAlpha})`,
        `rgba(255, 255, 255, ${uniformAlpha})`,
        `rgba(255, 255, 255, ${uniformAlpha})`,
        `rgba(255, 255, 255, ${uniformAlpha})`,
        "rgba(255, 255, 255, 1.00)",
        "rgba(255, 255, 255, 1.00)",
      ];

      const useSquarePoints = isMobile;

      for (let l = 0; l < levels.length; l++) {
        const lvl = levels[l];
        if (lvl.px.length === 0) continue;

        ctx.fillStyle = opacities[l];
        ctx.beginPath();

        // On mobile, draw small squares (rect) instead of circles (arc) as they are visually equivalent but 5-10x faster
        if (l === 0 || useSquarePoints) {
          const size = lvl.size;
          for (let i = 0; i < lvl.px.length; i++) {
            const px = lvl.px[i];
            const py = lvl.py[i];
            ctx.rect(px - size / 2, py - size / 2, size, size);
          }
        } else {
          const radius = lvl.size / 2;
          for (let i = 0; i < lvl.px.length; i++) {
            const px = lvl.px[i];
            const py = lvl.py[i];
            ctx.moveTo(px + radius, py);
            ctx.arc(px, py, radius, 0, Math.PI * 2);
          }
        }
        ctx.fill();
      }

      // ── Layer 6: Foreground stars (z > 0) ──
      starsRef.current.forEach((star) => {
        const rStar = getRotated(star.x, star.y, star.z, 0, false);
        if (rStar.z >= 0) {
          // Safety check: skip drawing if star is behind/too close to the camera plane
          if (cameraDistance + rStar.z <= 10) return;

          const proj = cameraDistance / (cameraDistance + rStar.z);
          const px = cx + rStar.x * proj;
          const py = cy - rStar.y * proj;
          const size = Math.max(0.1, star.size * proj);
          const twinkle = 0.35 + Math.sin(star.phase) * 0.25;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${twinkle.toFixed(2)})`;
          ctx.fill();
        }
      });
    };

    tick();

    // Input Interactions (Disabled when dispersing: s > 0.1)
    const getPointerPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (scrollProgressRef.current > 0.1) return;
      isDraggingRef.current = true;
      const pos = getPointerPos(e);
      previousMouseRef.current = pos;
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const pos = getPointerPos(e);
      mouseHoverRef.current = pos;
      isHoveredRef.current = true;

      if (isDraggingRef.current && scrollProgressRef.current <= 0.1) {
        const dx = pos.x - previousMouseRef.current.x;
        const dy = pos.y - previousMouseRef.current.y;

        const sensitivity = 0.005;
        velocityRef.current.y = dx * sensitivity;
        velocityRef.current.x = -dy * sensitivity;

        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += velocityRef.current.x;
        rotationRef.current.x = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, rotationRef.current.x));

        previousMouseRef.current = pos;
      }
    };

    const handleEnd = () => {
      isDraggingRef.current = false;
    };

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      isDraggingRef.current = false;
      mouseHoverRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleEnd);

    canvas.addEventListener("touchstart", handleStart, { passive: true });
    canvas.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", handleEnd);

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      if (isMobile) {
        window.removeEventListener("orientationchange", resize);
      } else {
        window.removeEventListener("resize", resize);
      }

      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleEnd);

      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);

      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 select-none pointer-events-none md:pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{
          filter: "drop-shadow(0 0 28px rgba(255,255,255,0.07))",
        }}
        aria-hidden
      />
    </div>
  );
}
