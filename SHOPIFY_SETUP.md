# 🛍️ Shopify Storefront API Setup Guide

Your React app is now live at: **https://double-lovers-eyewear.vercel.app**

To connect it to your Shopify store, follow these steps:

---

## Step 1: Create a Custom App in Shopify

### 1.1 Access Your Shopify Admin
Go to: `https://your-store.myshopify.com/admin`

Replace `your-store` with your actual store name. Based on your terminal history, it looks like your store is: **turnout-9800.myshopify.com**

### 1.2 Enable Custom App Development (if needed)

1. Go to **Settings** (bottom left)
2. Click **Apps and sales channels**
3. Click **Develop apps** (top right)
4. If you see a button to "Allow custom app development", click it and confirm

### 1.3 Create Your Custom App

1. Click **"Create an app"**
2. App name: `Double Lovers Storefront`
3. App developer: Select yourself
4. Click **Create app**

---

## Step 2: Configure Storefront API Permissions

### 2.1 Configure API Scopes

1. In your new app, go to the **Configuration** tab
2. Find the **Storefront API** section
3. Click **Configure**
4. Enable these scopes:
   - ✅ `unauthenticated_read_product_listings`
   - ✅ `unauthenticated_read_product_inventory`
   - ✅ `unauthenticated_read_product_tags`
   - ✅ `unauthenticated_read_checkouts`
   - ✅ `unauthenticated_write_checkouts`

5. Click **Save**

### 2.2 Install the App

1. Go to the **API credentials** tab
2. Click **Install app** button
3. Confirm the installation

---

## Step 3: Get Your API Credentials

### 3.1 Copy Your Storefront Access Token

1. Still in the **API credentials** tab
2. Under **Storefront API access token**, click **Reveal token once**
3. **COPY THIS TOKEN** - you'll need it in the next step

Your token looks like: `shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 3.2 Note Your Store Domain

Your store domain format: `your-store.myshopify.com`

Example: `turnout-9800.myshopify.com`

---

## Step 4: Add Environment Variables to Vercel

Now that you have your Shopify credentials, add them to Vercel:

### 4.1 Via Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/ftodmxsg-cmds-projects/double-lovers-eyewear
2. Click **Settings** → **Environment Variables**
3. Add these 3 variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SHOPIFY_STORE_DOMAIN` | `your-store.myshopify.com` | Production, Preview, Development |
| `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | `shpat_xxxxx...` | Production, Preview, Development |
| `VITE_SHOPIFY_API_VERSION` | `2024-01` | Production, Preview, Development |

4. Click **Save** for each variable

### 4.2 Via CLI (Alternative)

Or run these commands in your terminal:

```bash
cd /Users/user/Downloads/double-lovers-eyewear

# Add Shopify store domain
vercel env add VITE_SHOPIFY_STORE_DOMAIN production

# When prompted, enter: your-store.myshopify.com

# Add Shopify access token
vercel env add VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN production

# When prompted, paste your token

# Add API version
vercel env add VITE_SHOPIFY_API_VERSION production

# When prompted, enter: 2024-01
```

---

## Step 5: Add Gemini API Key (for AI Stylist)

### 5.1 Get Your Gemini API Key

1. Go to: https://aistudio.google.com/app/apikey
2. Click **Create API Key**
3. Copy the key

### 5.2 Add to Vercel

**Via Dashboard:**
- Add variable: `VITE_GEMINI_API_KEY`
- Value: Your Gemini API key

**Via CLI:**
```bash
vercel env add VITE_GEMINI_API_KEY production
# Then paste your key
```

---

## Step 6: Redeploy Your App

After adding all environment variables, redeploy:

### 6.1 Via Dashboard
1. Go to: https://vercel.com/ftodmxsg-cmds-projects/double-lovers-eyewear
2. Click **Deployments**
3. Click on the latest deployment
4. Click **Redeploy** button

### 6.2 Via CLI
```bash
vercel --prod --yes
```

---

## Step 7: Test Your Integration

### 7.1 Visit Your Live Site
https://double-lovers-eyewear.vercel.app

### 7.2 Check These Features:

✅ **Products Load**
- You should see real products from your Shopify store
- If you see mock products, environment variables aren't set correctly

✅ **Product Details**
- Click on a product
- Verify images, description, and price load correctly

✅ **AI Stylist**
- Go to Virtual Stylist page
- Upload a photo or describe preferences
- Verify AI recommendations work

✅ **Checkout**
- Click "Add to Cart" or "Buy Now"
- Verify it redirects to your Shopify checkout
- Test completing a purchase (use test mode)

---

## Troubleshooting

### Products Not Loading?

**Check browser console (F12):**

```javascript
// If you see: "⚠️ Shopify credentials not configured"
// → Environment variables aren't set or app wasn't redeployed

// If you see: "Failed to fetch" or CORS errors
// → Check your Storefront API token is valid and has correct permissions
```

**Verify environment variables:**
```bash
vercel env ls
```

### AI Stylist Not Working?

- Check `VITE_GEMINI_API_KEY` is set
- Verify API key is valid at https://aistudio.google.com
- Check API quota isn't exceeded

### Checkout Not Working?

- Verify checkout scopes are enabled in Shopify app
- Make sure your Shopify store is not password-protected
- Check that products are published and available for sale

---

## Security Best Practices

✅ **Do:**
- Keep your Storefront Access Token private
- Use environment variables (never hardcode tokens)
- Regularly rotate your API keys
- Monitor API usage

❌ **Don't:**
- Commit `.env.local` to git (it's already in `.gitignore`)
- Share your access tokens publicly
- Use Admin API tokens for frontend (use Storefront API only)

---

## Your Current Setup

```
📍 Live Site: https://double-lovers-eyewear.vercel.app
📍 Vercel Dashboard: https://vercel.com/ftodmxsg-cmds-projects/double-lovers-eyewear
📍 Shopify Admin: https://turnout-9800.myshopify.com/admin (assumed)
```

---

## Next Steps

1. ✅ **Add products** in Shopify Admin → Products
2. ✅ **Configure checkout** in Shopify Settings → Checkout
3. ✅ **Set up payment providers** (Shopify Payments, Stripe, etc.)
4. ✅ **Test orders** using Shopify's test mode
5. ✅ **Add custom domain** in Vercel settings
6. ✅ **Set up analytics** (Google Analytics, etc.)

---

## Need Help?

- **Shopify Docs:** https://shopify.dev/docs/api/storefront
- **Vercel Docs:** https://vercel.com/docs
- **Your Deployment:** Check logs with `vercel logs`

🎉 **Congratulations!** Your headless storefront is live!

