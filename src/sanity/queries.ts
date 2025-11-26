import { client } from "./client";

// TypeScript types for our content
export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  cardImage?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  mainImage?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  featured: boolean;
  technologies?: string[];
  projectUrl?: string;
  githubUrl?: string;
  order: number;
}

// Portable Text block type
export interface PortableTextBlock {
  _key: string;
  _type: string;
  [key: string]: unknown;
}

// Extended project type with full content for detail pages
export interface ProjectDetail extends Project {
  content?: PortableTextBlock[];
}

// Navigation links for prev/next projects
export interface ProjectNavigation {
  previous?: { title: string; slug: { current: string } };
  next?: { title: string; slug: { current: string } };
}

export interface About {
  _id: string;
  title: string;
  bio: PortableTextBlock[];
  profileImage?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  skills?: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  handle?: string;
}

export interface SiteSettings {
  _id: string;
  siteName: string;
  siteDescription?: string;
  email?: string;
  socialLinks?: SocialLink[];
}

export interface Company {
  name: string;
  logo?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
}

export interface WhatIDoColumn {
  title: string;
  description: string;
  items: string[];
}

export interface Homepage {
  _id: string;
  heroSection: {
    heading: string;
    bio: string;
    headshotImage?: {
      asset: {
        _ref: string;
        url?: string;
      };
    };
    resumeFile?: {
      asset: {
        _ref: string;
        url?: string;
      };
    };
    resumeLinkText?: string;
  };
  whereIveWorked: {
    sectionTitle?: string;
    companies: Company[];
  };
  whatIDo: {
    columns: WhatIDoColumn[];
  };
  featuredWork: {
    eyebrow?: string;
    sectionTitle: string;
    description?: string;
    ctaText?: string;
  };
  contactCTA: {
    heading: string;
    subtext?: string;
    buttonText?: string;
  };
}

export interface ProjectsPageSettings {
  _id: string;
  eyebrow?: string;
  title: string;
  description: string;
  footerCTA?: {
    text?: string;
    linkText?: string;
  };
}

export interface ContactPageSettings {
  _id: string;
  eyebrow?: string;
  heading: string;
  description?: string;
  formspreeId?: string;
}

// Fetch all projects, ordered by the 'order' field
export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    cardImage {
      asset-> {
        _ref,
        url
      }
    },
    mainImage {
      asset-> {
        _ref,
        url
      }
    },
    featured,
    technologies,
    projectUrl,
    githubUrl,
    order
  }`;

  return client.fetch(query);
}

// Fetch only featured projects
export async function getFeaturedProjects(): Promise<Project[]> {
  const query = `*[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    cardImage {
      asset-> {
        _ref,
        url
      }
    },
    mainImage {
      asset-> {
        _ref,
        url
      }
    },
    featured,
    technologies,
    projectUrl,
    githubUrl,
    order
  }`;

  return client.fetch(query);
}

// Fetch the about page content (should only be one document)
export async function getAbout(): Promise<About | null> {
  const query = `*[_type == "about"][0] {
    _id,
    title,
    bio,
    profileImage {
      asset-> {
        _ref,
        url
      }
    },
    skills
  }`;

  return client.fetch(query);
}

// Fetch site settings (should only be one document)
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteDescription,
    email,
    socialLinks
  }`;

  return client.fetch(query);
}

// Fetch homepage content (should only be one document)
export async function getHomepage(): Promise<Homepage | null> {
  const query = `*[_type == "homepage"][0] {
    _id,
    heroSection {
      heading,
      bio,
      headshotImage {
        asset-> {
          _ref,
          url
        }
      },
      resumeFile {
        asset-> {
          _ref,
          url
        }
      },
      resumeLinkText
    },
    whereIveWorked {
      sectionTitle,
      companies[] {
        name,
        logo {
          asset-> {
            _ref,
            url
          }
        }
      }
    },
    whatIDo {
      columns[] {
        title,
        description,
        items
      }
    },
    featuredWork {
      eyebrow,
      sectionTitle,
      description,
      ctaText
    },
    contactCTA {
      heading,
      subtext,
      buttonText
    }
  }`;

  return client.fetch(query);
}

// Fetch projects page settings (should only be one document)
export async function getProjectsPageSettings(): Promise<ProjectsPageSettings | null> {
  const query = `*[_type == "projectsPageSettings"][0] {
    _id,
    eyebrow,
    title,
    description,
    footerCTA {
      text,
      linkText
    }
  }`;

  return client.fetch(query);
}

// Fetch contact page settings (should only be one document)
export async function getContactPageSettings(): Promise<ContactPageSettings | null> {
  const query = `*[_type == "contactPageSettings"][0] {
    _id,
    eyebrow,
    heading,
    description,
    formspreeId
  }`;

  return client.fetch(query);
}

// Fetch a single project by slug with full content
export async function getProjectBySlug(
  slug: string
): Promise<ProjectDetail | null> {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    cardImage {
      asset-> {
        _ref,
        url
      }
    },
    mainImage {
      asset-> {
        _ref,
        url
      }
    },
    featured,
    technologies,
    projectUrl,
    githubUrl,
    content,
    order
  }`;

  return client.fetch(query, { slug });
}

// Fetch previous and next projects for navigation
export async function getProjectNavigation(
  currentOrder: number
): Promise<ProjectNavigation> {
  // Get previous project (lower order number)
  const prevQuery = `*[_type == "project" && order < $currentOrder] | order(order desc)[0] {
    title,
    slug
  }`;

  // Get next project (higher order number)
  const nextQuery = `*[_type == "project" && order > $currentOrder] | order(order asc)[0] {
    title,
    slug
  }`;

  const [previous, next] = await Promise.all([
    client.fetch(prevQuery, { currentOrder }),
    client.fetch(nextQuery, { currentOrder }),
  ]);

  return { previous, next };
}

// Fetch all project slugs for static generation
export async function getAllProjectSlugs(): Promise<{ slug: { current: string } }[]> {
  const query = `*[_type == "project"] {
    slug
  }`;

  return client.fetch(query);
}
