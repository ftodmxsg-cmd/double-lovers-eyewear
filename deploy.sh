#!/bin/bash

# 🚀 Double Lovers Eyewear - Deployment Script
# This script helps you deploy your React app to Vercel

set -e  # Exit on error

echo "🎨 Double Lovers Eyewear - Deployment Helper"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from the project root."
    exit 1
fi

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist/ folder not found."
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "📋 Before deploying, make sure you have:"
echo "   1. Your Shopify Storefront API credentials"
echo "   2. Your Gemini API key"
echo ""
echo "🚀 Ready to deploy!"
echo ""
echo "Choose deployment method:"
echo "  1) Deploy to Vercel (production)"
echo "  2) Deploy to Vercel (preview)"
echo "  3) Just show me the commands"
echo ""
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to Vercel production..."
        echo ""
        echo "When prompted, use these settings:"
        echo "  - Project name: double-lovers-eyewear"
        echo "  - Root directory: ./"
        echo "  - No need to modify build settings"
        echo ""
        vercel --prod
        ;;
    2)
        echo ""
        echo "🧪 Deploying preview to Vercel..."
        vercel
        ;;
    3)
        echo ""
        echo "📝 Manual deployment commands:"
        echo ""
        echo "# For production:"
        echo "vercel --prod"
        echo ""
        echo "# For preview:"
        echo "vercel"
        echo ""
        echo "# After deployment, set environment variables:"
        echo "vercel env add VITE_GEMINI_API_KEY"
        echo "vercel env add VITE_SHOPIFY_STORE_DOMAIN"
        echo "vercel env add VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN"
        echo "vercel env add VITE_SHOPIFY_API_VERSION"
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✨ Next steps:"
echo "  1. Add environment variables in Vercel dashboard"
echo "  2. Redeploy after adding variables"
echo "  3. Test your site!"
echo ""
echo "🎉 Done!"

