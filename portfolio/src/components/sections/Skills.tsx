"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "@/lib/constants";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const SKILL_LEVELS: Record<string, number> = {
  TypeScript: 95,
  JavaScript: 98,
  Python: 80,
  Go: 65,
  Rust: 50,
  SQL: 85,
  "Next.js": 95,
  React: 95,
  "React Native": 80,
  "Node.js": 88,
  Express: 82,
  "Tailwind CSS": 92,
  Figma: 88,
  Docker: 75,
  Vercel: 90,
  AWS: 70,
  Git: 95,
  PostgreSQL: 82,
  "Motion Design": 78,
  "Design Systems": 85,
  Prototyping: 80,
  "User Research": 72,
  Accessibility: 88,
};

const CATEGORY_LABELS: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools",
  design: "Design",
};

const ROTATIONS = [-2, 1, -1, 2, -1.5, 1.5, -0.5, 2, -2, 1, -1, 0.5];

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span
          className="text-sm font-mono text-text-muted group-hover:text-text-primary transition-colors"
          style={{ transform: `rotate(${ROTATIONS[index % ROTATIONS.length]}deg)`, display: "inline-block" }}
        >
          {name}
        </span>
        <span className="text-xs font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          {level}%
        </span>
      </div>
      <div className="h-px bg-border overflow-hidden">
        <motion.div
          className="h-full bg-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: level / 100 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const categories = Object.entries(SKILLS) as [keyof typeof SKILLS, string[]][];

  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-border" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="section-label mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          02 — Skills & Stack
        </motion.div>

        <motion.h2
          className="font-display text-4xl sm:text-5xl font-bold mb-16 max-w-xl"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          Tools I use to{" "}
          <span className="text-accent">build</span> things
        </motion.h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {categories.map(([category, skills]) => (
            <motion.div key={category} variants={staggerItem}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  {CATEGORY_LABELS[category]}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="space-y-5">
                {skills.map((skill, i) => (
                  <SkillBar
                    key={skill}
                    name={skill}
                    level={SKILL_LEVELS[skill] ?? 75}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
