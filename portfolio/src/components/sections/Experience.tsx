"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { EXPERIENCE } from "@/lib/constants";
import { fadeUp, slideInLeft, slideInRight } from "@/lib/animations";

function MobileTimelineCard({
  item,
  index,
}: {
  item: (typeof EXPERIENCE)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Mobile dot */}
      <div className="absolute -left-[2.35rem] top-6 w-3 h-3 rounded-full bg-accent border-2 border-bg" />
      <div className="bg-surface border border-border p-5 relative group hover:border-accent/30 transition-colors">
        <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
          <div>
            <h3 className="font-display text-lg font-bold">{item.role}</h3>
            <p className="text-text-muted font-mono text-sm">{item.company}</p>
          </div>
          <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1">
            {item.period}
          </span>
        </div>
        <ul className="space-y-1.5">
          {item.bullets.map((bullet, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-text-muted">
              <span className="text-accent mt-0.5 shrink-0">—</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function TimelineCard({
  item,
  index,
}: {
  item: (typeof EXPERIENCE)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 last:mb-0`}
    >
      {/* Desktop: alternating layout */}
      <motion.div
        className={`lg:col-span-1 ${isLeft ? "lg:col-start-1" : "lg:col-start-2"}`}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={isLeft ? slideInLeft : slideInRight}
      >
        <div className="bg-surface border border-border p-6 relative group hover:border-accent/30 transition-colors duration-300">
          {/* Corner accent */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-accent transition-colors">
                {item.role}
              </h3>
              <p className="text-text-muted font-mono text-sm mt-1">{item.company}</p>
            </div>
            <span className="text-xs font-mono text-accent bg-accent/10 px-3 py-1 whitespace-nowrap ml-4">
              {item.period}
            </span>
          </div>

          <ul className="space-y-2">
            {item.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                <span className="text-accent mt-1 shrink-0">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Center dot on desktop */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
        <motion.div
          className="w-3 h-3 rounded-full bg-accent border-2 border-bg z-10"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-24 sm:py-32 border-t border-border" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="section-label mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          04 — Experience
        </motion.div>

        <motion.h2
          className="font-display text-4xl sm:text-5xl font-bold mb-16 max-w-xl"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          Where I&apos;ve{" "}
          <span className="text-accent">worked</span>
        </motion.h2>

        <div className="relative" ref={lineRef}>
          {/* Vertical timeline line — desktop only */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border overflow-hidden">
            <motion.div
              className="w-full bg-accent origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile: left border line */}
          <div className="lg:hidden absolute left-3 top-0 bottom-0 w-px bg-border" />

          <div className="lg:hidden space-y-8 pl-10">
            {EXPERIENCE.map((item, i) => (
              <MobileTimelineCard key={i} item={item} index={i} />
            ))}
          </div>

          {/* Desktop timeline */}
          <div className="hidden lg:block">
            {EXPERIENCE.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
