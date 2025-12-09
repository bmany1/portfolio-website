# Portfolio Website - Experimental Redesign

## Branch Info
**Branch**: `experimental-redesign` (separate from production `main` branch)
**Preview URL**: Check Vercel dashboard for latest preview deployment
**Production URL** (main branch): https://portfolio-website-gamma-seven-65.vercel.app/

## Project Overview
Experimental redesign of Bryan Many's portfolio with a "Terminal Noir" aesthetic - a sophisticated, code-inspired dark theme with premium scroll animations. Inspired by microsoft.ai, titangatequity.com, and izum.study.

**GitHub**: https://github.com/bmany1/portfolio-website

## Tech Stack

### Core
- **Next.js 16.0.7** (App Router, Turbopack)
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Scroll animations, useScroll, useTransform
- **GSAP + ScrollTrigger** - Advanced scroll-pinned animations
- **Sanity.io** - Headless CMS at `/studio` route

### Design System: "Terminal Noir"

**Colors:**
- Background: `#0a0a0b` (near-black), `#111113`, `#18181b`
- Text: `#fafafa` (primary), `#a1a1aa` (secondary), `#52525b` (muted)
- Accents: `#00f0ff` (cyan), `#ff3366` (pink), `#ffd700` (gold)

**Typography:**
- Display: Space Grotesk (geometric, modern)
- Body: Outfit (clean, readable)
- Code/Mono: JetBrains Mono (terminal aesthetic)

**Effects:**
- Noise texture overlay
- Animated grid background with floating glow orbs
- Custom cursor (dot + ring)
- Particle field that responds to mouse

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Experimental homepage (scroll sections)
│   ├── layout.tsx            # New fonts + background effects
│   ├── globals.css           # Terminal Noir design system
│   └── [other pages]         # About, Projects, Contact, Studio
├── components/
│   ├── experimental/         # NEW: Experimental redesign components
│   │   ├── ParticleField.tsx       # Interactive particle background
│   │   ├── CustomCursor.tsx        # Custom cursor with hover states
│   │   ├── TextScramble.tsx        # Text scramble animation effect
│   │   ├── NavigationExperimental.tsx  # New nav with scroll hide
│   │   ├── HeroExperimental.tsx    # Scroll-pinned hero section
│   │   ├── AboutSection.tsx        # Skills + terminal card
│   │   ├── ProjectsShowcase.tsx    # Interactive project cards
│   │   ├── ExperienceTimeline.tsx  # Animated timeline
│   │   └── ContactSection.tsx      # Terminal-style contact
│   └── [original components] # Kept for reference/other pages
├── sanity/                   # CMS (unchanged)
└── lib/                      # Utilities (unchanged)
```

## Key Components

### ParticleField.tsx
Canvas-based particle system with mouse interaction. Particles push away from cursor and return with easing. Connected dots create network effect.

### CustomCursor.tsx
Dual-layer cursor (dot + ring) using Framer Motion springs. Scales up on hoverable elements (links, buttons, `data-cursor="hover"`).

### TextScramble.tsx
Text scramble/decode effect triggered on scroll into view. Characters cycle through random glyphs before revealing final text.

### HeroExperimental.tsx
- GSAP character-by-character reveal animation
- Framer Motion `useScroll` + `useTransform` for parallax
- Words wrapped in `whitespace-nowrap` to prevent mid-word breaks
- Scroll indicator with pulsing animation

### AboutSection.tsx
- Animated skill bars with gradient fills
- Stats counter (years, products, users)
- Terminal-style card with fake command output

### ProjectsShowcase.tsx
- Large cards with hover border glow
- Image zoom on hover
- Technology tags with hover effects
- Project numbers that change color on hover

### ExperienceTimeline.tsx
- Vertical timeline with scroll-linked progress line
- Alternating card layout on desktop
- Animated timeline dots

### ContactSection.tsx
- Terminal boot sequence animation
- Real-time clock display
- Email reveal with typing effect
- Social links as terminal output

## Animation Patterns

### Scroll-Linked (Framer Motion)
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: [...] });
const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
```

### GSAP Character Animation
```tsx
gsap.fromTo(chars,
  { y: 100, opacity: 0, rotateX: -90 },
  { y: 0, opacity: 1, rotateX: 0, stagger: 0.03 }
);
```

### Viewport Triggers
```tsx
const isInView = useInView(ref, { once: true, margin: "-100px" });
```

## CSS Variables (globals.css)

Key custom properties for the design system:
- `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- `--text-primary`, `--text-secondary`, `--text-muted`
- `--accent-primary` (cyan), `--accent-secondary` (pink)
- `--border-subtle`, `--border-accent`
- `--ease-out-expo`, `--ease-out-quart` (animation curves)

## Key Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

## Development Notes

### Adding Hover Effects
Add `data-cursor="hover"` to any element for custom cursor interaction:
```tsx
<button data-cursor="hover">Click me</button>
```

### Preventing Text Wrap Issues
For animated text, wrap words (not just characters) to prevent mid-word breaks:
```tsx
{text.split(" ").map(word => (
  <span className="inline-block whitespace-nowrap">...</span>
))}
```

### Scroll Section Pattern
For scroll-pinned sections, use the sticky container pattern:
```tsx
<section className="min-h-[200vh]">
  <div className="sticky top-0 h-screen">
    {/* Content animates based on scroll */}
  </div>
</section>
```

## Status

**Current (experimental-redesign branch):**
- Homepage redesign complete with all scroll sections
- Interactive backgrounds and cursor working
- Responsive design needs refinement
- Other pages (About, Projects, Contact) still use original design

**Not Yet Updated:**
- Individual project pages
- About page
- Contact page
- Mobile animations (some disabled for performance)

## Quick Reference

**Preview**: Check Vercel dashboard for `experimental-redesign` deployment
**Production** (main): https://portfolio-website-gamma-seven-65.vercel.app/
**Sanity Studio**: /studio route
**GitHub**: https://github.com/bmany1/portfolio-website

**User Context**: Product manager learning to code. This experimental branch explores cutting-edge UI/UX patterns while keeping the stable production site separate.
