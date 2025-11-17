import CTASection from "@/components/CTASection";
import FeaturedProjects from "@/components/FeaturedProjects";
import HeroSection from "@/components/HeroSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import WhereIveWorked from "@/components/WhereIveWorked";
import {
  getFeaturedProjects,
  getHomepage,
  type Project,
} from "@/sanity/queries";

export default async function Home() {
  // Fetch homepage content and featured projects from Sanity
  const [homepage, featuredProjects] = await Promise.all([
    getHomepage(),
    getFeaturedProjects(),
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
      featured: true,
      order: 2,
    },
  ];

  // Use Sanity projects if available, otherwise use placeholders
  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : placeholderProjects;

  // If homepage data doesn't exist yet, show a message
  if (!homepage) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-xl text-white/60 mb-6">
            Please create your homepage content in Sanity Studio
          </p>
          <a
            href="/studio"
            className="inline-block px-8 py-4 bg-accent text-black font-medium rounded-full hover:bg-accent-hover transition-colors"
          >
            Go to Studio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        heading={homepage.heroSection.heading}
        bio={homepage.heroSection.bio}
        headshotImage={homepage.heroSection.headshotImage}
        resumeFile={homepage.heroSection.resumeFile}
        resumeLinkText={homepage.heroSection.resumeLinkText}
      />

      {/* Where I've Worked Section */}
      <WhereIveWorked
        sectionTitle={homepage.whereIveWorked.sectionTitle}
        companies={homepage.whereIveWorked.companies}
      />

      {/* What I Do Section */}
      <WhatIDoSection columns={homepage.whatIDo.columns} />

      {/* Featured Projects Section */}
      <FeaturedProjects
        projects={displayProjects}
        eyebrow={homepage.featuredWork.eyebrow}
        sectionTitle={homepage.featuredWork.sectionTitle}
        description={homepage.featuredWork.description}
        ctaText={homepage.featuredWork.ctaText}
      />

      {/* Contact/CTA Section */}
      <CTASection
        heading={homepage.contactCTA.heading}
        subtext={homepage.contactCTA.subtext}
        buttonText={homepage.contactCTA.buttonText}
      />
    </div>
  );
}
