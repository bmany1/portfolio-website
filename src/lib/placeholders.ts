import type { Project } from "@/sanity/queries";

/**
 * Placeholder projects shown when no content exists in Sanity CMS.
 * These serve as examples and fallbacks during initial setup.
 */
export const placeholderProjects: Project[] = [
  {
    _id: "placeholder-1",
    title: "E-Commerce Platform Redesign",
    slug: { current: "ecommerce-redesign" },
    description:
      "Led the complete redesign of a multi-million dollar e-commerce platform, improving conversion rates by 40%.",
    technologies: ["Product Strategy", "UX Design", "A/B Testing"],
    featured: true,
    order: 1,
  },
  {
    _id: "placeholder-2",
    title: "Mobile App Launch",
    slug: { current: "mobile-app" },
    description:
      "Spearheaded the development and launch of a mobile-first experience, reaching 100K users in the first month.",
    technologies: ["Mobile", "User Research", "Agile"],
    featured: true,
    order: 2,
  },
  {
    _id: "placeholder-3",
    title: "Analytics Dashboard",
    slug: { current: "analytics-dashboard" },
    description:
      "Designed and shipped a comprehensive analytics dashboard for enterprise clients, enabling data-driven decision making.",
    technologies: ["Data Visualization", "Enterprise", "SaaS"],
    featured: false,
    order: 3,
  },
  {
    _id: "placeholder-4",
    title: "Design System 2.0",
    slug: { current: "design-system" },
    description:
      "Built a scalable design system from the ground up, reducing design-to-development time by 60%.",
    technologies: ["Design Systems", "Component Library", "Documentation"],
    featured: false,
    order: 4,
  },
  {
    _id: "placeholder-5",
    title: "Payment Integration",
    slug: { current: "payment-integration" },
    description:
      "Implemented a seamless payment flow that increased transaction completion rates by 25%.",
    technologies: ["FinTech", "Payments", "Security"],
    featured: false,
    order: 5,
  },
  {
    _id: "placeholder-6",
    title: "Onboarding Flow Optimization",
    slug: { current: "onboarding-flow" },
    description:
      "Redesigned user onboarding experience, reducing drop-off rates from 45% to 12%.",
    technologies: ["User Experience", "Conversion Optimization", "Research"],
    featured: false,
    order: 6,
  },
];

/**
 * Get featured placeholder projects only (for homepage)
 */
export const featuredPlaceholderProjects = placeholderProjects.filter(
  (p) => p.featured
);
