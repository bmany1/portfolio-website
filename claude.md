# Portfolio Website - Claude Context

## Project Overview
Portfolio website for Bryan Many (Product Manager). Next.js 14 + TypeScript + Tailwind CSS + Framer Motion + Sanity.io CMS. Deployed on Vercel at https://portfolio-website-gamma-seven-65.vercel.app/

**GitHub**: https://github.com/bmany1/portfolio-website

## Tech Stack & Design

### Core
- **Next.js 16.0.8** (App Router, Turbopack)
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Animations
- **Sanity.io** - Headless CMS at `/studio` route

### Theme
- **Navy dark**: #2F2E2E background, #FFFFFF text
- **Golden-yellow accent**: #FBBF24 for CTAs/highlights
- **Typography**: Inter (sans-serif) + Fira Code (monospace)
- Inspired by danielroren.com (colors) and justinhinh.webflow.io (layout)

### Deployment
- **Vercel** - Auto-deploy from GitHub
- **Domain**: bryanmany.com (pending transfer from Squarespace)
- **Dependabot**: Weekly security scans enabled

## Project Structure (Simplified)

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── projects/
│   │   ├── page.tsx          # Projects listing
│   │   └── [slug]/page.tsx   # Project detail pages (SSG)
│   ├── about/page.tsx        # About page
│   ├── contact/page.tsx      # Contact form (Formspree)
│   ├── studio/               # Embedded Sanity Studio
│   ├── api/revalidate/       # Webhook for CDN cache purging
│   ├── error.tsx             # Error boundary
│   └── not-found.tsx         # 404 page
├── components/
│   ├── Navigation.tsx        # Animated nav
│   ├── ProjectCard.tsx       # Shared card component
│   ├── ContactForm.tsx       # Form with Formspree
│   └── [other components]
├── sanity/
│   ├── schemas/              # CMS content types
│   ├── client.ts             # Sanity config (CDN in prod)
│   └── queries.ts            # GROQ queries with error handling
└── lib/
    └── sanity-image.ts       # Image optimization utilities
```

## Sanity CMS Schemas

All content managed through Sanity Studio at `/studio`:

- **homepage** (singleton) - Hero, What I Do, Featured Work sections
- **siteSettings** (singleton) - Email, social links (global)
- **project** - Title, slug, cardImage, heroImage, content (PortableText with images/videos), tech stack
- **about** - Bio, skills, profile image
- **projectsPageSettings** (singleton) - Page header + footer CTA
- **contactPageSettings** (singleton) - Page copy + Formspree ID

## Critical Technical Details

### Animations Architecture
- Server components pass data to client components for animations
- Framer Motion with `once: true` for scroll triggers (no re-animation)
- Page transitions via `template.tsx` (also handles scroll-to-top on navigation)
- `useInView` hook with negative margins for earlier triggers
- 150ms transitions for snappy hover effects

### Image Optimization
- Sanity CDN with automatic WebP conversion
- `getCardImageUrl()`: 1600px, 85% quality, 16:10 ratio
- `getHeroImageUrl()`: 1920px, 90% quality, 16:9 ratio
- Retroactive optimization (existing images auto-optimized)
- 60-80% file size reduction typical

### Error Handling & Reliability
- All Sanity queries wrapped in try/catch with graceful fallbacks
- Arrays return `[]` on error, singletons return `null`
- Error boundary catches component crashes
- Branded 404 page for missing routes
- Console errors prefixed with `[Sanity]`

### Performance Optimization
- Sanity CDN enabled in production: `useCdn: process.env.NODE_ENV === "production"`
- 30-50% faster page loads via edge caching
- Webhook system (`/api/revalidate`) for instant cache invalidation
- `REVALIDATE_SECRET` env var for webhook security

### Code Organization
- ProjectCard component shared between FeaturedProjects and ProjectsGrid
- PortableText supports images (with alt text), videos (with poster), H1/H2/H3 styling
- Social links in siteSettings (reusable across site)
- Resume PDF hosted in Sanity

## Key Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

## Environment Variables (.env.local)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
REVALIDATE_SECRET=your-webhook-secret
```

## Setup Documentation

