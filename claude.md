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
- Dark theme (#0a0a0a background, #ededed text)
- Minimalist, modern aesthetic
- High contrast for readability

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
6. **danielroren.com** - Dark theme, animated underlines, Gatsby/React, Framer Motion

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

### Phase 4: Animations & Polish (Week 3-4)
- [ ] Smooth page transitions (Framer Motion)
- [ ] Parallax scroll effects on homepage
- [ ] Scroll-triggered reveals for projects
- [ ] Hover animations on cards/buttons
- [ ] Navigation animations
- [ ] Optional: Mouse tracking grid effect
- [ ] Loading states and transitions
- [ ] Micro-interactions throughout

### Phase 5: Deployment & Domain (Week 4)
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Connect to Vercel
- [ ] Configure environment variables
- [ ] Deploy Sanity Studio
- [ ] Test production build
- [ ] Transfer domain from Squarespace to Vercel
- [ ] Configure DNS settings
- [ ] Set up analytics (optional)
- [ ] Performance optimization
- [ ] SEO meta tags

## Current Project Structure

```
portfolio-website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage with hero + featured projects
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
│   │   └── Navigation.tsx        # Fixed nav with links
│   ├── sanity/
│   │   ├── schemas/
│   │   │   ├── project.ts        # Project content type
│   │   │   ├── about.ts          # About content type
│   │   │   └── index.ts          # Schema exports
│   │   └── client.ts             # Sanity client config
│   └── lib/                      # Utilities (empty, ready for use)
├── public/                       # Static assets
├── sanity.config.ts              # Sanity Studio configuration
├── .env.local                    # Environment variables (not in git)
├── SANITY_SETUP.md               # Setup instructions
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── claude.md                     # This file!
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
- Dark theme selected (matches inspiration sites)
- No theme toggle initially (keep it simple)

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
1. Set up Sanity.io CMS (Phase 2)
2. Create content schemas for projects and about page
3. Build out homepage hero section
4. Implement first animations (parallax, scroll reveals)

## Notes & Learnings
- Project uses Next.js 16.0.1 with Turbopack enabled
- Git repository already initialized by create-next-app
- Using src/ directory for cleaner organization
- Tailwind v4 with new @import syntax in globals.css

## Questions/Decisions Made
- [x] **Sanity Studio**: Embedded in Next.js app at `/studio` route (simpler deployment)
- [ ] Project detail pages: Dynamic routes or static pages?
- [ ] Analytics: Google Analytics, Vercel Analytics, or none?
- [ ] Contact form: Simple email link, form with backend, or third-party service?

## Session Progress (2025-11-10)

### Completed Today:
- ✅ Phase 1: Foundation (Next.js, TypeScript, Tailwind, dark theme, navigation)
- ✅ Phase 2: Sanity CMS Setup (embedded studio, schemas, queries, integration)
- ✅ Phase 3: Core Pages (Homepage, Projects, About - all connected to Sanity)

### What Works Now:
- **Sanity Studio**: Accessible at `/studio` for content management
- **Homepage**: Hero section + featured projects from Sanity CMS
- **Projects Page**: All projects from Sanity with images, descriptions, tags
- **About Page**: Bio, skills, social links from Sanity CMS
- **Content Management**: Add/edit projects and about info through visual CMS

### Current Status:
All core functionality is working! The site is:
- Pulling data from Sanity CMS
- Displaying content beautifully with dark theme
- Responsive across devices
- Ready for content to be added

### Next Steps:
- [ ] Add animations (parallax, scroll reveals, page transitions)
- [ ] Create Footer component
- [ ] Build individual project detail pages (optional)
- [ ] Deploy to Vercel
- [ ] Set up GitHub repository for version control
