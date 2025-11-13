"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WhatIDoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const sections = [
    {
      title: "What I Do",
      description:
        "Crafting the perfect user experience is my top priority. But I also do these as well.",
      items: [
        "Scale Products",
        "Web and Mobile App Development",
        "Build Amazing Teams",
      ],
    },
    {
      title: "What I Use",
      description:
        "Every Product Manager needs the right tools to do the perfect job.",
      items: ["JIRA", "Figma", "Heap"],
    },
    {
      title: "What You Can Expect",
      description:
        "I create products that are more than shiny. I make them shippable, usable, and scale.",
      items: ["Data-Driven", "Customer Centric", "Creative"],
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold">
                {section.title}
              </h3>
              <p className="text-foreground/60 leading-relaxed">
                {section.description}
              </p>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
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
                    <span className="text-accent mt-1.5 flex-shrink-0">•</span>
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
