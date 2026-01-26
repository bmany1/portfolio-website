# Content Management Guide

Your website is connected to Sanity CMS. All content is managed through the visual Studio interface.

## Accessing Sanity Studio

1. Make sure your dev server is running: `npm run dev`
2. Visit: **http://localhost:3000/studio**
3. Log in with your Sanity account

## Content Types Overview

The Studio contains **6 content types**:

| Type | Purpose |
|------|---------|
| **Project** | Portfolio projects (add as many as needed) |
| **About** | About page content (singleton) |
| **Homepage** | Hero, companies, "What I Do", featured work sections (singleton) |
| **Site Settings** | Email, social links, default OG image (singleton) |
| **Projects Page Settings** | Page header and footer CTA (singleton) |
| **Contact Page Settings** | Page copy and Formspree form ID (singleton) |

---

## Managing Homepage Content

The **Homepage** document controls all content on the landing page.

### Hero Section
- **Heading**: Main headline (e.g., "I design solutions, one product at a time.")
- **Bio**: Short description under the heading
- **Headshot Image**: Professional photo
- **Resume PDF**: Upload your resume (hosted by Sanity CDN)
- **Resume Link Text**: Button text (default: "View Resume")

### Where I've Worked Section
- **Section Title**: Header text
- **Companies**: Add company name + logo (white/transparent logos work best on dark background). Maximum 6 companies.

### What I Do Section
- **Columns**: Exactly 3 columns, each with a title, description, and list of items

### Featured Work Section
- **Eyebrow Text**: Small text above title (e.g., "SELECTED WORK")
- **Section Title**: Main heading
- **Description**: Brief intro text
- **CTA Text**: "View all projects" link text

### Contact CTA Section
- **Heading**: Call-to-action headline
- **Subtext**: Supporting text
- **Button Text**: Button label

---

## Site Settings

The **Site Settings** document contains global configuration used across the site.

- **Site Name**: Your name (used in page titles)
- **Site Description**: SEO meta description
- **Default OG Image**: Fallback image for social sharing (1200x630px optimal). Used when pages don't have their own image.
- **Email**: Primary contact email
- **Social Links**: Add platforms (LinkedIn, GitHub, Twitter/X) with URLs

---

## Adding Projects

1. In Sanity Studio, click **Project** in the sidebar
2. Click **Create new Project** (the + button)
3. Fill in the fields:

### Required Fields
- **Title**: Project name (e.g., "E-Commerce Platform Redesign")
- **Slug**: Click "Generate" to auto-create from title
- **Description**: Brief summary (120 characters max for best display on cards)

### Image Fields
- **Card Image**: Shown on project cards and listings. Optimal: 1600x1000px (16:10 ratio). Also used for social sharing.
- **Hero Image**: Large masthead image on project detail page. Optimal: 1920x1080px (16:9 ratio)

### Optional Fields
- **Featured Project**: Toggle ON to display on homepage (2-4 recommended)
- **Technologies**: Add tags (e.g., "Product Strategy", "UX Design")
- **Project URL**: Link to live project
- **GitHub URL**: Link to code repository
- **Project Details**: Rich text content with support for:
  - Text with headings (H1, H2, H3)
  - Images with alt text
  - Videos with poster images and captions
- **Display Order**: Lower numbers appear first

4. Click **Publish**

---

## Setting Up Your About Page

1. In Sanity Studio, click **About** in the sidebar
2. Create or edit the About document

### Required Fields
- **Title**: Your name (e.g., "Bryan Many")
- **Bio**: Rich text editor for your biography (2-3 paragraphs)

### Optional Fields
- **Profile Image**: Headshot photo (also used for social sharing)
- **Skills**: Individual skills as separate items

**Note**: Email and social links are now managed in **Site Settings**, not here.

---

## Projects Page Settings

Controls the /projects listing page.

- **Eyebrow Text**: Small text above title (e.g., "PORTFOLIO")
- **Title**: Page heading (e.g., "All Projects")
- **Description**: Intro paragraph
- **Footer CTA**: Call-to-action at page bottom
  - **Text**: The prompt (e.g., "Have a project in mind?")
  - **Link Text**: The clickable link (e.g., "Let's talk")

---

## Contact Page Settings

Controls the /contact page.

- **Eyebrow Text**: Small text above heading
- **Heading**: Main page title
- **Description**: Text below heading
- **Formspree Form ID**: Required for the contact form to work. Get your ID from [formspree.io/forms](https://formspree.io/forms)

---

## How Content Appears on Your Site

### Homepage (/)
- Hero section with heading, bio, headshot, and resume link
- "Where I've Worked" company logos
- "What I Do" three-column layout
- Featured projects (projects with "Featured" toggled ON)
- Contact CTA section

### Projects Page (/projects)
- Shows ALL published projects
- Sorted by Display Order (lowest to highest)
- Uses header/footer from Projects Page Settings

### Project Detail Pages (/projects/[slug])
- Hero image at top
- Full Project Details content (rich text, images, videos)
- Technologies and links

### About Page (/about)
- Profile image, name, bio
- Skills list
- Social links from Site Settings

### Contact Page (/contact)
- Page copy from Contact Page Settings
- Formspree-powered contact form

---

## Tips for Best Results

### Images
- **Card images**: 1600x1000px (16:10 ratio), 85% quality
- **Hero images**: 1920x1080px (16:9 ratio), 90% quality
- **OG images**: 1200x630px (1.91:1 ratio) for social sharing
- **Profile photos**: Square images work best
- All images are automatically optimized (WebP conversion, 60-80% file size reduction)

### Social Sharing (OG Images)
The site automatically generates Open Graph images for social media previews:
- **Homepage/Contact/Projects listing**: Uses default OG image from Site Settings
- **About page**: Uses profile image, falls back to default
- **Project detail pages**: Uses card image, falls back to hero image, then default

### Featured Projects
- Mark 2-4 of your best projects as "Featured"
- These appear on the homepage
- All projects still appear on the /projects page

### Display Order
- Use 0, 1, 2, 3, etc. to control project order
- Leave gaps (0, 10, 20) to make reordering easier later

### Technologies/Skills
- Keep them concise (2-3 words max)
- Be consistent with naming (e.g., always "Next.js" not "NextJS")

---

## Content Updates & Caching

- Edit any document in Sanity Studio and click **Publish**
- **Local development**: Changes appear immediately on refresh
- **Production**: A webhook automatically purges the CDN cache, so changes typically appear within seconds

If changes aren't appearing in production, the webhook may need configuration. See `WEBHOOK_SETUP.md`.

---

## Next Steps

1. Set up Site Settings (email, social links, OG image)
2. Configure Homepage content (hero, companies, what I do)
3. Add your first project
4. Set up your About page
5. Configure Contact Page Settings with your Formspree ID

Your site will automatically pull and display all this content!
