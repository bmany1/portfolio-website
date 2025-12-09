import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Bryan Many | Product Manager",
  description: "Product manager specializing in building modern web experiences",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {/* Noise texture overlay for premium feel */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Animated grid background */}
        <div className="grid-background" aria-hidden="true">
          <div className="grid-pattern" />
          <div className="grid-glow" style={{ top: '20%', left: '30%' }} />
          <div className="grid-glow" style={{ bottom: '20%', right: '20%', animationDelay: '-10s' }} />
        </div>

        {children}
      </body>
    </html>
  );
}
