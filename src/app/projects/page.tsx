export default function ProjectsPage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-white/60 mb-12">
          Placeholder for projects page
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="border border-white/10 rounded-lg p-6 hover:border-white/30 transition-colors">
              <div className="aspect-video bg-white/5 rounded mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Project {i}</h3>
              <p className="text-white/60 text-sm">Description placeholder</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
