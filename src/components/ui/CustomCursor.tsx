"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 450, damping: 32, mass: 0.4 });
  const cursorY = useSpring(-100, { stiffness: 450, damping: 32, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttrEl = target.closest("[data-cursor]");
      if (cursorAttrEl) {
        const label = cursorAttrEl.getAttribute("data-cursor") || "EXPLORE";
        setCursorLabel(label);
        setIsHoveringInteractive(true);
        return;
      }

      const clickable = target.closest("a, button, [role='button']");
      if (clickable) {
        setCursorLabel("");
        setIsHoveringInteractive(true);
      } else {
        setCursorLabel("");
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:flex items-center justify-center"
    >
      <motion.div
        animate={{
          width: cursorLabel ? 76 : isHoveringInteractive ? 36 : 12,
          height: cursorLabel ? 76 : isHoveringInteractive ? 36 : 12,
          backgroundColor: cursorLabel
            ? "rgba(23, 25, 27, 0.92)"
            : isHoveringInteractive
            ? "rgba(165, 139, 98, 0.18)"
            : "rgba(165, 139, 98, 0.85)",
          borderColor: cursorLabel
            ? "rgba(165, 139, 98, 0.9)"
            : "rgba(165, 139, 98, 0.65)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex items-center justify-center rounded-full border"
      >
        {cursorLabel && (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ivory">
            {cursorLabel}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
