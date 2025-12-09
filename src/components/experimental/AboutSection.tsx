"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import TextScramble from "./TextScramble";

interface Skill {
  name: string;
  level: number;
}

interface AboutSectionProps {
  bio?: string;
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  { name: "Product Strategy", level: 95 },
  { name: "User Research", level: 90 },
  { name: "Data Analysis", level: 85 },
  { name: "Technical Leadership", level: 88 },
  { name: "Agile / Scrum", level: 92 },
  { name: "Stakeholder Management", level: 90 },
];

export default function AboutSection({
  bio = "I'm a product manager passionate about building digital experiences that make a difference. With a background spanning startups and enterprise, I bridge the gap between user needs and business goals.",
  skills = defaultSkills,
}: AboutSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background decorative element */}
      <motion.div
        className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full"
        style={{
          y: backgroundY,
          background: "radial-gradient(circle, rgba(255, 51, 102, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="content-wrapper relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="font-mono text-sm text-[var(--accent-primary)] uppercase tracking-[0.3em] mb-4 block">
            <TextScramble text="01 / About" delay={200} />
          </span>
          <h2 className="text-display text-4xl md:text-6xl lg:text-7xl font-bold">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Bio section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed mb-8">
              {bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              {[
                { value: "8+", label: "Years Experience" },
                { value: "50+", label: "Products Shipped" },
                { value: "10M+", label: "Users Impacted" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[var(--accent-primary)] font-mono">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-muted)] mt-2 font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-mono text-sm text-[var(--text-muted)] uppercase tracking-[0.2em] mb-8">
              Core Competencies
            </h3>

            <div className="space-y-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="font-mono text-sm text-[var(--accent-primary)]">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)`,
                      }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.7 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Terminal-style info card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-12 p-6 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[var(--accent-secondary)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--accent-tertiary)]" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <pre className="font-mono text-sm text-[var(--text-secondary)] overflow-x-auto">
                <code>
{`$ whoami
> product_manager

$ cat interests.txt
> Building products
> Learning to code
> Solving complex problems

$ echo $STATUS
> Open to opportunities`}
                </code>
              </pre>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
