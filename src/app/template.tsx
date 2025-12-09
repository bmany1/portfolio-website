"use client";

import { useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  // Use useLayoutEffect for synchronous scroll before paint
  // Falls back to useEffect for SSR compatibility
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Immediate scroll attempt
    window.scrollTo(0, 0);

    // Chrome iOS has aggressive scroll restoration that fires after initial paint.
    // Use requestAnimationFrame to scroll after browser's restoration completes.
    const scrollToTop = () => window.scrollTo(0, 0);

    // First rAF: scheduled for next frame
    const raf1 = requestAnimationFrame(() => {
      scrollToTop();
      // Second rAF: ensures we're after any browser restoration
      requestAnimationFrame(scrollToTop);
    });

    // Fallback timeout for stubborn Chrome iOS edge cases (form pages, etc.)
    const timeout = setTimeout(scrollToTop, 100);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
