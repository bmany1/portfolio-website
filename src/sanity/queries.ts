import { client } from "./client";

// TypeScript types for our content
export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
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
  email?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  skills?: string[];
}

// Fetch all projects, ordered by the 'order' field
export async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    description,
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
    email,
    linkedin,
    twitter,
    github,
    skills
  }`;

  return client.fetch(query);
}
