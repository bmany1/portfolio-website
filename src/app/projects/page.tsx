import type { Metadata } from "next";
import FooterCTA from "@/components/FooterCTA";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getProjectsPageSettings, getProjects, getSiteSettings } from "@/sanity/queries";
import { placeholderProjects } from "@/lib/placeholders";
import { getOgImageUrl } from "@/lib/sanity-image";

export async function generateMetadata(): Promise<Metadata> {
  const [pageSettings, siteSettings] = await Promise.all([
    getProjectsPageSettings(),
    getSiteSettings(),
  ]);

  const title = "Projects";
  const description =
    pageSettings?.description ||
    "A collection of projects showcasing product strategy, user experience design, and technical execution.";

  // Projects listing page uses default OG image only
  const ogImageUrl = siteSettings?.ogImage?.asset
    ? getOgImageUrl(siteSettings.ogImage)
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Bryan Many`,
      description,
      ...(ogImageUrl && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: "Projects by Bryan Many",
          },
        ],
      }),
    },
    twitter: {
      title: `${title} | Bryan Many`,
      description,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  };
}

export default async function ProjectsPage() {
  // Fetch projects page settings and all projects from Sanity
  const [pageSettings, sanityProjects] = await Promise.all([
    getProjectsPageSettings(),
    getProjects(),
  ]);

  // Use Sanity projects if available, otherwise use placeholders
  const projects =
    sanityProjects.length > 0 ? sanityProjects : placeholderProjects;

  return (
    <>
      <ProjectsGrid
        projects={projects}
        eyebrow={pageSettings?.eyebrow}
        title={pageSettings?.title}
        description={pageSettings?.description}
      />
      <FooterCTA
        text={pageSettings?.footerCTA?.text}
        linkText={pageSettings?.footerCTA?.linkText}
      />
    </>
  );
}
