# Portfolio Website

My personal portfolio site, built from scratch using Next.js, TypeScript, Tailwind CSS, and Sanity CMS. Deployed on Vercel.

**Live site:** [bryanmany.com](https://bryanmany.com)

![Portfolio Screenshot](https://cdn.sanity.io/images/w8eezxao/production/2e82c7f796b60cb2bfd290fbb37903d2f70dcc1d-1600x1000.jpg)

## About

I'm a Product Manager with a UX focus. I built this site to showcase my work and learn more about modern web development in the process. The entire project was developed using Claude Code, Anthropic's AI coding agent.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **CMS:** Sanity.io
- **Deployment:** Vercel
- **Contact Form:** Formspree

## Features

- All content managed through Sanity CMS
- Scroll-triggered animations throughout
- Responsive design (mobile-first)
- Image optimization via Sanity CDN (WebP, 60-80% file size reduction)
- Instant cache invalidation via webhook
- Automated security scans with Dependabot

## Project Structure

src/

├── app/

│   ├── page.tsx              # Homepage

│   ├── projects/             # Projects listing + detail pages

│   ├── about/                # About page

│   ├── contact/              # Contact form

│   └── studio/               # Embedded Sanity Studio

├── components/               # Reusable UI components

├── sanity/                   # CMS schemas and queries

└── lib/                      # Utility functions

## Local Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

## Environment Variables

Create a `.env.local` file with:

NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id

NEXT_PUBLIC_SANITY_DATASET=production

REVALIDATE_SECRET=your-webhook-secret

## License

This project is for personal use. Feel free to use it as inspiration for your own portfolio.
