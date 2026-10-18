# 🚀 GitHub Deployment Guide

Complete step-by-step guide to deploy your OPIc Practice Platform to GitHub Pages.

## 📋 Prerequisites

- GitHub account ([github.com](https://github.com))
- Git installed on your computer
- Node.js 18+ and npm installed
- Your project code ready

## 🔧 Step 1: Update Configuration

### Update vite.config.js

Open `vite.config.js` and change the `base` path to match your repository name:

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/opic-practice-platform/", // ⚠️ Change this to your repo name!
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
```

**Important**: The `base` path must match your GitHub repository name exactly (with leading and trailing slashes).

## 📦 Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the "+" button in the top right → "New repository"
3. Fill in the details:
   - **Repository name**: `opic-practice-platform` (or your preferred name)
   - **Description**: "OPIc Practice Platform - Advanced Low Level Training"
   - **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license
4. Click "Create repository"

## 💻 Step 3: Initialize Git and Push Code

Open your terminal in the project directory and run these commands:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create first commit
git commit -m "Initial commit: OPIc Practice Platform"

# Rename branch to main
git branch -M main

# Add your GitHub repository as remote
# ⚠️ Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/opic-practice-platform.git

# Push code to GitHub
git push -u origin main
```

**Note**: You'll be prompted to enter your GitHub credentials. You can use:
- Personal Access Token (recommended)
- GitHub CLI
- SSH key

## ⚙️ Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on the **"Settings"** tab
3. In the left sidebar, click **"Pages"**
4. Under **"Source"**, select **"GitHub Actions"** from the dropdown
5. The page will show "GitHub Actions is configured to deploy to GitHub Pages"

## 🔄 Step 5: Automatic Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:

1. **Trigger** on every push to the `main` branch
2. **Build** your project using `npm run build`
3. **Deploy** the `dist/` folder to GitHub Pages
4. **Complete** in 2-3 minutes

### Monitor Deployment Progress

1. Go to your repository on GitHub
2. Click the **"Actions"** tab
3. You'll see the workflow running
4. Click on the workflow run to see detailed logs

## 🌐 Step 6: Access Your Deployed Site

After the workflow completes successfully:

- Your site will be available at: `https://YOUR_USERNAME.github.io/opic-practice-platform/`
- Replace `YOUR_USERNAME` with your actual GitHub username
- Replace `opic-practice-platform` with your repository name

**Example**: If your username is `johndoe` and repo is `opic-practice-platform`:
- URL: `https://johndoe.github.io/opic-practice-platform/`

## 🔍 Troubleshooting

### Issue: 404 Error After Deployment

**Solution**: 
- Check that the `base` path in `vite.config.js` matches your repository name exactly
- Wait 2-3 minutes for GitHub Pages to fully deploy
- Try hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Issue: Blank Page or Missing Assets

**Solution**:
- Verify the `base` path in `vite.config.js` has leading and trailing slashes
- Check the Actions tab for build errors
- Ensure all file paths are relative (not absolute)

### Issue: Workflow Fails

**Solution**:
- Check the Actions tab for error logs
- Common issues:
  - Missing dependencies: Run `npm install` locally first
  - Build errors: Run `npm run build` locally to test
  - Node version: Workflow uses Node 20, ensure compatibility

### Issue: Speech Recognition Not Working

**Solution**:
- GitHub Pages uses HTTPS, which is required for speech recognition
- Use Chrome or Edge browser
- Allow microphone permissions when prompted
- Check browser console for errors

## 📊 Deployment Workflow Details

The `.github/workflows/deploy.yml` file contains:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]  # Triggers on push to main branch
  workflow_dispatch:   # Allows manual trigger

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js 20
      - Install dependencies (npm ci)
      - Build project (npm run build)
      - Upload dist/ folder as artifact
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - Deploy to GitHub Pages
```

## 🔄 Updating Your Site

Every time you push to the `main` branch:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push
```

GitHub Actions will automatically:
1. Build the updated code
2. Deploy to GitHub Pages
3. Your site will be updated in 2-3 minutes

## 🎯 Quick Start Checklist

- [ ] Update `base` path in `vite.config.js`
- [ ] Create GitHub repository
- [ ] Initialize git (`git init`)
- [ ] Add and commit files (`git add . && git commit -m "Initial commit"`)
- [ ] Add remote (`git remote add origin <your-repo-url>`)
- [ ] Push to GitHub (`git push -u origin main`)
- [ ] Enable GitHub Pages (Settings → Pages → GitHub Actions)
- [ ] Wait for deployment (2-3 minutes)
- [ ] Visit your site at `https://YOUR_USERNAME.github.io/REPO_NAME/`

## 📞 Need Help?

- GitHub Pages Documentation: https://docs.github.com/en/pages
- GitHub Actions Documentation: https://docs.github.com/en/actions
- Vite Documentation: https://vitejs.dev/

## 🎉 Success!

Once deployed, you'll have a live, shareable URL for your OPIc Practice Platform that anyone can access!
