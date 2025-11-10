import { getProjects } from "@/sanity/queries";

export default async function ProjectsPage() {
  // Fetch all projects from Sanity
  const sanityProjects = await getProjects();

  // Fallback placeholder projects if none exist in Sanity yet
  const placeholderProjects = [
    {
      title: "E-Commerce Platform Redesign",
      description: "Led the complete redesign of a multi-million dollar e-commerce platform, improving conversion rates by 40%.",
      technologies: ["Product Strategy", "UX Design", "A/B Testing"],
      year: "2024",
    },
    {
      title: "Mobile App Launch",
      description: "Spearheaded the development and launch of a mobile-first experience, reaching 100K users in the first month.",
      technologies: ["Mobile", "User Research", "Agile"],
      year: "2024",
    },
    {
      title: "Analytics Dashboard",
      description: "Designed and shipped a comprehensive analytics dashboard for enterprise clients, enabling data-driven decision making.",
      technologies: ["Data Visualization", "Enterprise", "SaaS"],
      year: "2023",
    },
    {
      title: "Design System 2.0",
      description: "Built a scalable design system from the ground up, reducing design-to-development time by 60%.",
      technologies: ["Design Systems", "Component Library", "Documentation"],
      year: "2023",
    },
    {
      title: "Payment Integration",
      description: "Implemented a seamless payment flow that increased transaction completion rates by 25%.",
      technologies: ["FinTech", "Payments", "Security"],
      year: "2023",
    },
    {
      title: "Onboarding Flow Optimization",
      description: "Redesigned user onboarding experience, reducing drop-off rates from 45% to 12%.",
      technologies: ["User Experience", "Conversion Optimization", "Research"],
      year: "2022",
    },
  ];

  // Use Sanity projects if available, otherwise use placeholders
  const projects = sanityProjects.length > 0 ? sanityProjects : placeholderProjects;

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-16">
          <span className="text-sm font-mono text-white/40 tracking-wider">
            PORTFOLIO
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            All Projects
          </h1>
          <p className="text-xl text-white/60 max-w-3xl">
            A collection of product initiatives, redesigns, and launches spanning various industries and user needs.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div
              key={project._id || i}
              className="group border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              {/* Project Image */}
              <div className="aspect-[16/10] bg-gradient-to-br from-white/5 to-white/[0.02] relative overflow-hidden">
                {project.mainImage?.asset?.url ? (
                  <img
                    src={project.mainImage.asset.url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {project.year && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-mono text-white/40 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-white/80 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs font-mono text-white/40 px-3 py-1 border border-white/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
