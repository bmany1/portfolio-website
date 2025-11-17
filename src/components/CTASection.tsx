"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

interface CTASectionProps {
  heading: string;
  subtext?: string;
  buttonText?: string;
}

export default function CTASection({
  heading,
  subtext,
  buttonText = "Get in Touch",
}: CTASectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {heading}
        </motion.h2>
        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-xl text-white/60 mb-8 max-w-2xl mx-auto"
          >
            {subtext}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/about"
            className="inline-block px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 hover:scale-105 transition-all duration-300"
          >
            {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
