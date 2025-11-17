# Portfolio Website - Setup Guide

This guide will help you set up this project on a new computer.

## Prerequisites

Before starting, make sure you have these installed:

- **Node.js** (version 18 or later) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

## Step 1: Clone the Repository

```bash
git clone https://github.com/bmany1/portfolio-website.git
cd portfolio-website
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Tailwind CSS, Framer Motion, and Sanity.

## Step 3: Configure Environment Variables

Create a file named `.env.local` in the root directory of the project with the following content:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=w8eezxao
NEXT_PUBLIC_SANITY_DATASET=production
```

**Important:** This file is not tracked in Git for security reasons, so you must create it manually on each computer.

## Step 4: Start the Development Server

```bash
npm run dev
```

The site will be available at: **http://localhost:3000**

## Step 5: Access Sanity Studio

To edit content through the CMS:

1. Visit: **http://localhost:3000/studio**
2. Log in with your Sanity account credentials
3. You can now add/edit projects, update your bio, and manage all content

The Sanity account used to create this project is the one you'll need to log in with.

## Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run type-check   # Check TypeScript types
npm run check        # Run both lint and type-check
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Sanity.io** - Headless CMS

## Project Structure

```
portfolio-website/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── sanity/          # Sanity CMS configuration & schemas
│   └── lib/             # Utility functions
├── public/
│   └── images/          # Static assets
├── .env.local           # Environment variables (create manually)
└── sanity.config.ts     # Sanity Studio configuration
```

## Troubleshooting

### "Module not found" errors
Run `npm install` to ensure all dependencies are installed.

### "Invalid project ID" in Sanity Studio
Double-check that your `.env.local` file exists and contains the correct values.

### Cannot access Sanity Studio
Make sure you're logged in with the Sanity account that owns the project. Visit https://www.sanity.io/manage to verify.

## Production Deployment

This project is automatically deployed to Vercel:
- **Production URL**: https://portfolio-website-gamma-seven-65.vercel.app/
- Every push to the `main` branch triggers a new deployment

## Need Help?

See `CLAUDE.md` for detailed project documentation and development history.
