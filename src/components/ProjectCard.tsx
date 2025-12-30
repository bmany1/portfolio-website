"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useLayoutEffect, useMemo, useCallback, useEffect } from "react";

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
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: viewportMargin as `${number}px` });

  const [visibleTagCount, setVisibleTagCount] = useState<number | null>(null);
  const technologies = useMemo(() => project.technologies || [], [project.technologies]);
  const hiddenTagCount = visibleTagCount !== null ? technologies.length - visibleTagCount : 0;

  // Calculate how many tags fit in one row
  const calculateVisibleTags = useCallback(() => {
    if (!tagsContainerRef.current || technologies.length === 0) {
      setVisibleTagCount(technologies.length);
      return;
    }

    const container = tagsContainerRef.current;
    const containerWidth = container.offsetWidth;
    const gap = 8; // gap-2 = 8px
    const moreIndicatorWidth = 85; // Width for "+N more" indicator

    // Measure each tag's width
    const tagElements = container.querySelectorAll('[data-tag]');
    const tagWidths: number[] = [];

    tagElements.forEach((tag) => {
      tagWidths.push((tag as HTMLElement).offsetWidth);
    });

    // Calculate total width if all tags were shown
    const totalAllTagsWidth = tagWidths.reduce((sum, w, i) => sum + w + (i > 0 ? gap : 0), 0);

    // If all tags fit, show them all
    if (totalAllTagsWidth <= containerWidth) {
      setVisibleTagCount(technologies.length);
      return;
    }

    // Otherwise, find how many tags fit WITH the indicator
    let totalWidth = 0;
    let count = 0;
    const spaceForIndicator = moreIndicatorWidth + gap;

    for (let i = 0; i < tagWidths.length; i++) {
      const tagWidth = tagWidths[i];
      const widthWithGap = i === 0 ? tagWidth : tagWidth + gap;

      // Check if this tag fits, leaving room for the indicator
      if (totalWidth + widthWithGap + spaceForIndicator <= containerWidth) {
        totalWidth += widthWithGap;
        count++;
      } else {
        // This tag doesn't fit, stop here
        break;
      }
    }

    // Ensure at least 1 tag is shown if there are any
    setVisibleTagCount(Math.max(1, count));
  }, [technologies]);

  // Initial calculation - useLayoutEffect + setState is the correct pattern for
  // DOM measurement before paint. See: https://react.dev/reference/react/useLayoutEffect
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    calculateVisibleTags();
  }, [calculateVisibleTags]);

  // Recalculate on window resize (only when width changes)
  // iOS browsers trigger resize events during scroll when the browser chrome animates
  // (address bar hiding/showing), but these only change height, not width.
  // We only need to recalculate tags when the actual width changes.
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;

      // Only recalculate if width actually changed
      // Ignore height-only changes (iOS scroll-triggered browser chrome animations)
      if (currentWidth === lastWidth) {
        return;
      }

      lastWidth = currentWidth;

      // Debounce resize events
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Reset to null to force re-measurement with all tags visible
        setVisibleTagCount(null);
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
          calculateVisibleTags();
        });
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [calculateVisibleTags]);

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
        <div className="p-8 min-h-[244px] flex flex-col">
          <h3 className="text-2xl font-semibold mb-3 group-hover:text-white/80 transition-colors">
            {project.title}
          </h3>
          <p className="text-white/60 mb-6 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tags - Single row with smart truncation */}
          {technologies.length > 0 && (
            <div ref={tagsContainerRef} className="flex gap-2 mt-auto overflow-hidden">
              {technologies.map((tag, tagIndex) => {
                // During initial render, show all tags for measurement
                // After measurement, only show visible tags
                const shouldShow = visibleTagCount === null || tagIndex < visibleTagCount;

                return (
                  <motion.span
                    key={tagIndex}
                    data-tag
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isInView && shouldShow
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{
                      duration: 0.3,
                      delay: tagAnimationDelay + tagIndex * 0.05,
                    }}
                    className={`text-xs font-mono text-white/50 px-3 py-1 border border-white/10 rounded-full hover:border-white/30 hover:text-white/70 transition-colors whitespace-nowrap ${
                      !shouldShow ? "hidden" : ""
                    }`}
                  >
                    {tag}
                  </motion.span>
                );
              })}

              {/* "+N more" indicator */}
              {hiddenTagCount > 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    duration: 0.3,
                    delay: tagAnimationDelay + (visibleTagCount || 0) * 0.05,
                  }}
                  className="text-xs font-mono text-amber-400/70 px-3 py-1 border border-amber-400/30 rounded-full whitespace-nowrap flex-shrink-0"
                >
                  +{hiddenTagCount} more
                </motion.span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
