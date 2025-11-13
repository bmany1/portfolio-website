# Portfolio Website Project - Claude Context

## Project Overview
Building a custom portfolio website for Bryan Many (Product Manager) to replace limited Squarespace site at bryanmany.com. Focus on learning to code while creating a modern, polished portfolio with animations and interactivity.

## Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library

### Content Management
- **Sanity.io** - Headless CMS with visual editor
  - Free tier: 3 users, 10GB assets, 1M API requests/month
  - Will use for projects, case studies, about content

### Hosting & Deployment
- **Vercel** - Free tier with auto-deployment from GitHub
- **GitHub** - Version control
- **Domain**: bryanmany.com (currently on Squarespace, will transfer)

### Budget
~$15/year (domain only, everything else free tier)

## Design Goals

### Theme
- **Navy dark theme** (#2F2E2E background, #FFFFFF text)
- **Golden-yellow accent** (#FBBF24) for highlights and CTAs
- **Modern typography**: Inter (sans-serif) + Fira Code (monospace)
- High contrast for maximum readability
- Minimalist, sleek, and techy aesthetic

### Desired Features
1. **Animations** (Priority order):
   - ✅ Smooth scrolling (implemented)
   - ⏳ Parallax effects (high priority)
   - ⏳ Scroll reveals/triggers (high priority)
   - ⏳ Smooth page transitions (high priority)
   - ⏳ Mouse tracking effects (nice-to-have)
   - ⏳ Hover animations/micro-interactions

2. **Content Types**:
   - Projects with case studies
   - Images and videos
   - About/bio section
   - Contact information

3. **User Experience**:
   - Responsive design (mobile-first)
   - Fast performance
   - Sleek, polished interactions

## Design Inspiration Sites
Reference sites analyzed for design patterns:

1. **samitimez.com** - Dark minimalist, p5.js mouse-tracking grid, GSAP scroll reveals
2. **whoisjuan.me** - ScrollReveal animations, smooth navigation, card-based projects
3. **karlissaablay.com** - Parallax scrolling with layered elements
4. **tuanmon.com** - Lazy loading, minimalist
5. **samdickie.me** - Micro-interactions, audio feedback
6. **danielroren.com** ⭐ - Navy + golden-yellow palette, sleek techy aesthetic (primary color inspiration)
7. **justinhinh.webflow.io** ⭐ - Homepage layout structure, company logos section, three-column value props (primary layout inspiration)

## Development Roadmap

### Phase 1: Foundation ✅ COMPLETED
- [x] Initialize Next.js 14 with App Router
- [x] Set up TypeScript
- [x] Configure Tailwind CSS
- [x] Install Framer Motion
- [x] Create basic folder structure
- [x] Dark theme configuration
- [x] Navigation component
- [x] Placeholder pages (Home, Projects, About)
- [x] Git repository initialized
- [x] Smooth scrolling enabled

**Status**: Completed 2025-11-10
**Commit**: `8b3119e` - Initial Next.js setup with dark theme and basic structure

### Phase 2: Sanity CMS Setup ✅ COMPLETED
- [x] Install Sanity dependencies (`sanity`, `next-sanity`, `@sanity/vision`, `@portabletext/react`)
- [x] Create embedded Sanity Studio at `/studio` route
- [x] Define schemas:
  - [x] Projects schema (title, slug, description, images, tech stack, links, featured flag, order)
  - [x] About schema (bio, profile image, social links, skills)
- [x] Set up Sanity client in Next.js
- [x] Create Sanity project and get Project ID
- [x] Configure CORS for local development
- [x] Test content creation in Sanity Studio
- [x] Create GROQ queries for fetching data
- [x] Integrate Sanity data with all pages

**Status**: Completed 2025-11-10
**Commits**: `f99d71a`, `0d920fc`, `0a40822`

### Phase 3: Core Pages & Layout ✅ COMPLETED
- [x] Homepage:
  - [x] Hero section with large typography, gradient accents, scroll indicator
  - [x] Featured projects preview (connected to Sanity)
  - [x] CTA/contact section
- [x] Projects page:
  - [x] Grid/card layout with hover effects
  - [x] Connected to Sanity (shows all projects)
  - [x] Year badges and technology tags
- [x] About page:
  - [x] Bio/background (connected to Sanity with PortableText)
  - [x] Skills/tools (connected to Sanity)
  - [x] Contact info with social links (connected to Sanity)
  - [x] Profile image support
- [ ] Individual project detail pages (not yet implemented)
- [ ] Footer component
- [x] Responsive design for all pages

**Status**: Completed 2025-11-10
**Commit**: `44d7330`

### Phase 4: Animations & Polish ✅ COMPLETED
- [x] Smooth page transitions (Framer Motion)
- [x] Parallax scroll effects on homepage
- [x] Scroll-triggered reveals for projects
- [x] Hover animations on cards/buttons
- [x] Navigation animations
- [x] Micro-interactions throughout
- [ ] Optional: Mouse tracking grid effect (not implemented)
- [ ] Loading states (not yet needed)

**Status**: Completed 2025-11-10
**Commit**: `7999f2e` - Add comprehensive animations and polish

### Phase 5: Deployment & Domain ⏳ IN PROGRESS
- [x] Create GitHub repository (bmany1/portfolio-website)
- [x] Push code to GitHub
- [x] Connect to Vercel
- [x] Configure environment variables (Sanity project ID, dataset)
- [x] Deploy Sanity Studio (accessible at production URL)
- [x] Test production build (successful)
- [x] Configure CORS for production URL
- [ ] Transfer domain from Squarespace to Vercel
- [ ] Configure DNS settings
- [ ] Set up analytics (optional)
- [ ] Performance optimization
- [ ] SEO meta tags

**Status**: Staging deployment complete 2025-11-13
**Production URL**: https://portfolio-website-gamma-seven-65.vercel.app/
**GitHub Repo**: https://github.com/bmany1/portfolio-website
**Commits**: Multiple commits including `27a2353` - Redesign homepage

## Current Project Structure

```
portfolio-website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage (server component)
│   │   ├── template.tsx          # Page transition wrapper
│   │   ├── layout.tsx            # Root layout with Navigation
│   │   ├── globals.css           # Global styles, dark theme
│   │   ├── projects/
│   │   │   └── page.tsx          # Projects listing page
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   └── studio/
│   │       └── [[...tool]]/
│   │           └── page.tsx      # Embedded Sanity Studio
│   ├── components/
│   │   ├── Navigation.tsx        # Animated nav with active states
│   │   ├── HeroSection.tsx       # Hero with headshot and resume link
│   │   ├── WhereIveWorked.tsx    # Company logos section
│   │   ├── WhatIDoSection.tsx    # Three-column value proposition
│   │   ├── FeaturedProjects.tsx  # Scroll-reveal project cards
│   │   ├── CTASection.tsx        # Animated CTA section
│   │   ├── ProjectsGrid.tsx      # Animated projects grid
│   │   └── PageTransition.tsx    # Page transition component
│   ├── sanity/
│   │   ├── schemas/
│   │   │   ├── project.ts        # Project content type
│   │   │   ├── about.ts          # About content type
│   │   │   └── index.ts          # Schema exports
│   │   ├── client.ts             # Sanity client config
│   │   └── queries.ts            # GROQ queries & TypeScript types
│   └── lib/                      # Utilities (empty, ready for use)
├── public/
│   └── images/                   # Static assets
│       ├── headshot.png          # Professional headshot
│       ├── fox-logo.png          # Fox Corporation logo
│       └── grayscale-logo.png    # Grayscale Investments logo
├── sanity.config.ts              # Sanity Studio configuration
├── eslint.config.mjs             # ESLint configuration
├── .env.local                    # Environment variables (not in git)
├── SANITY_SETUP.md               # Setup instructions
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── CLAUDE.md                     # This file!
```

## Key Decisions & Context

### User Background
- Product manager at a company using Vercel/Sanity.io/Next.js stack
- Beginner coder (grasps concepts, learning syntax)
- Wants to learn through hands-on development
- Updates portfolio only a few times per year
- Not rushed - prioritizes quality over speed

### Content Strategy
- Starting with placeholder content
- Will migrate real content later
- CMS allows easy updates without code changes

### Theme Choice
- Navy dark theme with golden-yellow accents (inspired by danielroren.com)
- Inter + Fira Code fonts for modern, techy aesthetic
- No theme toggle (keep it simple, focused experience)

## Development Workflow

### Running the Development Server
```bash
npm run dev
```
Server runs at: http://localhost:3000

### Key Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Next Steps
1. **Expand CMS schemas** to make all content editable (hero text, company logos, what I do section, resume link)
2. Add real content through Sanity Studio
3. Optional enhancements:
   - Individual project detail pages
   - Footer component
   - About page animations
   - Mouse tracking grid effect

## Notes & Learnings
- Project uses Next.js 16.0.1 with Turbopack enabled
- Git repository already initialized by create-next-app
- Using src/ directory for cleaner organization
- Tailwind v4 with new @import syntax in globals.css
- **Animations Architecture**:
  - Server components (pages) pass data to client components for animations
  - Framer Motion animations use `once: true` for scroll triggers to prevent re-animation
  - Page transitions implemented via `template.tsx` (re-renders on route change)
  - Separate components for each animated section for better performance
  - `useInView` hook with negative margins for earlier animation triggers

## Questions/Decisions Made
- [x] **Sanity Studio**: Embedded in Next.js app at `/studio` route (simpler deployment)
- [ ] Project detail pages: Dynamic routes or static pages?
- [ ] Analytics: Google Analytics, Vercel Analytics, or none?
- [ ] Contact form: Simple email link, form with backend, or third-party service?

## Session Progress (2025-11-10)

### Session 1: Foundation, CMS & Core Pages
**Completed:**
- ✅ Phase 1: Foundation (Next.js, TypeScript, Tailwind, dark theme, navigation)
- ✅ Phase 2: Sanity CMS Setup (embedded studio, schemas, queries, integration)
- ✅ Phase 3: Core Pages (Homepage, Projects, About - all connected to Sanity)

### Session 2: ESLint & Animations
**Completed:**
- ✅ ESLint Configuration:
  - TypeScript rules (@typescript-eslint)
  - Import organization (eslint-plugin-import)
  - Code quality rules (no-console, prefer-const, strict equality)
  - React/Next.js specific rules
  - Added npm scripts: `lint`, `lint:fix`, `type-check`, `check`

- ✅ Phase 4: Animations & Polish:
  - **Parallax scrolling** on homepage hero (elements move at different speeds)
  - **Scroll-triggered reveals** for all project cards (fade + slide in)
  - **Smooth page transitions** using Next.js template.tsx
  - **Enhanced hover animations** (cards lift, images zoom, buttons scale)
  - **Navigation animations** (slide in on load, active indicators, underline effects)
  - **Micro-interactions** throughout (staggered tag animations, smooth transitions)

**New Components Created:**
- `HeroSection.tsx` - Parallax hero with entrance animations
- `FeaturedProjects.tsx` - Scroll-reveal project cards for homepage
- `ProjectsGrid.tsx` - Animated projects grid for /projects page
- `CTASection.tsx` - Animated call-to-action section
- `PageTransition.tsx` - Page transition wrapper
- Updated `Navigation.tsx` with animations and active states

### What Works Now:
- **Sanity Studio**: Accessible at `/studio` for content management
- **Homepage**: Animated hero + scroll-reveal featured projects
- **Projects Page**: All projects with staggered scroll animations
- **About Page**: Bio, skills, social links from Sanity CMS
- **Navigation**: Animated nav with active page indicators
- **Page Transitions**: Smooth transitions between all pages
- **Hover Effects**: Polished micro-interactions on all interactive elements
- **Content Management**: Add/edit content through visual CMS

### Current Status:
Site is polished and production-ready! Features:
- ✅ Pulling data from Sanity CMS
- ✅ Beautiful dark theme with high contrast
- ✅ Smooth, professional animations throughout
- ✅ Responsive design (mobile-first)
- ✅ TypeScript type-safe
- ✅ ESLint configured (0 errors, 6 acceptable warnings)
- ✅ Build successful
- ✅ Ready for deployment

### Session 3: Deployment & Redesign (2025-11-13)
**Completed:**
- ✅ **Phase 5 Deployment (Staging)**:
  - Created GitHub repository: bmany1/portfolio-website
  - Pushed all code to GitHub
  - Connected to Vercel with auto-deployment
  - Configured environment variables (Sanity project ID, dataset)
  - Deployed to production URL: https://portfolio-website-gamma-seven-65.vercel.app/
  - Configured CORS for production Sanity Studio access

- ✅ **Major Homepage Redesign**:
  - **Color Palette**: Changed from pure black (#0a0a0a) to navy (#2F2E2E) with golden-yellow accents (#FBBF24)
  - **Typography**: Switched from Geist fonts to Inter + Fira Code
  - **Text Color**: Pure white (#FFFFFF) for maximum contrast

- ✅ **New Components Created**:
  - `HeroSection.tsx` - Redesigned with headshot image and resume link (Justin Hinh inspired layout)
  - `WhereIveWorked.tsx` - Company logos section with grayscale hover effect
  - `WhatIDoSection.tsx` - Three-column value proposition (What I Do / What I Use / What You Can Expect)

- ✅ **Assets Added**:
  - Professional headshot (headshot.png)
  - Fox Corporation logo (fox-logo.png)
  - Grayscale Investments logo (grayscale-logo.png)

- ✅ **Updated Components**:
  - `FeaturedProjects.tsx` - Updated with accent color for CTA links
  - Homepage layout - Integrated all new sections in proper order

**New Homepage Structure:**
1. Hero section with headshot and bio
2. Where I've Worked (company logos)
3. What I Do/Use/Expect (three columns)
4. Featured Projects (scroll-reveal cards)
5. CTA Section (contact)

**Build Status**: ✅ Successful
**Deployment**: ✅ Live on Vercel (auto-deploys on git push)

### Next Steps:
- [ ] Expand CMS schemas to make homepage content editable
- [ ] Add real content through Sanity Studio
- [ ] Optional: Individual project detail pages
- [ ] Optional: Footer component
- [ ] Optional: About page animations
