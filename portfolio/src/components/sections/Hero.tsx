"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PERSONAL } from "@/lib/constants";

const roles = PERSONAL.role;

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
  } as const;

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-grid overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-cyan-500/5 animate-gradient" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="font-mono text-sm text-text-muted mb-4">
          Hello, I&apos;m
        </motion.p>

        <motion.h1 variants={itemVariants} className="font-display">
          <span className="block text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight">
            {PERSONAL.firstName}
          </span>
          <span className="block text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight ml-8 sm:ml-12 lg:ml-24">
            {PERSONAL.lastName}
          </span>
        </motion.h1>

        <motion.div variants={itemVariants} className="mt-6 h-10 sm:h-12 overflow-hidden">
          {roles.map((role, i) => (
            <span
              key={role}
              className={`block text-lg sm:text-xl text-text-muted font-mono transition-all duration-500 ${
                i === currentRole ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
              }`}
              style={{
                position: i === currentRole ? "relative" : "absolute",
              }}
            >
              {role}
            </span>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8">
          <Button as="a" href="#work" variant="primary">
            View Work
          </Button>
          <Button as="a" href="/cv.pdf" variant="ghost" target="_blank">
            Download CV
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-y"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <ArrowDown className="text-text-muted w-6 h-6" />
      </motion.div>
    </section>
  );
}
