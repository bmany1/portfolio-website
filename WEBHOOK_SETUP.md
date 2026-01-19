# Sanity Webhook Setup for Cache Revalidation

This guide explains how to configure Sanity webhooks to automatically purge the CDN cache when you publish new content.

## Why You Need This

With CDN caching enabled, Sanity content is cached for up to 60 seconds. This means:
- ✅ **Fast page loads** (CDN serves cached responses)
- ⚠️ **Delayed updates** (new content takes up to 60s to appear)

**Webhooks solve this** by triggering immediate cache invalidation when you publish, giving you:
- ✅ Fast page loads from CDN
- ✅ Instant content updates (no waiting!)

---

## Setup Instructions

### Step 1: Generate a Secure Revalidation Secret

1. Generate a random secret string (at least 32 characters)
   - You can use: https://generate-secret.vercel.app/32
   - Or run: `openssl rand -base64 32` in your terminal

2. Add the secret to your **local** `.env.local` file:
   ```bash
   REVALIDATE_SECRET=your_secure_random_secret_here
   ```

3. Add the same secret to **Vercel** environment variables:
   - Go to: https://vercel.com/bmany1/portfolio-website/settings/environment-variables
   - Add new variable:
     - **Name**: `REVALIDATE_SECRET`
     - **Value**: (paste your secret)
     - **Environments**: Production, Preview, Development
   - Click "Save"

4. **Redeploy** your site for the environment variable to take effect:
   - Go to: https://vercel.com/bmany1/portfolio-website/deployments
   - Click "Redeploy" on the latest deployment

---

### Step 2: Configure Sanity Webhook

1. Go to your Sanity project dashboard:
   - https://www.sanity.io/manage (select your project)

2. Navigate to **API** → **Webhooks** (left sidebar)

3. Click **"Create webhook"**

4. Configure the webhook:

   **Name**:
   ```
   Production Cache Revalidation
   ```

   **URL**:
   ```
   https://portfolio-website-gamma-seven-65.vercel.app/api/revalidate?secret=YOUR_REVALIDATE_SECRET
   ```
   ⚠️ **Replace `YOUR_REVALIDATE_SECRET` with your actual secret from Step 1**

   **Dataset**:
   - Select: `production`

   **Trigger on**:
   - ✅ Create
   - ✅ Update
   - ✅ Delete

   **Filter** (optional - leave blank to revalidate on all changes):
   ```groq
   _type in ["project", "homepage", "about", "contactPageSettings", "projectsPageSettings", "siteSettings"]
   ```
   This limits revalidation to only content types that affect your public site.

   **HTTP method**:
   - Select: `POST`

   **API version**:
   - Select: `v2021-06-07` (or latest)

   **Include drafts**:
   - ❌ Unchecked (only trigger on published content)

   **HTTP Headers** (optional):
   - Leave empty (not needed for this setup)

5. Click **"Save"**

---

### Step 3: Test the Webhook

1. Go to Sanity Studio: http://localhost:3000/studio (or your production URL)

2. Make a small change to a project:
   - Edit a project title or description
   - Click **"Publish"**

3. Check the webhook log:
   - Go back to Sanity dashboard → API → Webhooks
   - Click on your webhook
   - View the **"Deliveries"** tab
   - You should see a successful delivery (green checkmark)

4. Verify the cache was cleared:
   - Visit your production site
   - The change should appear **immediately** (not after 60 seconds)

---

## How It Works

When you publish content in Sanity:

1. **Sanity** detects the change and triggers the webhook
2. **Webhook** sends a POST request to `/api/revalidate?secret=YOUR_SECRET`
3. **API endpoint** validates the secret and identifies the content type
4. **Next.js** invalidates the cache for affected pages:
   - `project` changes → revalidate `/`, `/projects`, `/projects/[slug]`
   - `homepage` changes → revalidate `/`
   - `about` changes → revalidate `/about`
   - etc.
5. **Next request** to those pages fetches fresh data from Sanity

---

## Troubleshooting

### Webhook shows "401 Unauthorized"
- ❌ Secret doesn't match
- ✅ Check that `REVALIDATE_SECRET` in Vercel matches the URL parameter
- ✅ Make sure you redeployed after adding the environment variable

### Webhook shows "500 Internal Server Error"
- ❌ API endpoint has a bug
- ✅ Check Vercel deployment logs for errors
- ✅ Ensure Next.js build succeeded

### Content updates still take 60 seconds to appear
- ❌ Webhook not triggering or failing
- ✅ Check webhook delivery logs in Sanity dashboard
- ✅ Verify environment variable is set in Vercel
- ✅ Make sure you're testing on production, not localhost

### Webhook works but cache not clearing
- ❌ Wrong path being revalidated
- ✅ Check console logs in Vercel to see which paths are revalidated
- ✅ Verify the `_type` in the webhook payload matches the API logic

---

## Security Notes

⚠️ **Keep your `REVALIDATE_SECRET` confidential!**

- ❌ Never commit it to Git
- ❌ Never share it publicly
- ✅ Store it only in `.env.local` (gitignored) and Vercel environment variables
- ✅ Use a strong random string (32+ characters)

If your secret is compromised:
1. Generate a new secret
2. Update `.env.local` and Vercel environment variables
3. Update the Sanity webhook URL
4. Redeploy your site

---

## Advanced: Multiple Environments

If you have staging/preview deployments:

1. Create separate webhooks for each environment:
   - **Production webhook**: `https://bryanmany.com/api/revalidate?secret=PROD_SECRET`
   - **Preview webhook**: `https://preview.bryanmany.com/api/revalidate?secret=PREVIEW_SECRET`

2. Use different secrets for each environment

3. Configure webhooks to trigger on different datasets:
   - Production → `production` dataset
   - Preview → `development` dataset (if you have one)

---

## Summary Checklist

- ✅ Generated secure random secret (32+ characters)
- ✅ Added `REVALIDATE_SECRET` to `.env.local`
- ✅ Added `REVALIDATE_SECRET` to Vercel environment variables
- ✅ Redeployed site after adding environment variable
- ✅ Created webhook in Sanity dashboard
- ✅ Tested webhook by publishing content
- ✅ Verified deliveries in Sanity webhook logs
- ✅ Confirmed content updates appear immediately

**You're all set!** Content updates will now appear instantly on your live site. 🎉
