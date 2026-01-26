# Sanity CMS Setup Guide

## Step 1: Create a Sanity Account & Project

1. Visit: https://www.sanity.io/manage
2. Sign up or log in (free account)
3. Click "Create new project"
4. Project name: `Bryan Many Portfolio` (or whatever you prefer)
5. Keep the dataset name as: `production`

## Step 2: Get Your Project ID

After creating the project, you'll see a **Project ID** (looks like: `abc12xyz`)

## Step 3: Add Environment Variables

1. Open the file: `.env.local` in the root of this project
2. Add the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12xyz
NEXT_PUBLIC_SANITY_DATASET=production
REVALIDATE_SECRET=your-webhook-secret
```

Replace `abc12xyz` with your actual Project ID.

The `REVALIDATE_SECRET` is used for webhook authentication (see Step 6).

## Step 4: Configure CORS (Allow your local dev server)

1. In your Sanity project dashboard (https://www.sanity.io/manage)
2. Go to **Settings** → **API Settings**
3. Under **CORS Origins**, click **Add CORS origin**
4. Add: `http://localhost:3000`
5. Check **Allow credentials**
6. Click **Save**

When deploying to production, also add your production domain (e.g., `https://bryanmany.com`).

## Step 5: Start the Dev Server & Access Studio

1. Restart your dev server: `npm run dev`
2. Visit: http://localhost:3000/studio
3. Log in with your Sanity account
4. You'll see your Studio with all 6 content types:
   - **Project** - Portfolio projects
   - **About** - About page content
   - **Homepage** - Landing page sections
   - **Site Settings** - Email, social links, OG image
   - **Projects Page Settings** - Projects listing page
   - **Contact Page Settings** - Contact form configuration

## Step 6: Configure Webhook (Optional but Recommended)

The webhook enables instant content updates in production by purging the CDN cache when you publish changes.

See `WEBHOOK_SETUP.md` for detailed instructions.

## What You Can Do in Sanity Studio

- **Projects**: Add portfolio projects with images, descriptions, tech stack, and rich content
- **About**: Update your bio, profile image, and skills
- **Homepage**: Edit hero section, company logos, "What I Do" columns, and CTAs
- **Site Settings**: Manage contact email, social links, and default OG image for social sharing
- **Projects Page Settings**: Customize the projects listing page header and footer
- **Contact Page Settings**: Configure page copy and your Formspree form ID

All content is editable through the visual Studio interface at `/studio`.

See `CONTENT_GUIDE.md` for detailed content management instructions.

---

## Troubleshooting

### Studio shows "Trying to connect..." indefinitely

This is often caused by antivirus software (TotalAV, Norton, etc.) blocking Server-Sent Events (SSE) connections.

**Solution**: Disable your antivirus web shield temporarily, or add these domains to its Allow List:
- `*.sanity.io`
- `*.api.sanity.io`

### "Invalid project ID" error

Double-check that your `.env.local` file exists and contains the correct `NEXT_PUBLIC_SANITY_PROJECT_ID` value.

### Cannot access Sanity Studio

Make sure you're logged in with the Sanity account that owns the project. Visit https://www.sanity.io/manage to verify.

---

## Production Deployment

When deploying to Vercel:

1. Add the same environment variables in Vercel's project settings
2. Add your production domain to CORS origins in Sanity (e.g., `https://bryanmany.com`)
3. Configure the webhook for instant cache invalidation (see `WEBHOOK_SETUP.md`)

**Production URL**: https://bryanmany.com
