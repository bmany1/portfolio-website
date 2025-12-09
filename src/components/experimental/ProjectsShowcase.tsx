"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import TextScramble from "./TextScramble";

interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  technologies?: string[];
  cardImage?: {
    asset: {
      url?: string;
    };
  };
}

interface ProjectsShowcaseProps {
  projects: Project[];
  sectionTitle?: string;
}

export default function ProjectsShowcase({
  projects,
  sectionTitle = "Featured Work",
}: ProjectsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Moving background text */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
        style={{ x: backgroundX }}
      >
        <span className="text-[20vw] font-bold text-white/[0.02] uppercase tracking-wider">
          Projects • Work • Portfolio •
        </span>
      </motion.div>

      <div className="content-wrapper relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="font-mono text-sm text-[var(--accent-primary)] uppercase tracking-[0.3em] mb-4 block">
              <TextScramble text="02 / Projects" delay={200} />
            </span>
            <h2 className="text-display text-4xl md:text-6xl lg:text-7xl font-bold">
              {sectionTitle}
            </h2>
          </div>
          <Link
            href="/projects"
            className="btn-primary self-start md:self-auto"
            data-cursor="hover"
          >
            <span>View All Projects</span>
            <span>→</span>
          </Link>
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-8">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={`/projects/${project.slug.current}`}>
                <div
                  className="group relative p-8 md:p-12 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm transition-all duration-500 hover:border-[var(--border-accent)] hover:bg-[var(--bg-secondary)]"
                  data-cursor="hover"
                >
                  <div className="grid md:grid-cols-[1fr,400px] gap-8 items-center">
                    {/* Content */}
                    <div>
                      {/* Project number */}
                      <span className="font-mono text-6xl md:text-8xl font-bold text-[var(--bg-tertiary)] absolute top-4 right-4 md:top-8 md:right-8 group-hover:text-[var(--accent-primary)]/10 transition-colors duration-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="text-2xl md:text-4xl font-bold mb-4 group-hover:text-[var(--accent-primary)] transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-[var(--text-secondary)] text-lg mb-6 max-w-xl">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm font-mono rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] group-hover:border-[var(--accent-primary)]/30 group-hover:text-[var(--accent-primary)] transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* View project link */}
                      <motion.div
                        className="mt-8 flex items-center gap-2 text-[var(--accent-primary)] font-mono text-sm uppercase tracking-wider"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0, x: hoveredIndex === index ? 0 : -10 }}
                      >
                        <span>View Project</span>
                        <motion.span
                          animate={{ x: hoveredIndex === index ? [0, 5, 0] : 0 }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>

                    {/* Image */}
                    {project.cardImage?.asset?.url && (
                      <div className="relative aspect-video rounded-xl overflow-hidden">
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            scale: hoveredIndex === index ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          <Image
                            src={project.cardImage.asset.url}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent opacity-40" />
                      </div>
                    )}
                  </div>

                  {/* Animated border on hover */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-[var(--accent-primary)] pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
