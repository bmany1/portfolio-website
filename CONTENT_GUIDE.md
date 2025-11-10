# Content Management Guide

Your website is now connected to Sanity CMS! You can manage all content through the visual Studio interface.

## Accessing Sanity Studio

1. Make sure your dev server is running: `npm run dev`
2. Visit: **http://localhost:3000/studio**
3. Log in with your Sanity account
4. You'll see two content types: **Project** and **About**

## Adding Your First Project

1. In Sanity Studio, click **Project** in the sidebar
2. Click **Create new Project** (the + button)
3. Fill in the fields:

   **Required Fields:**
   - **Title**: Your project name (e.g., "E-Commerce Platform Redesign")
   - **Slug**: Click "Generate" to auto-create from title
   - **Description**: A brief summary of the project

   **Optional Fields:**
   - **Main Image**: Upload a project screenshot or hero image
   - **Featured Project**: Toggle ON to show on homepage (max 2-3 recommended)
   - **Technologies**: Add skill tags (e.g., "Product Strategy", "UX Design", "React")
   - **Project URL**: Link to the live project
   - **GitHub URL**: Link to the code repository
   - **Project Details**: Rich text area for case study content
   - **Display Order**: Lower numbers appear first (0, 1, 2, etc.)

4. Click **Publish** in the bottom right

## Setting Up Your About Page

1. In Sanity Studio, click **About** in the sidebar
2. Click **Create new About** (there should only be one)
3. Fill in the fields:

   **Required Fields:**
   - **Title**: Your name (e.g., "Bryan Many")
   - **Bio**: Write 2-3 paragraphs about yourself using the rich text editor

   **Optional Fields:**
   - **Profile Image**: Upload your headshot/profile photo
   - **Email**: Your contact email
   - **LinkedIn URL**: Full URL (e.g., https://linkedin.com/in/yourprofile)
   - **Twitter/X URL**: Full URL
   - **GitHub URL**: Full URL
   - **Skills**: Add individual skills as separate items (use the + button)

4. Click **Publish**

## How Content Appears on Your Site

### Homepage
- Shows projects where "Featured Project" is toggled ON
- Displays: Main image, title, description, and technology tags

### Projects Page
- Shows ALL published projects
- Sorted by the "Display Order" field (lowest to highest)
- Displays: Main image, title, description, and technology tags

### About Page
- Shows your bio from the About document
- Displays: Name, bio text, profile image, skills, and social links
- Only shows social buttons for URLs you've filled in

## Tips for Best Results

1. **Images**:
   - Use high-quality images (minimum 1200px wide)
   - Aspect ratio 16:10 works best for project images
   - Square images work best for profile photos

2. **Featured Projects**:
   - Mark 2-4 of your best projects as "Featured"
   - These will appear on the homepage
   - All projects still appear on the Projects page

3. **Display Order**:
   - Use 0, 1, 2, 3, etc. to control project order
   - Lower numbers appear first
   - Leave gaps (0, 10, 20) to make reordering easier later

4. **Technologies/Skills**:
   - Keep them concise (2-3 words max)
   - Be consistent with naming (e.g., always "Next.js" not "NextJS")

## Updating Content

- Simply edit any document in Sanity Studio and click **Publish**
- Refresh your website to see changes (no code deployment needed!)
- Changes appear instantly on your local site
- When deployed to Vercel, changes appear within seconds

## Next Steps

1. Add your first project to test the system
2. Set up your About page with your real bio
3. Upload some project images
4. Mark your best work as "Featured"

Your site will automatically pull and display all this content!
