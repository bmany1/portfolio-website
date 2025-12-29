import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Brief project summary shown on cards. Keep under 120 characters for best display.",
      validation: (Rule) => Rule.required().max(120).warning("Descriptions over 120 characters may be truncated on project cards."),
    }),
    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",
      description: "Image shown on project cards (16:10 aspect ratio). Optimal size: 1600x1000px or 800x500px",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "mainImage",
      title: "Hero Image",
      type: "image",
      description: "Large masthead image on project detail page. Optimal size: 1920x1080px",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Display on homepage?",
      initialValue: false,
    }),
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "projectUrl",
      title: "Project URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "content",
      title: "Project Details",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative text",
              description: "Important for SEO and accessibility",
            },
          ],
        },
        {
          type: "object",
          name: "video",
          title: "Video",
          fields: [
            {
              name: "videoFile",
              type: "file",
              title: "Video File",
              description: "Upload MP4, WebM, or MOV files. MP4 recommended for best compatibility.",
              options: {
                accept: "video/*",
              },
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption displayed below the video",
            },
            {
              name: "posterImage",
              type: "image",
              title: "Poster Image",
              description: "Thumbnail shown before video plays. Recommended size: 1920x1080px",
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              caption: "caption",
              posterImage: "posterImage",
            },
            prepare({ caption, posterImage }) {
              return {
                title: caption || "Video",
                subtitle: "Video embed",
                media: posterImage,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      cardImage: "cardImage",
      mainImage: "mainImage",
      featured: "featured",
    },
    prepare(selection) {
      const { title, cardImage, mainImage, featured } = selection;
      return {
        title: title,
        subtitle: featured ? "⭐ Featured" : "",
        media: cardImage || mainImage,
      };
    },
  },
});
