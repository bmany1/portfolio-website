import FooterCTA from "@/components/FooterCTA";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getProjectsPageSettings, getProjects } from "@/sanity/queries";
import { placeholderProjects } from "@/lib/placeholders";

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
