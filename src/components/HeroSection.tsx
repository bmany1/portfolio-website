"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  heading: string;
  bio: string;
  headshotImage?: {
    asset: {
      url?: string;
    };
  };
  resumeFile?: {
    asset: {
      url?: string;
    };
  };
  resumeLinkText?: string;
}

export default function HeroSection({
  heading,
  bio,
  headshotImage,
  resumeFile,
  resumeLinkText = "View Resume",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {heading.split(", ").map((part, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="text-accent">
                    {part}
                  </span>
                ) : (
                  <span key={i}>
                    {part}
                    {", "}
                  </span>
                )
              )}
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed max-w-2xl">
              {bio}
            </p>
            {resumeFile?.asset?.url && (
              <Link
                href={resumeFile.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-medium group"
              >
                <span>{resumeLinkText}</span>
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </Link>
            )}
          </motion.div>

          {/* Right side - Headshot */}
          {headshotImage?.asset?.url && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src={headshotImage.asset.url}
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
