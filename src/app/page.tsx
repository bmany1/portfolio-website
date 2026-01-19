import type { Metadata } from "next";
import Link from "next/link";

import CTASection from "@/components/CTASection";
import FeaturedProjects from "@/components/FeaturedProjects";
import HeroSection from "@/components/HeroSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import WhereIveWorked from "@/components/WhereIveWorked";
import { getFeaturedProjects, getHomepage, getSiteSettings } from "@/sanity/queries";
import { featuredPlaceholderProjects } from "@/lib/placeholders";
import { getOgImageUrl } from "@/lib/sanity-image";

export async function generateMetadata(): Promise<Metadata> {
  const [homepage, siteSettings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ]);

  const description =
    homepage?.heroSection?.bio ||
    siteSettings?.siteDescription ||
    "Product manager specializing in building modern web experiences";

  // Use headshot image if available, otherwise fall back to default OG image
  const ogImageSource = homepage?.heroSection?.headshotImage?.asset
    ? homepage.heroSection.headshotImage
    : siteSettings?.ogImage?.asset
      ? siteSettings.ogImage
      : undefined;
  const ogImageUrl = ogImageSource ? getOgImageUrl(ogImageSource) : undefined;

  return {
    description,
    openGraph: {
      title: "Bryan Many | Product Manager",
      description,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: "Bryan Many",
          },
        ],
      }),
    },
    twitter: {
      title: "Bryan Many | Product Manager",
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  };
}

export default async function Home() {
  // Fetch homepage content and featured projects from Sanity
  const [homepage, featuredProjects] = await Promise.all([
    getHomepage(),
    getFeaturedProjects(),
  ]);

  // Use Sanity projects if available, otherwise use placeholders
  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : featuredPlaceholderProjects;

  // If homepage data doesn't exist yet, show a message
  if (!homepage) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-xl text-white/60 mb-6">
            Please create your homepage content in Sanity Studio
          </p>
          <Link
            href="/studio"
            className="inline-block px-8 py-4 bg-accent text-black font-medium rounded-full hover:bg-accent-hover transition-colors"
          >
            Go to Studio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        heading={homepage.heroSection.heading}
        bio={homepage.heroSection.bio}
        headshotImage={homepage.heroSection.headshotImage}
        resumeFile={homepage.heroSection.resumeFile}
        resumeLinkText={homepage.heroSection.resumeLinkText}
      />

      {/* Where I've Worked Section */}
      <WhereIveWorked
        sectionTitle={homepage.whereIveWorked.sectionTitle}
        companies={homepage.whereIveWorked.companies}
      />

      {/* What I Do Section */}
      <WhatIDoSection columns={homepage.whatIDo.columns} />

      {/* Featured Projects Section */}
      <FeaturedProjects
        projects={displayProjects}
        eyebrow={homepage.featuredWork.eyebrow}
        sectionTitle={homepage.featuredWork.sectionTitle}
        description={homepage.featuredWork.description}
        ctaText={homepage.featuredWork.ctaText}
      />

      {/* Contact/CTA Section */}
      <CTASection
        heading={homepage.contactCTA.heading}
        subtext={homepage.contactCTA.subtext}
        buttonText={homepage.contactCTA.buttonText}
      />
    </div>
  );
}
