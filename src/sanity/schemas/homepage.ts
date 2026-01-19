import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          description: "Main headline in the hero section",
          initialValue: "I design solutions, one product at a time.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "bio",
          title: "Bio",
          type: "text",
          rows: 3,
          description: "Short bio/description under the heading",
          initialValue:
            "Product manager specializing in building modern web experiences that delight users and drive business impact.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "headshotImage",
          title: "Headshot Image",
          type: "image",
          options: {
            hotspot: true,
          },
          description:
            "Professional headshot photo. Also used for homepage social sharing/OG image (cropped to 1200x630)",
        }),
        defineField({
          name: "resumeFile",
          title: "Resume PDF",
          type: "file",
          options: {
            accept: "application/pdf",
          },
          description: "Upload your resume PDF (will be hosted by Sanity)",
        }),
        defineField({
          name: "resumeLinkText",
          title: "Resume Link Text",
          type: "string",
          initialValue: "View Resume",
          description: "Text for the resume download link",
        }),
      ],
    }),

    // Where I've Worked Section
    defineField({
      name: "whereIveWorked",
      title: "Where I've Worked Section",
      type: "object",
      fields: [
        defineField({
          name: "sectionTitle",
          title: "Section Title",
          type: "string",
          initialValue: "Where I've Worked",
        }),
        defineField({
          name: "companies",
          title: "Companies",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "name",
                  title: "Company Name",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "logo",
                  title: "Company Logo",
                  type: "image",
                  description: "Logo should be white/transparent for dark background",
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: "name",
                  media: "logo",
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(6),
          description: "Maximum 6 companies. Drag to reorder.",
          initialValue: [
            {
              name: "Fox Corporation",
            },
            {
              name: "Grayscale Investments",
            },
          ],
        }),
      ],
    }),

    // What I Do Section
    defineField({
      name: "whatIDo",
      title: "What I Do Section",
      type: "object",
      fields: [
        defineField({
          name: "columns",
          title: "Columns",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Column Title",
                  type: "string",
                  description: "Recommendation: Keep under 20 characters",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 2,
                  description: "Recommendation: 1-2 sentences, ~20-30 words",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "items",
                  title: "Items",
                  type: "array",
                  of: [{ type: "string" }],
                  description: "Recommendation: 3-5 items, ~10-15 words each",
                  validation: (Rule) => Rule.required().min(1),
                },
              ],
              preview: {
                select: {
                  title: "title",
                  items: "items",
                },
                prepare({ title, items }) {
                  return {
                    title,
                    subtitle: items ? `${items.length} items` : "No items",
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.length(3),
          description: "Must have exactly 3 columns. Drag to reorder.",
          initialValue: [
            {
              title: "What I Do",
              description:
                "Crafting the perfect user experience is my top priority. But I also do these as well.",
              items: [
                "Scale Products",
                "Web and Mobile App Development",
                "Build Amazing Teams",
              ],
            },
            {
              title: "What I Use",
              description:
                "Every Product Manager needs the right tools to do the perfect job.",
              items: ["JIRA", "Figma", "Heap"],
            },
            {
              title: "What You Can Expect",
              description:
                "I create products that are more than shiny. I make them shippable, usable, and scale.",
              items: ["Data-Driven", "Customer Centric", "Creative"],
            },
          ],
        }),
      ],
    }),

    // Featured Work Section
    defineField({
      name: "featuredWork",
      title: "Featured Work Section",
      type: "object",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow Text",
          type: "string",
          description: "Small text above section title",
          initialValue: "SELECTED WORK",
        }),
        defineField({
          name: "sectionTitle",
          title: "Section Title",
          type: "string",
          initialValue: "Featured Projects",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 2,
          initialValue:
            "A selection of recent projects showcasing product strategy, user experience design, and technical execution.",
        }),
        defineField({
          name: "ctaText",
          title: "View All CTA Text",
          type: "string",
          initialValue: "View all projects",
          description: "Text for 'View All Projects' link",
        }),
      ],
    }),

    // Contact CTA Section
    defineField({
      name: "contactCTA",
      title: "Contact CTA Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Let's work together",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "text",
          rows: 2,
          initialValue:
            "I'm always interested in hearing about new projects and opportunities.",
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
          initialValue: "Get in Touch",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage Content",
      };
    },
  },
});
