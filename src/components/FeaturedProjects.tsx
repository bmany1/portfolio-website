"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import type { Project } from "@/sanity/queries";
import ProjectCard from "./ProjectCard";

interface FeaturedProjectsProps {
  projects: Project[];
  eyebrow?: string;
  sectionTitle?: string;
  description?: string;
  ctaText?: string;
}

export default function FeaturedProjects({
  projects,
  eyebrow = "SELECTED WORK",
  sectionTitle = "Featured Projects",
  description,
  ctaText = "View all projects",
}: FeaturedProjectsProps) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-white/50 tracking-wider">
            {eyebrow}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            {sectionTitle}
          </h2>
          {description && (
            <p className="text-white/60 max-w-2xl">{description}</p>
          )}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={i}
              viewportMargin="-100px"
              animationDelay={0.1}
              opacityDuration={0.6}
              tagAnimationDelay={0.4}
              includeScale={false}
            />
          ))}
        </div>

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors group font-medium"
          >
            <span>{ctaText}</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