- **SETUP.md** - Instructions for new computer setup
- **WEBHOOK_SETUP.md** - Sanity webhook configuration (CDN cache purging)
- **SANITY_SETUP.md** - Sanity CMS setup instructions

## Current Status (as of 2025-12-29)

**✅ Production-Ready Features:**
- All pages built and deployed (Home, Projects, About, Contact)
- All content managed through Sanity CMS
- Comprehensive animations (parallax, scroll reveals, hover effects)
- Error handling (404, error boundary, query fallbacks)
- Image/video optimization via Sanity CDN
- Contact form (Formspree integration)
- Project detail pages with rich content
- Responsive design (mobile-first)
- Security updates automated (Dependabot)
- Mobile scroll behavior fixed (Chrome iOS, Safari)

**⏳ Pending:**
- Domain transfer from Squarespace to Vercel
- Analytics setup (optional)
- SEO meta tags (optional)

## Recent Updates

### 2025-12-29: About Page CTA Update
- Replaced "Email Me" mailto button with "Contact Me" link to /contact page
- Drives users to the contact form instead of opening email client

### 2025-12-09: Mobile Scroll Fix
- Fixed scroll position persistence on iOS (Chrome and Safari)
- Issue: navigating between pages kept previous scroll position
- Solution: Multi-strategy scroll reset in `template.tsx`:
  - `useLayoutEffect` with `history.scrollRestoration = "manual"`
  - Double `requestAnimationFrame` to beat browser restoration timing
  - 100ms fallback timeout for form pages and edge cases
- Tested via BrowserStack on iPhone 15 Pro Max

### 2025-12-08: Security Patch
- Updated Next.js 16.0.1 → 16.0.7 (CVE-2025-66478)
- Updated React 19.2.0 → 19.2.1 (CVE-2025-55182)
- Configured Dependabot for weekly security scans

### 2025-12-02: Session 9 Testing
- Verified all Session 9 optimizations in production
- Configured Sanity webhook for instant content updates
- All systems operational

### 2025-11-29: Session 9 Optimizations
- Enabled Sanity CDN in production (30-50% faster page loads)
- Extracted shared ProjectCard component (eliminated 147 lines duplication)
- Added comprehensive error handling to all Sanity queries
- Created 404 page and error boundary
- Built webhook system for CDN cache invalidation

## Quick Reference

**Production URL**: https://portfolio-website-gamma-seven-65.vercel.app/
**Sanity Studio**: https://portfolio-website-gamma-seven-65.vercel.app/studio
**GitHub**: https://github.com/bmany1/portfolio-website

**User Context**: Product manager learning to code. Updates portfolio a few times per year. Prioritizes quality over speed.

---

## RESOLVED: Sanity Studio EventSource Connection Issue (2025-12-13)

### Problem (Now Fixed)
Sanity Studio showed "Trying to connect..." indefinitely with error:
```
Error: Failed to establish EventSource connection
```

### Root Cause
**TotalAV WebShield** was blocking Server-Sent Events (SSE) connections to Sanity's real-time API. Antivirus web scanners see `text/event-stream` responses as suspicious "never-ending downloads" and block them.

Key evidence:
- `curl` worked perfectly (bypasses browser/antivirus)
- Browser EventSource failed with `net::ERR_ABORTED`
- Disabling TotalAV WebShield immediately fixed the issue

### Solution
**Disable TotalAV WebShield** or add Sanity domains to its Allow List:
- `*.sanity.io`
- `*.api.sanity.io`

### Changes Made During Troubleshooting (Keep These)
1. **`next.config.ts`** - Added `serverExternalPackages: ["jsdom", "isomorphic-dompurify"]` (fixes jsdom v27 bundling issue)
2. **`sanity.cli.ts`** - Created for Sanity CLI commands
3. **`sanity.config.ts`** - Added hardcoded fallbacks for projectId/dataset
4. **`styled-components`** - Added as peer dependency for Sanity
5. **Sanity MCP server** - Installed for Claude Code integration

### Key Takeaway
If Sanity Studio shows connection errors but API works via curl, check for:
1. Antivirus web protection (TotalAV, Norton, etc.)
2. VPN software with web filtering
3. Browser extensions blocking SSE connections

The issue is NOT related to:
- CORS configuration
- Sanity authentication
- Next.js bundling
- Browser choice
