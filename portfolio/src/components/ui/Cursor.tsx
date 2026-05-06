"use client";

import { useEffect, useState } from "react";

export function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    let rafId: number;
    const handlePointerMove = (e: PointerEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cx", `${e.clientX}px`);
        document.documentElement.style.setProperty("--cy", `${e.clientY}px`);
      });
    };

    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-hoverable]")) {
        setIsHovering(true);
      }
    };

    const handlePointerOut = () => setIsHovering(false);

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="cursor-dot" />
      <div className={`cursor-ring ${isHovering ? "hovering" : ""}`} />
    </>
  );
}
