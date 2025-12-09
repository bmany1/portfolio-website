import { getFeaturedProjects, getHomepage, type Project } from "@/sanity/queries";

// Experimental components
import NavigationExperimental from "@/components/experimental/NavigationExperimental";
import ParticleField from "@/components/experimental/ParticleField";
import CustomCursor from "@/components/experimental/CustomCursor";
import HeroExperimental from "@/components/experimental/HeroExperimental";
import AboutSection from "@/components/experimental/AboutSection";
import ProjectsShowcase from "@/components/experimental/ProjectsShowcase";
import ExperienceTimeline from "@/components/experimental/ExperienceTimeline";
import ContactSection from "@/components/experimental/ContactSection";

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
      title: "AI-Powered Analytics Dashboard",
      slug: { current: "analytics-dashboard" },
      description:
        "Built an intelligent analytics platform that provides real-time insights and predictive recommendations.",
      technologies: ["Data Science", "Machine Learning", "React"],
      featured: true,
      order: 3,
    },
    {
      _id: "placeholder-4",
      title: "Fintech Payment Integration",
      slug: { current: "fintech-payments" },
      description:
        "Designed and shipped a seamless payment integration serving millions of transactions per month.",
      technologies: ["Fintech", "API Design", "Security"],
      featured: true,
      order: 4,
    },
  ];

  // Use Sanity projects if available, otherwise use placeholders
  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : placeholderProjects;

  // Extract data from homepage content or use defaults
  const heroHeading = homepage?.heroSection?.heading?.split(",")[0] || "Bryan Many";
  const heroTagline = "Product Manager";
  const heroBio =
    homepage?.heroSection?.bio ||
    "Building digital products that people love. Passionate about bridging user needs with business goals.";

  const companies = homepage?.whereIveWorked?.companies || [];

  return (
    <>
      {/* Interactive elements */}
      <NavigationExperimental />
      <ParticleField />
      <CustomCursor />

      <main className="relative">
        {/* Hero Section */}
        <HeroExperimental
          heading={heroHeading}
          tagline={heroTagline}
          subheading={heroBio}
        />

        {/* About Section */}
        <div id="about">
          <AboutSection
            bio={heroBio}
            skills={[
              { name: "Product Strategy", level: 95 },
              { name: "User Research", level: 90 },
              { name: "Data Analysis", level: 85 },
              { name: "Technical Leadership", level: 88 },
              { name: "Agile / Scrum", level: 92 },
              { name: "Stakeholder Management", level: 90 },
            ]}
          />
        </div>

        {/* Projects Section */}
        <div id="projects">
          <ProjectsShowcase
            projects={displayProjects}
            sectionTitle={homepage?.featuredWork?.sectionTitle || "Featured Work"}
          />
        </div>

        {/* Experience Section */}
        <div id="experience">
          <ExperienceTimeline
            companies={companies.map((c: { name: string }) => ({
              name: c.name,
              role: "Product Manager",
              period: "2020 - Present",
            }))}
            sectionTitle={
              homepage?.whereIveWorked?.sectionTitle || "Where I've Worked"
            }
          />
        </div>

        {/* Contact Section */}
        <div id="contact">
          <ContactSection
            heading={homepage?.contactCTA?.heading || "Let's Build Something Together"}
            subtext={
              homepage?.contactCTA?.subtext ||
              "Have a project in mind? I'm always open to discussing new opportunities and ideas."
            }
          />
        </div>
      </main>
    </>
  );
}
