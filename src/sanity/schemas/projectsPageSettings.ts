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
  ],
  preview: {
    prepare() {
      return {
        title: "Projects Page Settings",
      };
    },
  },
});
