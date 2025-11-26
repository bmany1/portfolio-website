"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ProjectDetail, ProjectNavigation, PortableTextBlock } from "@/sanity/queries";
import { getHeroImageUrl, getOptimizedImageUrl } from "@/lib/sanity-image";

interface ProjectDetailContentProps {
  project: ProjectDetail;
  navigation: ProjectNavigation;
}

// Custom components for PortableText
const portableTextComponents = {
  types: {
    image: ({ value }: { value: { asset?: { _ref?: string }; alt?: string } }) => {
      if (!value?.asset) return null;
      const imageUrl = getOptimizedImageUrl(value, 1200);
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || "Project image"}
            width={1200}
            height={800}
            className="rounded-lg w-full"
          />
        </div>
      );
    },
    video: ({
      value,
    }: {
      value: {
        videoFile?: { asset?: { url?: string } };
        caption?: string;
        posterImage?: { asset?: { _ref?: string } };
      };
    }) => {
      if (!value?.videoFile?.asset?.url) return null;

      const posterUrl = value.posterImage
        ? getOptimizedImageUrl(value.posterImage, 1920)
        : undefined;

      return (
        <div className="my-8">
          <video
            controls
            className="w-full rounded-lg"
            poster={posterUrl}
            preload="metadata"
          >
            <source src={value.videoFile.asset.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {value.caption && (
            <p className="text-white/60 text-sm mt-2 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-white/80 text-lg leading-relaxed mb-4">{children}</p>
    ),
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl font-bold text-white mt-12 mb-6">{children}</h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h3>
    ),
  },
};

export default function ProjectDetailContent({
  project,
  navigation,
}: ProjectDetailContentProps) {
  return (
    <div className="min-h-screen pt-20 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back to Projects */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero Image */}
        {project.mainImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <Image
              src={getHeroImageUrl(project.mainImage, 1920)}
              alt={project.title}
              width={1920}
              height={1080}
              className="rounded-lg w-full"
              priority
            />
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {project.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-white/70 text-lg md:text-xl mb-6"
        >
          {project.description}
        </motion.p>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        )}

        {/* CTA Buttons */}
        {(project.projectUrl || project.githubUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </a>
            )}
          </motion.div>
        )}

        {/* Content (PortableText) */}
        {project.content && project.content.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-16"
          >
            <PortableText
              value={project.content as PortableTextBlock[]}
              components={portableTextComponents}
            />
          </motion.div>
        )}

        {/* Prev/Next Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="border-t border-white/10 pt-8 mt-8"
        >
          <div className="flex justify-between items-center">
            {navigation.previous ? (
              <Link
                href={`/projects/${navigation.previous.slug.current}`}
                className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <div className="text-left">
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    Previous
                  </p>
                  <p className="text-sm">{navigation.previous.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {navigation.next ? (
              <Link
                href={`/projects/${navigation.next.slug.current}`}
                className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <div className="text-right">
                  <p className="text-xs text-white/40 uppercase tracking-wider">
                    Next
                  </p>
                  <p className="text-sm">{navigation.next.title}</p>
                </div>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
