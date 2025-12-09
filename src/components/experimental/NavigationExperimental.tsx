"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function NavigationExperimental() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Hide on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }

    // Add background after scrolling
    setHasScrolled(latest > 50);
  });

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Main navigation bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav
          className={`px-6 md:px-12 py-4 transition-all duration-500 ${
            hasScrolled
              ? "bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]"
              : ""
          }`}
        >
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-50 flex items-center gap-3 group"
              data-cursor="hover"
            >
              <motion.div
                className="w-10 h-10 rounded-lg border border-[var(--accent-primary)] flex items-center justify-center"
                whileHover={{ scale: 1.05, borderColor: "var(--accent-secondary)" }}
              >
                <span className="font-mono text-lg font-bold text-[var(--accent-primary)] group-hover:text-[var(--accent-secondary)] transition-colors">
                  B
                </span>
              </motion.div>
              <span className="hidden md:block font-mono text-sm text-[var(--text-secondary)]">
                Bryan Many
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="relative font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-wider"
                  data-cursor="hover"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="text-[var(--accent-primary)] mr-1">0{i + 1}.</span>
                  {link.name}
                </motion.a>
              ))}
              <Link
                href="/contact"
                className="btn-primary text-xs py-2 px-4"
                data-cursor="hover"
              >
                <span>Get in Touch</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="relative z-50 md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsOpen(!isOpen)}
              data-cursor="hover"
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-px bg-[var(--text-primary)]"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 3 : 0,
                }}
              />
              <motion.span
                className="w-6 h-px bg-[var(--text-primary)]"
                animate={{
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? 10 : 0,
                }}
              />
              <motion.span
                className="w-6 h-px bg-[var(--text-primary)]"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -3 : 0,
                }}
              />
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[var(--bg-primary)]/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu content */}
            <div className="relative h-full flex flex-col items-center justify-center">
              <nav className="flex flex-col items-center gap-8">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-3xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setIsOpen(false)}
                    data-cursor="hover"
                  >
                    <span className="text-[var(--accent-primary)] font-mono text-lg mr-2">
                      0{i + 1}
                    </span>
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              {/* Social links at bottom */}
              <motion.div
                className="absolute bottom-12 flex gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {["LinkedIn", "GitHub", "Twitter"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-mono text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                    data-cursor="hover"
                  >
                    {social}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
