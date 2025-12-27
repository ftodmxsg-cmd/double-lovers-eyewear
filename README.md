<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Double Lovers Eyewear - AI-Powered Shopify Store

An AI-powered eyewear shopping experience with virtual stylist powered by Google Gemini AI and integrated with Shopify.

View your app in AI Studio: https://ai.studio/apps/drive/1fexTlBxvfKjelRcYAL5PkPuRusauybH1

## Prerequisites

- Node.js (v16 or higher)
- Shopify CLI (optional, for theme development)
- A Shopify store

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Shopify Storefront API

To connect to your Shopify store, you need to create a custom app and get API credentials:

1. **Go to your Shopify Admin** → Settings → Apps and sales channels
2. Click **"Develop apps"** (you may need to enable custom app development first)
3. Click **"Create an app"** and give it a name (e.g., "Double Lovers Storefront")
4. Go to **"Configuration"** tab
5. Under **Storefront API**, click **"Configure"** and enable these permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
6. Click **"Save"**
7. Go to **"API credentials"** tab
8. Copy your **Storefront API access token**

### 3. Set Environment Variables

Create a `.env.local` file in the root directory (or rename `.env.example`):

```bash
# Gemini API Key (get from https://aistudio.google.com/app/apikey)
VITE_GEMINI_API_KEY=your-gemini-api-key-here

# Shopify Configuration
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token-here
VITE_SHOPIFY_API_VERSION=2024-01
```

**Note:** The app will use mock data if Shopify credentials are not configured.

### 4. Run the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## Shopify CLI Integration

If you're also working with Shopify themes, you can use the Shopify CLI:

```bash
# Login to Shopify
shopify auth login

# List your themes
shopify theme list

# Push your theme to Shopify
shopify theme push

# Serve your theme locally
shopify theme dev
```

## Project Structure

```
double-lovers-eyewear/
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── ProductDetail.tsx
│   ├── SupportPage.tsx
│   └── VirtualStylist.tsx
├── services/           # API integrations
│   ├── geminiService.ts    # Google Gemini AI
│   └── shopifyService.ts   # Shopify Storefront API
├── constants.tsx       # Mock data and constants
├── types.ts           # TypeScript types
├── App.tsx            # Main app component
└── .env.local         # Environment variables (not committed)
```

## Features

- 🛍️ **Product Catalog** - Browse eyewear collection
- 🤖 **AI Virtual Stylist** - Get personalized recommendations using Google Gemini
- 🛒 **Shopify Integration** - Secure checkout through Shopify
- 📱 **Responsive Design** - Works on all devices

## Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment.

## Deployment

### Quick Deploy Script

```bash
./deploy.sh
```

### Manual Deployment Options

**Vercel (Recommended):**
```bash
vercel --prod
```

**Netlify:**
- Drag and drop the `dist` folder to https://app.netlify.com/drop
- Or connect via Git

**Alternative:** See `DEPLOYMENT_GUIDE.md` for detailed instructions including:
- Environment variable setup
- Custom domain configuration
- Shopify Hydrogen migration guide

## Troubleshooting

### Products not loading from Shopify?

1. Check that your `.env.local` file has correct credentials
2. Verify the Storefront API access token is valid
3. Check browser console for error messages
4. Ensure your Shopify store has published products

### Virtual Stylist not working?

1. Verify your `VITE_GEMINI_API_KEY` is set correctly
2. Check that you have API quota remaining at https://aistudio.google.com

## Support

For issues or questions, check the Support page in the app or contact support.
