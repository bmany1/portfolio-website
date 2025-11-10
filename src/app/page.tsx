import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center px-6 overflow-hidden">
        {/* Background gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl">
            {/* Small label */}
            <div className="inline-block mb-6">
              <span className="text-sm font-mono text-white/40 tracking-wider">
                PRODUCT MANAGER
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.95] tracking-tight">
              Building Modern
              <br />
              <span className="text-white/40">Experiences</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mb-12 leading-relaxed">
              Creating seamless digital products that combine design excellence with technical innovation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                View Projects
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:border-white/40 transition-colors"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-xs font-mono tracking-wider">SCROLL</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-sm font-mono text-white/40 tracking-wider">
              SELECTED WORK
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
              Featured Projects
            </h2>
            <p className="text-white/60 max-w-2xl">
              A selection of recent projects showcasing product strategy, user experience design, and technical execution.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "E-Commerce Platform Redesign",
                description: "Led the complete redesign of a multi-million dollar e-commerce platform, improving conversion rates by 40%.",
                tags: ["Product Strategy", "UX Design", "A/B Testing"],
              },
              {
                title: "Mobile App Launch",
                description: "Spearheaded the development and launch of a mobile-first experience, reaching 100K users in the first month.",
                tags: ["Mobile", "User Research", "Agile"],
              },
            ].map((project, i) => (
              <div
                key={i}
                className="group border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300"
              >
                {/* Project Image Placeholder */}
                <div className="aspect-[16/10] bg-gradient-to-br from-white/5 to-white/[0.02] relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs font-mono text-white/40 px-3 py-1 border border-white/10 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Link */}
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <span>View all projects</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's work together
          </h2>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
