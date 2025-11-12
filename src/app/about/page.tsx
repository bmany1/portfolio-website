import { PortableText } from "@portabletext/react";

import { getAbout } from "@/sanity/queries";

export default async function AboutPage() {
  // Fetch about page content from Sanity
  const aboutData = await getAbout();
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-16">
          <span className="text-sm font-mono text-white/40 tracking-wider">
            ABOUT
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            {aboutData?.title || "Bryan Many"}
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {/* Bio Section */}
          <div className="lg:col-span-2 space-y-6 text-lg text-white/70 leading-relaxed">
            {aboutData?.bio ? (
              <PortableText
                value={aboutData.bio}
                components={{
                  block: {
                    normal: ({ children }) => <p>{children}</p>,
                  },
                }}
              />
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Profile Image */}
          <div className="lg:col-span-1">
            {aboutData?.profileImage?.asset?.url ? (
              <img
                src={aboutData.profileImage.asset.url}
                alt={aboutData.title}
                className="w-full aspect-square object-cover rounded-2xl"
              />
            ) : (
              <div className="aspect-square bg-gradient-to-br from-white/10 to-white/[0.02] rounded-2xl" />
            )}
          </div>
        </div>

        {/* Skills Section */}
        {aboutData?.skills && aboutData.skills.length > 0 && (
          <div className="mb-20 pb-20 border-b border-white/10">
            <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {aboutData.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 border border-white/10 rounded-full text-white/70 hover:border-white/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg text-white/60 mb-8 max-w-2xl">
            I&apos;m always open to discussing new opportunities, collaborations, or just chatting about product and technology.
          </p>

          <div className="flex flex-wrap gap-4">
            {aboutData?.email && (
              <a
                href={`mailto:${aboutData.email}`}
                className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                Email Me
              </a>
            )}
            {aboutData?.linkedin && (
              <a
                href={aboutData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:border-white/40 transition-colors"
              >
                LinkedIn
              </a>
            )}
            {aboutData?.github && (
              <a
                href={aboutData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:border-white/40 transition-colors"
              >
                GitHub
              </a>
            )}
            {aboutData?.twitter && (
              <a
                href={aboutData.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/20 text-white font-medium rounded-full hover:border-white/40 transition-colors"
              >
                Twitter/X
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
