"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import type { Project } from "@/sanity/queries";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
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
            PORTFOLIO
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            All Projects
          </h1>
          <p className="text-xl text-white/60 max-w-3xl">
            A collection of product initiatives, redesigns, and launches
            spanning various industries and user needs.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project._id || i} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.08, ease: "easeOut" },
        y: { duration: 0.15, ease: "easeOut" },
        scale: { duration: 0.15, ease: "easeOut" },
      }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 cursor-pointer"
    >
      {/* Project Image */}
      <div className="aspect-[16/10] bg-gradient-to-br from-white/5 to-white/[0.02] relative overflow-hidden">
        {project.mainImage?.asset?.url ? (
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            src={project.mainImage.asset.url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Info */}
      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-3 group-hover:text-white/80 transition-colors">
          {project.title}
        </h3>
        <p className="text-white/60 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tag, tagIndex) => (
              <motion.span
                key={tagIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: 0.3,
                  delay: 0.3 + tagIndex * 0.05,
                }}
                className="text-xs font-mono text-white/40 px-3 py-1 border border-white/10 rounded-full hover:border-white/30 hover:text-white/60 transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
