"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (in production, send to monitoring service)
    console.error("[Error Boundary] Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-4">
            <svg
              className="w-10 h-10 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              role="img"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Something went wrong
        </h2>
        <p className="text-white/60 text-lg mb-8 leading-relaxed">
          We're sorry, but something unexpected happened. Please try again.
        </p>

        {/* Error Details (dev only) */}
        {process.env.NODE_ENV === "development" && (
          <details className="mb-8 text-left">
            <summary className="cursor-pointer text-white/50 hover:text-white/70 transition-colors text-sm font-mono mb-2">
              Error details (dev only)
            </summary>
            <pre className="text-xs text-white/50 font-mono bg-white/5 p-4 rounded-lg overflow-auto max-h-40">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-background rounded-lg hover:bg-accent-hover transition-colors font-medium"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/10 rounded-lg hover:border-white/30 transition-colors font-medium"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
