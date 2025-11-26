"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WhatIDoColumn {
  title: string;
  description: string;
  items: string[];
}

interface WhatIDoSectionProps {
  columns: WhatIDoColumn[];
}

export default function WhatIDoSection({ columns }: WhatIDoSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {columns.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold">
                {column.title}
              </h3>
              <p className="text-foreground/60 leading-relaxed">
                {column.description}
              </p>
              <ul className="space-y-3">
                {column.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1 + itemIndex * 0.1 + 0.3,
                    }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-accent flex-shrink-0 leading-none mt-[3px]">•</span>
                    <span className="text-foreground/80 font-medium">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
