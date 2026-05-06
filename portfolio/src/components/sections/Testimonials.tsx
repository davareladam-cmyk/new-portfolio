"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";

const AVATAR_COLORS = [
  "from-accent/40 to-cyan-500/40",
  "from-purple-500/40 to-accent/40",
  "from-cyan-500/40 to-blue-500/40",
  "from-orange-500/40 to-accent/40",
];

function TestimonialCard({ item, index }: { item: (typeof TESTIMONIALS)[0]; index: number }) {
  return (
    <div className="flex-shrink-0 w-80 sm:w-96 bg-surface border border-border p-8 relative group hover:border-accent/30 transition-colors duration-300 snap-start">
      {/* Quote mark */}
      <div className="font-display text-6xl text-accent/20 leading-none mb-4 select-none">&ldquo;</div>

      <p className="text-text-muted leading-relaxed mb-6 text-sm sm:text-base">
        {item.text}
      </p>

      <div className="flex items-center gap-4 pt-4 border-t border-border">
        {/* Avatar placeholder */}
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${AVATAR_COLORS[index % AVATAR_COLORS.length]} flex items-center justify-center shrink-0`}
        >
          <span className="text-sm font-bold text-text-primary">
            {item.name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="text-sm font-medium text-text-primary">{item.name}</div>
          <div className="text-xs font-mono text-text-muted">{item.role}</div>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate for seamless loop feel
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-24 sm:py-32 border-t border-border overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <motion.div
          className="section-label mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          05 — Testimonials
        </motion.div>

        <motion.h2
          className="font-display text-4xl sm:text-5xl font-bold max-w-xl"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          What people{" "}
          <span className="text-accent">say</span>
        </motion.h2>
      </div>

      {/* Scrollable carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 px-6 lg:px-8 scroll-smooth snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onMouseEnter={() => {
            // pause auto-scroll on hover — handled via CSS animation pause
          }}
        >
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4 }}
      >
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const card = scrollRef.current?.children[i] as HTMLElement;
              card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
            }}
            className="w-1.5 h-1.5 rounded-full bg-border hover:bg-accent transition-colors"
            aria-label={`Go to testimonial ${i + 1}`}
            data-hoverable
          />
        ))}
      </motion.div>
    </section>
  );
}
