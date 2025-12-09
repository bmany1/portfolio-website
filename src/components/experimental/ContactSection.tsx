"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import TextScramble from "./TextScramble";

interface ContactSectionProps {
  email?: string;
  heading?: string;
  subtext?: string;
}

export default function ContactSection({
  email = "hello@bryanmany.com",
  heading = "Let's Build Something Together",
  subtext = "Have a project in mind? I'm always open to discussing new opportunities and ideas.",
}: ContactSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentTime, setCurrentTime] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isInView) {
      const lines = [
        "$ initializing connection...",
        "$ loading contact module...",
        "$ connection established",
        "$ ready for collaboration",
      ];

      lines.forEach((line, i) => {
        setTimeout(() => {
          setTerminalLines((prev) => [...prev, line]);
        }, 500 + i * 400);
      });
    }
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-secondary)]/20 to-transparent" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--accent-primary)]/5 blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--accent-secondary)]/5 blur-[100px]" />

      <div className="content-wrapper relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-sm text-[var(--accent-primary)] uppercase tracking-[0.3em] mb-4 block">
            <TextScramble text="04 / Contact" delay={200} />
          </span>
          <h2 className="text-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            {heading}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {subtext}
          </p>
        </motion.div>

        {/* Terminal-style contact card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] overflow-hidden shadow-2xl">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[var(--accent-secondary)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--accent-tertiary)]" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                contact@terminal ~ {currentTime}
              </span>
              <div className="w-16" />
            </div>

            {/* Terminal content */}
            <div className="p-8 font-mono">
              {/* Animated terminal lines */}
              <div className="space-y-2 mb-8 text-sm text-[var(--text-muted)]">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={line.includes("ready") ? "text-green-400" : ""}
                  >
                    {line}
                    {i === terminalLines.length - 1 && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="ml-1"
                      >
                        █
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Email display */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 2.5 }}
                className="mb-8"
              >
                <div className="text-[var(--text-muted)] mb-2">$ echo $EMAIL</div>
                <a
                  href={`mailto:${email}`}
                  className="text-3xl md:text-5xl font-bold text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors break-all"
                  data-cursor="hover"
                >
                  {email}
                </a>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 3 }}
              >
                <div className="text-[var(--text-muted)] mb-4">$ cat social_links.json</div>
                <div className="flex flex-wrap gap-4">
                  {[
                    { name: "LinkedIn", url: "https://linkedin.com" },
                    { name: "GitHub", url: "https://github.com" },
                    { name: "Twitter", url: "https://twitter.com" },
                  ].map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all duration-300"
                      data-cursor="hover"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 3.5 }}
          className="text-center mt-12"
        >
          <Link href="/contact" className="btn-primary" data-cursor="hover">
            <span>Send a Message</span>
            <span>→</span>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 4 }}
          className="mt-32 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]"
        >
          <div className="font-mono">
            © {new Date().getFullYear()} Bryan Many. All rights reserved.
          </div>
          <div className="font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>System Status: Online</span>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
