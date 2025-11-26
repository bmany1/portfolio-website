import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectNavigation,
  getAllProjectSlugs,
} from "@/sanity/queries";
import ProjectDetailContent from "@/components/ProjectDetailContent";

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
export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Bryan Many`,
    description: project.description,
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
