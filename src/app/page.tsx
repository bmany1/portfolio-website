import CTASection from "@/components/CTASection";
import FeaturedProjects from "@/components/FeaturedProjects";
import HeroSection from "@/components/HeroSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import WhereIveWorked from "@/components/WhereIveWorked";
import { getFeaturedProjects, type Project } from "@/sanity/queries";

export default async function Home() {
  // Fetch featured projects from Sanity
  const featuredProjects = await getFeaturedProjects();

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
      featured: true,
      order: 2,
    },
  ];

  // Use Sanity projects if available, otherwise use placeholders
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : placeholderProjects;
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Where I've Worked Section */}
      <WhereIveWorked />

      {/* What I Do Section */}
      <WhatIDoSection />

      {/* Featured Projects Section */}
      <FeaturedProjects projects={displayProjects} />

      {/* Contact/CTA Section */}
      <CTASection />
    </div>
  );
}
