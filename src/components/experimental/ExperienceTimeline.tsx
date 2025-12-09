"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import TextScramble from "./TextScramble";

interface Company {
  name: string;
  role?: string;
  period?: string;
  logo?: {
    asset: {
      url?: string;
    };
  };
}

interface ExperienceTimelineProps {
  companies?: Company[];
  sectionTitle?: string;
}

const defaultCompanies: Company[] = [
  { name: "Company One", role: "Senior Product Manager", period: "2022 - Present" },
  { name: "Company Two", role: "Product Manager", period: "2020 - 2022" },
  { name: "Company Three", role: "Associate PM", period: "2018 - 2020" },
  { name: "Company Four", role: "Product Analyst", period: "2016 - 2018" },
];

export default function ExperienceTimeline({
  companies = defaultCompanies,
  sectionTitle = "Where I've Worked",
}: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-secondary)]/30 to-transparent" />

      <div className="content-wrapper relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="font-mono text-sm text-[var(--accent-primary)] uppercase tracking-[0.3em] mb-4 block">
            <TextScramble text="03 / Experience" delay={200} />
          </span>
          <h2 className="text-display text-4xl md:text-6xl lg:text-7xl font-bold">
            {sectionTitle}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-subtle)]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-16">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-primary)]"
                    whileInView={{
                      scale: [1, 1.5, 1],
                      borderColor: ["var(--accent-primary)", "var(--accent-secondary)", "var(--accent-primary)"],
                    }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                  />
                </div>

                {/* Content card */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] transition-all duration-300 group"
                    whileHover={{ y: -4 }}
                  >
                    {/* Period badge */}
                    {company.period && (
                      <span className="inline-block px-3 py-1 mb-4 font-mono text-xs text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 rounded-full">
                        {company.period}
                      </span>
                    )}

                    <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--accent-primary)] transition-colors">
                      {company.name}
                    </h3>

                    {company.role && (
                      <p className="text-[var(--text-secondary)] font-mono text-sm">
                        {company.role}
                      </p>
                    )}

                    {/* Decorative element */}
                    <div className="mt-4 flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-1 rounded-full bg-[var(--accent-primary)]/20"
                          style={{ width: `${20 + Math.random() * 30}px` }}
                          whileInView={{
                            backgroundColor: "rgba(0, 240, 255, 0.4)",
                          }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <a
            href="/about"
            className="inline-flex items-center gap-2 text-[var(--accent-primary)] font-mono text-sm uppercase tracking-wider hover:text-[var(--accent-secondary)] transition-colors"
            data-cursor="hover"
          >
            <span>View Full Resume</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
