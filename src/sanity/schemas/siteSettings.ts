import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Bryan Many",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "Site Description",
      type: "text",
      rows: 3,
      description: "Used for SEO meta tags",
      initialValue:
        "Product manager specializing in building modern web experiences that delight users and drive business impact.",
    }),
    defineField({
      name: "ogImage",
      title: "Default Open Graph Image",
      type: "image",
      description:
        "Default image for social sharing. Optimal: 1200x630px (1.91:1 ratio). Used when page-specific images are unavailable.",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Primary contact email",
      validation: (Rule) =>
        Rule.regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Must be a valid email address"
        ),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              description: 'e.g., "LinkedIn", "GitHub", "Twitter/X"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "handle",
              title: "Handle (optional)",
              type: "string",
              description: 'e.g., "@bryanmany" - used for display',
            },
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
      description: "Your social media profiles",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
