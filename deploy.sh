#!/bin/bash

# VinDetect.ai Deployment Script
# This script helps deploy the website to production

echo "🚀 VinDetect.ai Deployment Script"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Please run this script from the project root directory."
    exit 1
fi

echo "✅ Project files found"

# Check if git is initialized and files are committed
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - VinDetect.ai website ready for deployment"
    echo "✅ Git repository initialized and files committed"
else
    echo "✅ Git repository exists"
    
    # Check if there are uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        echo "📦 Committing latest changes..."
        git add .
        git commit -m "Latest updates - ready for deployment"
        echo "✅ Latest changes committed"
    else
        echo "✅ All changes already committed"
    fi
fi

echo ""
echo "🌐 Deployment Options:"
echo "======================"
echo ""
echo "1. 🔥 RECOMMENDED: Vercel Web Interface"
echo "   - Go to https://vercel.com"
echo "   - Sign in with GitHub"
echo "   - Click 'New Project'"
echo "   - Import this repository"
echo "   - Click 'Deploy'"
echo ""
echo "2. 🖥️  Vercel CLI (if you have it installed)"
echo "   - Run: npx vercel --prod"
echo ""
echo "3. 🌍 Other Platforms:"
echo "   - Netlify: https://netlify.com"
echo "   - GitHub Pages"
echo "   - AWS S3 + CloudFront"
echo ""

# Check if Vercel CLI is available
if command -v vercel &> /dev/null; then
    echo "🔧 Vercel CLI detected!"
    echo ""
    read -p "Would you like to deploy with Vercel CLI now? (y/n): " deploy_now
    
    if [ "$deploy_now" = "y" ] || [ "$deploy_now" = "Y" ]; then
        echo ""
        echo "🚀 Deploying to Vercel..."
        vercel --prod
        echo ""
        echo "✅ Deployment initiated!"
    fi
else
    echo "💡 To install Vercel CLI: npm i -g vercel"
fi

echo ""
echo "📋 Post-Deployment Checklist:"
echo "============================="
echo ""
echo "□ Test website loads correctly"
echo "□ Verify all pages are accessible"
echo "□ Test contact form submission"
echo "□ Confirm SSL certificate is active"
echo "□ Test mobile responsiveness"
echo "□ Set up Google Analytics"
echo "□ Configure custom domain (if applicable)"
echo "□ Test cross-browser compatibility"
echo ""
echo "📞 Support: Refer to NEXT_STEPS_CHECKLIST.md for detailed instructions"
echo ""
echo "🎉 VinDetect.ai is ready to launch!"
echo "   Your AI-powered stolen vehicle detection platform awaits!" 