"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import type { Project } from "@/sanity/queries";
import { getCardImageUrl } from "@/lib/sanity-image";

interface ProjectCardProps {
  project: Project;
  index: number;
  viewportMargin?: string;
  animationDelay?: number;
  opacityDuration?: number;
  tagAnimationDelay?: number;
  includeScale?: boolean;
}

export default function ProjectCard({
  project,
  index,
  viewportMargin = "-100px",
  animationDelay = 0.1,
  opacityDuration = 0.6,
  tagAnimationDelay = 0.4,
  includeScale = false,
}: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: viewportMargin as `${number}px` });

  const imageSource = project.cardImage || project.mainImage;

  return (
    <Link href={`/projects/${project.slug.current}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{
          opacity: {
            duration: opacityDuration,
            delay: index * animationDelay,
            ease: "easeOut",
          },
          y: { duration: 0.15, ease: "easeOut" },
          ...(includeScale && { scale: { duration: 0.15, ease: "easeOut" } }),
        }}
        whileHover={includeScale ? { y: -8, scale: 1.01 } : { y: -8 }}
        className="group border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 cursor-pointer"
      >
        {/* Project Image */}
        <div className="aspect-[16/10] bg-gradient-to-br from-white/5 to-white/[0.02] relative overflow-hidden">
          {imageSource ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              src={getCardImageUrl(imageSource, 1600)}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
          )}
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
                    isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: tagAnimationDelay + tagIndex * 0.05,
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
    </Link>
  );
}
