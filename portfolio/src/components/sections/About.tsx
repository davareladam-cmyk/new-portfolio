"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL, STATS } from "@/lib/constants";

function Counter({ target, label }: { target: number; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl sm:text-5xl font-bold text-accent">{count}</div>
      <div className="text-sm text-text-muted mt-1 font-mono">{label}</div>
    </div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 sm:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="section-label mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          01 — About Me
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={sectionVariants}
            transition={{ delay: 0.1 }}
          >
            <div className="corner-bracket relative aspect-[3/4] max-w-md bg-surface border border-border overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-cyan-500/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-text-muted font-mono text-sm">[ Your Photo Here ]</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={sectionVariants}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg sm:text-xl leading-relaxed text-text-muted mb-8">
              {PERSONAL.bio}
            </p>

            <div className="flex items-center justify-center gap-8 sm:gap-12 py-8 border-y border-border">
              <Counter target={STATS.years} label="Years Experience" />
              <div className="w-px h-12 bg-border" />
              <Counter target={STATS.projects} label="Projects" />
              <div className="w-px h-12 bg-border" />
              <Counter target={STATS.clients} label="Clients" />
            </div>

            <p className="font-mono text-sm text-text-muted mt-6">
              <span className="text-accent">Location:</span> {PERSONAL.location}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
