// Centralized animation configuration for consistent motion across components
// Based on the existing patterns in the codebase

export const DURATION = {
  fast: 0.15, // Hover/tap feedback
  quick: 0.2, // Quick transitions
  normal: 0.3, // Standard animations
  medium: 0.4, // Medium transitions
  slow: 0.5, // Scroll reveals
  slower: 0.6, // Section reveals
  slowest: 0.8, // Hero/primary animations
} as const;

export const STAGGER = {
  fast: 0.05, // Tag animations
  normal: 0.1, // List items
  slow: 0.2, // Section content
} as const;

export const VIEWPORT = {
  once: true,
  margin: "-100px" as const,
  marginSmall: "-50px" as const,
} as const;

export const EASE = {
  out: "easeOut",
  default: [0.25, 0.1, 0.25, 1],
} as const;

// Common animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} as const;
