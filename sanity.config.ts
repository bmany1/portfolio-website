import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./src/sanity/schemas";

export default defineConfig({
  name: "default",
  title: "Portfolio Website",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "w8eezxao",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
