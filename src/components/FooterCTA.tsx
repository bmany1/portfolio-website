"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

interface FooterCTAProps {
  text?: string;
  linkText?: string;
  href?: string;
}

export default function FooterCTA({
  text = "Have a project in mind?",
  linkText = "Get in Touch",
  href = "/contact",
}: FooterCTAProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t border-white/10 py-16 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <p className="text-white/60 text-lg">{text}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group"
        >
          {linkText}
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
