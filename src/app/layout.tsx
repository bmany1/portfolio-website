import type { Metadata } from "next";

import { Inter, Fira_Code } from "next/font/google";

import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bryan Many | Product Manager",
  description: "Product manager specializing in building modern web experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${firaCode.variable} antialiased`}
      >
        <Navigation />
        <main id="main-content" className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
