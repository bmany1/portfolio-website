import ProjectsGrid from "@/components/ProjectsGrid";
import {
  getProjectsPageSettings,
  getProjects,
  type Project,
} from "@/sanity/queries";

export default async function ProjectsPage() {
  // Fetch projects page settings and all projects from Sanity
  const [pageSettings, sanityProjects] = await Promise.all([
    getProjectsPageSettings(),
    getProjects(),
  ]);

  // Fallback placeholder projects if none exist in Sanity yet
  const placeholderProjects: Project[] = [
    {
      _id: "placeholder-1",
      title: "E-Commerce Platform Redesign",
      slug: { current: "ecommerce-redesign" },
      description: "Led the complete redesign of a multi-million dollar e-commerce platform, improving conversion rates by 40%.",
      technologies: ["Product Strategy", "UX Design", "A/B Testing"],
      featured: true,
      order: 1,
    },
    {
      _id: "placeholder-2",
      title: "Mobile App Launch",
      slug: { current: "mobile-app" },
      description: "Spearheaded the development and launch of a mobile-first experience, reaching 100K users in the first month.",
      technologies: ["Mobile", "User Research", "Agile"],
      featured: false,
      order: 2,
    },
    {
      _id: "placeholder-3",
      title: "Analytics Dashboard",
      slug: { current: "analytics-dashboard" },
      description: "Designed and shipped a comprehensive analytics dashboard for enterprise clients, enabling data-driven decision making.",
      technologies: ["Data Visualization", "Enterprise", "SaaS"],
      featured: false,
      order: 3,
    },
    {
      _id: "placeholder-4",
      title: "Design System 2.0",
      slug: { current: "design-system" },
      description: "Built a scalable design system from the ground up, reducing design-to-development time by 60%.",
      technologies: ["Design Systems", "Component Library", "Documentation"],
      featured: false,
      order: 4,
    },
    {
      _id: "placeholder-5",
      title: "Payment Integration",
      slug: { current: "payment-integration" },
      description: "Implemented a seamless payment flow that increased transaction completion rates by 25%.",
      technologies: ["FinTech", "Payments", "Security"],
      featured: false,
      order: 5,
    },
    {
      _id: "placeholder-6",
      title: "Onboarding Flow Optimization",
      slug: { current: "onboarding-flow" },
      description: "Redesigned user onboarding experience, reducing drop-off rates from 45% to 12%.",
      technologies: ["User Experience", "Conversion Optimization", "Research"],
      featured: false,
      order: 6,
    },
  ];

  // Use Sanity projects if available, otherwise use placeholders
  const projects =
    sanityProjects.length > 0 ? sanityProjects : placeholderProjects;

  return (
    <ProjectsGrid
      projects={projects}
      eyebrow={pageSettings?.eyebrow}
      title={pageSettings?.title}
      description={pageSettings?.description}
    />
  );
}
