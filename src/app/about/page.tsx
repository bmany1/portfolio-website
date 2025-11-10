export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8">About</h1>

        <div className="space-y-6 text-lg text-white/70">
          <p>
            Placeholder for your bio and background.
          </p>

          <p>
            This section will contain information about your experience, skills,
            and what you're currently working on.
          </p>

          <div className="mt-12 pt-12 border-t border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-white">Get in Touch</h2>
            <p>Contact information and social links will go here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
