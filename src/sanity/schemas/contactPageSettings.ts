import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPageSettings",
  title: "Contact Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
      description: "Small text above the heading (e.g., 'Contact')",
      initialValue: "Contact",
    }),
    defineField({
      name: "heading",
      title: "Page Heading",
      type: "string",
      description: "Main heading for the contact page",
      initialValue: "Get in Touch",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Brief description below the heading",
      initialValue:
        "Have a question or want to work together? Send me a message and I'll get back to you soon.",
    }),
    defineField({
      name: "formspreeId",
      title: "Formspree Form ID",
      type: "string",
      description:
        "Your Formspree form ID (found at formspree.io/forms). Example: 'xyzabcde'. Required for form to work.",
      validation: (Rule) =>
        Rule.required().error("Formspree ID is required for the form to work"),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Contact Page Settings",
      };
    },
  },
});
