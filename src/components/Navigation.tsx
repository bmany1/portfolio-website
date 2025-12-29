"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  // Skip navigation for Sanity Studio
  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-accent focus:text-black focus:rounded-lg focus:font-medium focus:outline-none"
      >
        Skip to main content
      </a>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-white/10"
        aria-label="Main navigation"
      >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-semibold hover:text-white/70 transition-colors relative group"
          >
            Bryan Many
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] bg-white/40"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          <div className="flex gap-8">
            <NavLink href="/projects" isActive={isActive("/projects")}>
              Projects
            </NavLink>
            <NavLink href="/about" isActive={isActive("/about")}>
              About
            </NavLink>
            <NavLink href="/contact" isActive={isActive("/contact")}>
              Contact
            </NavLink>
          </div>
        </div>
      </div>
      </motion.nav>
    </>
  );
}

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link href={href} className="relative group">
      <motion.span
        className="relative z-10 hover:text-white/70 transition-colors"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute -bottom-1 left-0 h-[2px] bg-white/60"
        initial={{ width: isActive ? "100%" : 0 }}
        animate={{ width: isActive ? "100%" : 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}
