# 🚀 Deployment Guide - Double Lovers Eyewear

## Overview

Your React website can be deployed separately from Shopify and connected via the Storefront API. This gives you the best of both worlds:
- Modern React frontend with AI features
- Shopify backend for products and checkout

---

## Option 1: Deploy to Vercel (Recommended ✅)

### Step 1: Prepare Your Project

The project is already built and ready! Just make sure you have:
- ✅ `vercel.json` configured
- ✅ Production build tested
- ✅ `.env.local` with your keys (not committed to git)

### Step 2: Deploy to Vercel

**Via CLI:**

```bash
# Make sure you're in the project root
cd /Users/user/Downloads/double-lovers-eyewear

# Deploy to production
vercel --prod
```

**Important:** When prompted:
- Project name: `double-lovers-eyewear` (use lowercase, hyphens only)
- Root directory: `./` (current directory)
- Build command: `npm run build`
- Output directory: `dist`
- Framework: None/Other

### Step 3: Add Environment Variables on Vercel

After deployment, go to your Vercel dashboard:

1. Go to **Project Settings** → **Environment Variables**
2. Add these variables:

```
VITE_GEMINI_API_KEY=your-gemini-api-key
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
VITE_SHOPIFY_API_VERSION=2024-01
```

3. **Redeploy** after adding variables (Vercel will prompt)

### Step 4: Test Your Deployment

Visit your Vercel URL (e.g., `https://double-lovers-eyewear.vercel.app`) and verify:
- Products load from Shopify
- AI Stylist works
- Checkout redirects to Shopify

---

## Option 2: Deploy to Netlify

### Quick Deploy:

1. **Drag & Drop:**
   - Go to https://app.netlify.com/drop
   - Drag the `dist` folder
   - Done!

2. **Add Environment Variables:**
   - Go to **Site settings** → **Environment variables**
   - Add the same variables as Vercel

3. **Connect Git (Optional):**
   - Better for continuous deployment
   - Build command: `npm run build`
   - Publish directory: `dist`

---

## Option 3: Deploy to Shopify Hydrogen (Advanced)

If you want to migrate to Shopify's official React framework:

### Prerequisites:
- Shopify Partner account
- More complex setup

### Steps:
```bash
npm create @shopify/hydrogen@latest
# Then migrate components manually
```

**Note:** This requires significant refactoring but gives you native Shopify + React integration.

---

## What About the `shopify-theme` Folder?

You have two options:

### A. Keep Both (Recommended)
- **React App** (main site): Modern, fast, AI-powered
- **Shopify Theme**: Backup, or for specific pages

### B. Use Only React App
The Shopify theme isn't needed if you're going fully headless.

---

## Connecting Your Custom Domain

### On Vercel:
1. Go to **Project Settings** → **Domains**
2. Add your domain (e.g., `doublelovers.com`)
3. Update DNS records as instructed

### On Shopify:
1. In Shopify Admin → **Online Store** → **Domains**
2. Connect your domain
3. Point to your Vercel/Netlify deployment

---

## Current Architecture

```
┌─────────────────────────────────────────────┐
│  Your React App (Vercel/Netlify)            │
│  - Product browsing                         │
│  - AI Virtual Stylist                       │
│  - Modern UI/UX                             │
└──────────────┬──────────────────────────────┘
               │
               │ Storefront API
               ↓
┌─────────────────────────────────────────────┐
│  Shopify (Backend)                          │
│  - Product management                       │
│  - Inventory                                │
│  - Checkout & payments                      │
│  - Order management                         │
└─────────────────────────────────────────────┘
```

---

## Troubleshooting

### Build Fails on Vercel?
- Make sure `package.json` has all dependencies
- Check that `dist` folder is being created
- Verify Node.js version (18+)

### Products Not Loading?
- Check environment variables are set
- Verify Shopify Storefront API token is valid
- Check browser console for errors

### AI Stylist Not Working?
- Verify `VITE_GEMINI_API_KEY` is set correctly
- Check API quota at https://aistudio.google.com

---

## Next Steps After Deployment

1. **Test thoroughly** on mobile and desktop
2. **Add your products** in Shopify Admin
3. **Configure checkout** in Shopify settings
4. **Set up analytics** (Google Analytics, etc.)
5. **Configure domain** to point to your deployment
6. **Monitor performance** with Vercel/Netlify analytics

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Shopify Storefront API:** https://shopify.dev/docs/api/storefront
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html

Good luck! 🚀

