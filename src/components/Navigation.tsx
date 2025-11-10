import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold hover:text-white/70 transition-colors">
            Bryan Many
          </Link>

          <div className="flex gap-8">
            <Link href="/projects" className="hover:text-white/70 transition-colors">
              Projects
            </Link>
            <Link href="/about" className="hover:text-white/70 transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
