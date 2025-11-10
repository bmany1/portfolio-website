# Sanity CMS Setup Guide

## Step 1: Create a Sanity Account & Project

1. Visit: https://www.sanity.io/manage
2. Sign up or log in (free account)
3. Click "Create new project"
4. Project name: `Bryan Many Portfolio` (or whatever you prefer)
5. Keep the dataset name as: `production`

## Step 2: Get Your Project ID

After creating the project, you'll see a **Project ID** (looks like: `abc12xyz`)

## Step 3: Add Project ID to Your Environment Variables

1. Open the file: `.env.local` in the root of this project
2. Replace `your-project-id-here` with your actual Project ID
3. Save the file

Your `.env.local` should look like:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

## Step 4: Configure CORS (Allow your local dev server)

1. In your Sanity project dashboard (https://www.sanity.io/manage)
2. Go to **Settings** → **API Settings**
3. Under **CORS Origins**, click **Add CORS origin**
4. Add: `http://localhost:3000`
5. Check **Allow credentials**
6. Click **Save**

## Step 5: Start the Dev Server & Access Studio

1. Restart your dev server: `npm run dev`
2. Visit: http://localhost:3000/studio
3. Log in with your Sanity account
4. You'll see your Studio with "Project" and "About" content types!

## What You Can Do in Sanity Studio

- **Projects**: Add your portfolio projects with images, descriptions, tech stack
- **About**: Update your bio, profile image, social links, skills

All content will be editable through the visual Studio interface at `/studio`!
