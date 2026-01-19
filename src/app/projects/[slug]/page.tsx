import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectNavigation,
  getAllProjectSlugs,
  getSiteSettings,
} from "@/sanity/queries";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import { getOgImageUrl } from "@/lib/sanity-image";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getAllProjectSlugs();
  return projects.map((project) => ({
    slug: project.slug.current,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, siteSettings] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
  ]);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = project.title;
  const description = project.description;

  // Use cardImage > mainImage > default OG image
  const ogImageSource = project.cardImage?.asset
    ? project.cardImage
    : project.mainImage?.asset
      ? project.mainImage
      : siteSettings?.ogImage?.asset
        ? siteSettings.ogImage
        : undefined;
  const ogImageUrl = ogImageSource ? getOgImageUrl(ogImageSource) : undefined;

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
            alt: title,
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const navigation = await getProjectNavigation(project.order);

  return (
    <ProjectDetailContent project={project} navigation={navigation} />
  );
}
