#!/bin/bash

# Double Lovers Eyewear - Shopify Theme Quick Start Script
# This script helps you quickly deploy your theme

echo "🎨 Double Lovers Eyewear - Shopify Theme Deployment"
echo "===================================================="
echo ""

# Check if Shopify CLI is installed
if ! command -v shopify &> /dev/null
then
    echo "❌ Shopify CLI is not installed."
    echo ""
    echo "Install it with:"
    echo "  npm install -g @shopify/cli @shopify/theme"
    echo ""
    echo "Or on Mac with Homebrew:"
    echo "  brew tap shopify/shopify"
    echo "  brew install shopify-cli"
    exit 1
fi

echo "✅ Shopify CLI is installed"
echo ""

# Menu
echo "What would you like to do?"
echo ""
echo "1) Preview theme locally (Development mode)"
echo "2) Upload as new unpublished theme"
echo "3) Upload and publish immediately"
echo "4) List existing themes"
echo "5) Pull theme from Shopify"
echo "6) Exit"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
  1)
    echo ""
    echo "🚀 Starting development server..."
    echo "This will open a preview URL. Press Ctrl+C to stop."
    echo ""
    shopify theme dev
    ;;
  2)
    echo ""
    read -p "Enter theme name (default: Double Lovers): " theme_name
    theme_name=${theme_name:-"Double Lovers"}
    echo ""
    echo "📤 Uploading theme as unpublished..."
    shopify theme push --unpublished --theme "$theme_name"
    ;;
  3)
    echo ""
    echo "⚠️  WARNING: This will publish the theme immediately!"
    read -p "Are you sure? (yes/no): " confirm
    if [ "$confirm" == "yes" ]; then
      echo ""
      echo "📤 Uploading and publishing theme..."
      shopify theme push --publish
    else
      echo "Cancelled."
    fi
    ;;
  4)
    echo ""
    echo "📋 Listing themes..."
    shopify theme list
    ;;
  5)
    echo ""
    shopify theme list
    echo ""
    read -p "Enter theme ID to pull: " theme_id
    echo ""
    echo "📥 Pulling theme..."
    shopify theme pull --theme-id "$theme_id"
    ;;
  6)
    echo "Goodbye! 👋"
    exit 0
    ;;
  *)
    echo "Invalid choice. Please run the script again."
    exit 1
    ;;
esac

echo ""
echo "✅ Done!"
echo ""
echo "Need help? Check these files:"
echo "  - README.md"
echo "  - SHOPIFY_DEPLOYMENT_GUIDE.md"
echo "  - SHOPIFY_THEME_SUMMARY.md"
echo ""
