"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function WhereIveWorked() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const companies = [
    {
      name: "Fox Corporation",
      logo: "/images/fox-logo-white.png",
    },
    {
      name: "Grayscale Investments",
      logo: "/images/grayscale-logo-white.png",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Where I've Worked
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-12 md:gap-20"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                y: -4,
                transition: { duration: 0.15, ease: "easeOut" }
              }}
              className="relative h-16 w-40 md:h-20 md:w-48 p-4"
            >
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className={`object-contain p-2 ${
                  company.name === "Fox Corporation"
                    ? "[filter:brightness(0)_invert(1)]"
                    : ""
                }`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
