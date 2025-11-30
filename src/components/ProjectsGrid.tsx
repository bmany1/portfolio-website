"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import type { Project } from "@/sanity/queries";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function ProjectsGrid({
  projects,
  eyebrow = "PORTFOLIO",
  title = "All Projects",
  description = "A collection of product initiatives, redesigns, and launches spanning various industries and user needs.",
}: ProjectsGridProps) {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-white/40 tracking-wider">
            {eyebrow}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">{title}</h1>
          <p className="text-xl text-white/60 max-w-3xl">{description}</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={i}
              viewportMargin="-80px"
              animationDelay={0.08}
              opacityDuration={0.5}
              tagAnimationDelay={0.3}
              includeScale={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
