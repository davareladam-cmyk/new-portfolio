"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import { ExternalLink, GitFork } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import { Tag } from "@/components/ui/Tag";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

type Category = "all" | "web" | "mobile" | "design";

const FILTERS: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Design", value: "design" },
];

const PROJECT_GRADIENTS = [
  "from-accent/20 to-cyan-500/10",
  "from-purple-500/20 to-accent/10",
  "from-cyan-500/20 to-blue-500/10",
  "from-orange-500/20 to-accent/10",
  "from-pink-500/20 to-purple-500/10",
  "from-accent/10 to-emerald-500/20",
];

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  if (featured) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="col-span-full group relative bg-surface border border-border overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ transform: hovered ? "translateY(-8px)" : "translateY(0)", transition: "transform 0.3s ease" }}
      >
        {/* Accent sweep line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent transition-all duration-500"
          style={{ height: hovered ? "100%" : "0%" }}
        />

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image placeholder */}
          <div className={`relative aspect-video lg:aspect-auto bg-gradient-to-br ${PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length]} overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-xs text-text-muted mb-2">[ Featured Project ]</div>
                <div className="font-display text-2xl font-bold text-text-primary">{project.title}</div>
              </div>
            </div>
            <div
              className="absolute inset-0 bg-accent/5 transition-opacity duration-300"
              style={{ opacity: hovered ? 1 : 0 }}
            />
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-mono text-accent uppercase tracking-widest">Featured</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <h3 className="font-display text-3xl font-bold mb-4 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-text-muted leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                  data-hoverable
                >
                  <ExternalLink size={16} />
                  Live Site
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                  data-hoverable
                >
                  <GitFork size={16} />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-surface border border-border overflow-hidden flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ transform: hovered ? "translateY(-8px)" : "translateY(0)", transition: "transform 0.3s ease, box-shadow 0.3s ease", boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.3)" : "none" }}
    >
      {/* Accent sweep line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent transition-all duration-500"
        style={{ height: hovered ? "100%" : "0%" }}
      />

      {/* Image */}
      <div className={`relative aspect-video bg-gradient-to-br ${PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length]} overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs text-text-muted">{project.title}</span>
        </div>
        <div
          className="absolute inset-0 bg-accent/5 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.slice(0, 3).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
          {project.stack.length > 3 && (
            <Tag>+{project.stack.length - 3}</Tag>
          )}
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors"
              data-hoverable
            >
              <ExternalLink size={14} />
              Live
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-muted hover:text-accent transition-colors"
              data-hoverable
            >
              <GitFork size={14} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filtered = PROJECTS.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );
  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section id="work" className="py-24 sm:py-32 border-t border-border" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="section-label mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          03 — Work
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.h2
            className="font-display text-4xl sm:text-5xl font-bold max-w-sm"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
          >
            Selected{" "}
            <span className="text-accent">Projects</span>
          </motion.h2>

          <motion.div
            className="flex items-center gap-1"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  activeFilter === f.value
                    ? "bg-accent text-bg"
                    : "text-text-muted hover:text-text-primary border border-transparent hover:border-border"
                }`}
                data-hoverable
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        <LayoutGroup>
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {featured && (
                <ProjectCard
                  key={featured.id}
                  project={featured}
                  index={0}
                  featured
                />
              )}
              {rest.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i + 1}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
