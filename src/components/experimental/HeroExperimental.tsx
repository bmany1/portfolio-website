"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextScramble from "./TextScramble";

gsap.registerPlugin(ScrollTrigger);

interface HeroExperimentalProps {
  heading?: string;
  tagline?: string;
  subheading?: string;
}

export default function HeroExperimental({
  heading = "Bryan Many",
  tagline = "Product Manager",
  subheading = "Building digital products that people love",
}: HeroExperimentalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms
  const headingY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const headingOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const taglineY = useTransform(smoothProgress, [0, 1], [0, -150]);
  const subheadingY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);

  // Animated line
  const lineWidth = useTransform(smoothProgress, [0, 0.3], ["0%", "100%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered character animation for heading
      if (headingRef.current) {
        const chars = headingRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          {
            y: 100,
            opacity: 0,
            rotateX: -90,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.03,
            duration: 1,
            ease: "power4.out",
            delay: 0.5,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split heading into words, then characters - words won't break mid-word
  const headingWords = heading.split(" ").map((word, wordIndex, wordsArray) => (
    <span key={wordIndex} className="inline-block whitespace-nowrap">
      {word.split("").map((char, charIndex) => (
        <span
          key={`${wordIndex}-${charIndex}`}
          className="char inline-block"
        >
          {char}
        </span>
      ))}
      {/* Add space between words (except after last word) */}
      {wordIndex < wordsArray.length - 1 && (
        <span className="inline-block">&nbsp;</span>
      )}
    </span>
  ));

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="content-wrapper relative z-10">
          {/* Top decorative elements */}
          <motion.div
            className="absolute -top-20 left-0 flex items-center gap-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
              Portfolio 2024
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            style={{ y: headingY, opacity: headingOpacity, scale }}
            className="relative"
          >
            {/* Tagline above name */}
            <motion.div
              style={{ y: taglineY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4"
            >
              <span className="font-mono text-sm text-[var(--accent-primary)] uppercase tracking-[0.3em]">
                <TextScramble text={tagline} delay={800} duration={1000} />
              </span>
            </motion.div>

            {/* Name with character animation */}
            <h1
              ref={headingRef}
              className="text-display text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.9] tracking-tight"
              style={{ perspective: "1000px" }}
            >
              {headingWords}
            </h1>

            {/* Animated underline */}
            <motion.div
              className="h-[2px] bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-transparent mt-6"
              style={{ width: lineWidth }}
            />

            {/* Subheading */}
            <motion.p
              style={{ y: subheadingY }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-xl md:text-2xl text-[var(--text-secondary)] mt-8 max-w-xl font-light"
            >
              {subheading}
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest">
              Scroll to explore
            </span>
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-[var(--accent-primary)] to-transparent"
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[var(--border-subtle)] opacity-50" />
          <div className="absolute bottom-20 left-0 w-24 h-24 border-b border-l border-[var(--border-subtle)] opacity-50" />
        </div>

        {/* Large background text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ opacity: useTransform(smoothProgress, [0, 0.3], [0.03, 0]) }}
        >
          <span className="text-[40vw] font-bold text-white whitespace-nowrap">
            PM
          </span>
        </motion.div>
      </div>
    </section>
  );
}
