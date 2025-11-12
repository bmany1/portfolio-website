"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative min-h-[calc(100vh-5rem)] flex items-center px-6 overflow-hidden"
    >
      {/* Background gradient accent with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"
      />

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto w-full relative z-10"
      >
        <div className="max-w-4xl">
          {/* Small label with fade in */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block mb-6"
          >
            <span className="text-sm font-mono text-white/40 tracking-wider">
              PRODUCT MANAGER
            </span>
          </motion.div>

          {/* Main headline with staggered animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-bold mb-8 leading-[0.95] tracking-tight"
          >
            Building Modern
            <br />
            <span className="text-white/40">Experiences</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed"
          >
            Creating seamless digital products that combine design excellence
            with technical innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/projects"
              className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 hover:scale-105 transition-all duration-300"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:border-white/40 hover:scale-105 transition-all duration-300"
            >
              About Me
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator with animation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs font-mono tracking-wider">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
