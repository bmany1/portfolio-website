export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-6">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Product Manager <br />
            <span className="text-white/60">Building Modern Experiences</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mb-8">
            Placeholder intro text. This will be replaced with your actual bio and what you do.
          </p>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="border border-white/10 rounded-lg p-8 hover:border-white/30 transition-colors">
                <div className="aspect-video bg-white/5 rounded mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Project Title {i}</h3>
                <p className="text-white/60">Project description placeholder</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
