import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white/10 mb-2">
            404
          </h1>
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Page Not Found
        </h2>
        <p className="text-white/60 text-lg mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-background rounded-lg hover:bg-accent-hover transition-colors font-medium group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
