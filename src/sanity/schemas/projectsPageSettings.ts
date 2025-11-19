import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectsPageSettings",
  title: "Projects Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      description: "Small text above the page title",
      initialValue: "PORTFOLIO",
    }),
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "All Projects",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      initialValue:
        "A collection of product initiatives, redesigns, and launches spanning various industries and user needs.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "footerCTA",
      title: "Footer CTA",
      type: "object",
      description: "Call-to-action shown at the bottom of the projects page",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
          description: "The prompt text (e.g., 'Have a project in mind?')",
          initialValue: "Have a project in mind?",
        }),
        defineField({
          name: "linkText",
          title: "Link Text",
          type: "string",
          description: "The clickable link text (e.g., 'Let's talk')",
          initialValue: "Let's talk",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Projects Page Settings",
      };
    },
  },
});
