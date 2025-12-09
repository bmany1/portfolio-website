"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
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
