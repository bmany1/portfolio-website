export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-16">
          <span className="text-sm font-mono text-white/40 tracking-wider">
            ABOUT
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            Bryan Many
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Bio Section */}
          <div className="lg:col-span-2 space-y-6 text-lg text-white/70 leading-relaxed">
            <p>
              Product manager with a passion for building modern digital experiences that solve real user problems.
              I specialize in bridging the gap between design, engineering, and business strategy.
            </p>

            <p>
              My approach combines user research, data analysis, and technical understanding to ship products
              that users love. I believe in iterative development, continuous learning, and the power of
              cross-functional collaboration.
            </p>

            <p>
              Currently working with cutting-edge technologies including Next.js, Vercel, and Sanity.io
              to build scalable web applications. Always excited to take on new challenges and learn new skills.
            </p>
          </div>

          {/* Profile Image Placeholder */}
          <div className="lg:col-span-1">
            <div className="aspect-square bg-gradient-to-br from-white/10 to-white/[0.02] rounded-2xl" />
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20 pb-20 border-b border-white/10">
          <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: "Product Management",
                skills: ["Product Strategy", "User Research", "Roadmap Planning", "A/B Testing"],
              },
              {
                category: "Design",
                skills: ["UX Design", "Prototyping", "Design Systems", "Figma"],
              },
              {
                category: "Technical",
                skills: ["Next.js", "React", "TypeScript", "API Design"],
              },
            ].map((skillGroup, i) => (
              <div key={i} className="border border-white/10 rounded-xl p-6">
                <h3 className="font-semibold mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.skills.map((skill, j) => (
                    <li key={j} className="text-white/60 text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl">
            I'm always open to discussing new opportunities, collaborations, or just chatting about product and technology.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:your.email@example.com"
              className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
            >
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:border-white/40 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:border-white/40 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
