import { useRef } from "react";
import { useInView } from "framer-motion";
import { VIEWPORT } from "@/lib/animation-config";

interface UseScrollRevealOptions {
  margin?: string;
  once?: boolean;
}

/**
 * Hook for scroll-triggered reveal animations.
 * Returns a ref to attach to the element and a boolean indicating if it's in view.
 *
 * @example
 * const { ref, isInView } = useScrollReveal();
 * <motion.div ref={ref} animate={{ opacity: isInView ? 1 : 0 }} />
 */
export function useScrollReveal(options?: UseScrollRevealOptions) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? VIEWPORT.once,
    margin: (options?.margin ?? VIEWPORT.margin) as `${number}px`,
  });

  return { ref, isInView };
}
