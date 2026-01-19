import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";

import "./globals.css";
import Navigation from "@/components/Navigation";
import { getSiteSettings } from "@/sanity/queries";
import { getOgImageUrl } from "@/lib/sanity-image";

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

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  const defaultTitle = "Bryan Many | Product Manager";
  const defaultDescription =
    siteSettings?.siteDescription ||
    "Product manager specializing in building modern web experiences";

  // Build OG image URL if available
  const ogImageUrl = siteSettings?.ogImage?.asset
    ? getOgImageUrl(siteSettings.ogImage)
    : undefined;

  return {
    metadataBase: new URL("https://bryanmany.com"),
    title: {
      default: defaultTitle,
      template: "%s | Bryan Many",
    },
    description: defaultDescription,
    openGraph: {
      type: "website",
      siteName: siteSettings?.siteName || "Bryan Many",
      title: defaultTitle,
      description: defaultDescription,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: siteSettings?.siteName || "Bryan Many",
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  };
}

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
