# Deployment Guide

This guide provides step-by-step instructions for deploying the Vector Database Comparison web app to various platforms and pushing to GitHub.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ Node.js 18+ installed
- ✅ npm installed
- ✅ All dependencies installed (`npm install`)
- ✅ Build succeeds locally (`npm run build`)
- ✅ No TypeScript errors
- ✅ Git initialized in your project

### Test Local Build

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to verify the production build works correctly.

---

## 🐙 Part 1: Push to GitHub

### Step 1: Initialize Git Repository

If you haven't already initialized Git:

```bash
# Check if Git is initialized
git status

# If not initialized, initialize it
git init
```

### Step 2: Review Files to Commit

```bash
# Check what will be committed
git status

# View gitignore to ensure sensitive files are excluded
cat .gitignore
```

**Important:** Ensure `.env` is in `.gitignore` to avoid committing secrets!

### Step 3: Stage and Commit Files

```bash
# Add all files
git add .

# Create initial commit with descriptive message
git commit -m "Initial commit: Vector Database Comparison 2025

- Interactive React/TypeScript web app with real benchmarks
- 5 Jupyter notebooks testing Chroma, Weaviate, Milvus, Qdrant, Pinecone
- Real performance data from 100 articles, 5 queries
- Production-ready comparison framework with cost analysis
- Comprehensive documentation and deployment guides"
```

### Step 4: Create GitHub Repository

**Option A: Via GitHub Web Interface**

1. Go to [github.com/new](https://github.com/new)
2. Fill in repository details:
   - **Repository name:** `vector-db-comparison-2025`
   - **Description:** `Production-ready comparison of 5 vector databases with real benchmarks, interactive web app, and hands-on Jupyter notebooks`
   - **Visibility:** Choose **Public** (for sharing) or **Private**
   - **Initialize:** Do **NOT** check "Add a README" (we already have one)
3. Click **Create repository**

**Option B: Via GitHub CLI** (if you have `gh` installed)

```bash
gh repo create vector-db-comparison-2025 --public --description "Production-ready comparison of 5 vector databases with real benchmarks" --source=. --push
```

### Step 5: Push to GitHub

**If you used Option A (web interface):**

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/vector-db-comparison-2025.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If you used Option B (GitHub CLI):**

You're done! The repository was created and pushed automatically.

### Step 6: Verify on GitHub

Visit `https://github.com/YOUR_USERNAME/vector-db-comparison-2025` to verify:
- ✅ README displays correctly
- ✅ All files are present
- ✅ `.env` is NOT visible (should be gitignored)

---

## 🚀 Part 2: Deploy to Vercel (Recommended)

Vercel is the **recommended platform** for deploying Vite/React apps. It offers:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Zero configuration for Vite
- ✅ Automatic deployments from GitHub
- ✅ Free tier for personal projects

### Method A: Deploy via Vercel Dashboard (Easiest)

**Step 1: Sign Up / Log In**

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** (or **Log In** if you have an account)
3. Sign in with GitHub (recommended)

**Step 2: Import GitHub Repository**

1. Click **Add New...** → **Project**
2. Click **Import Git Repository**
3. Find `vector-db-comparison-2025` in the list
4. Click **Import**

**Step 3: Configure Project**

Vercel will auto-detect Vite. Verify settings:

- **Framework Preset:** Vite
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Step 4: Deploy**

1. Click **Deploy**
2. Wait 1-2 minutes for build to complete
3. Vercel will provide a URL like: `https://vector-db-comparison-2025.vercel.app`

**Step 5: Configure Production Domain (Optional)**

1. Go to Project Settings → Domains
2. Add custom domain if you have one
3. Vercel handles SSL automatically

### Method B: Deploy via Vercel CLI

**Step 1: Install Vercel CLI**

```bash
npm install -g vercel
```

**Step 2: Login to Vercel**

```bash
vercel login
```

Follow the prompts to authenticate.

**Step 3: Deploy**

```bash
# Navigate to your project directory
cd /path/to/VectorDB

# Deploy (first time)
vercel
```

Follow the prompts:
- **Set up and deploy:** `Y`
- **Which scope:** Select your account
- **Link to existing project:** `N` (first time)
- **Project name:** `vector-db-comparison` (or your choice)
- **In which directory:** `./` (press Enter)
- **Override settings:** `N` (Vercel auto-detects Vite)

**Step 4: Deploy to Production**

```bash
vercel --prod
```

Your app is now live! Vercel will show the URL.

### Method C: Automatic Deployments from GitHub (Best for Ongoing Development)

**Step 1: Connect Vercel to GitHub** (if not already connected)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Click **Import Git Repository**
4. Authorize Vercel to access your GitHub
5. Select `vector-db-comparison-2025`

**Step 2: Configure Auto-Deploy**

1. Vercel automatically sets up GitHub integration
2. Every push to `main` branch triggers automatic deployment
3. Pull requests get preview deployments

**How it works:**
```bash
# Make changes locally
git add .
git commit -m "Update feature comparison table"
git push origin main

# Vercel automatically:
# 1. Detects push to main
# 2. Runs npm run build
# 3. Deploys to production
# 4. Sends you a notification
```

### Vercel Environment Variables (If Needed in Future)

If your app needs environment variables:

1. Go to Project Settings → Environment Variables
2. Add variables (e.g., `VITE_API_KEY=xxx`)
3. Redeploy for changes to take effect

---

## 🌐 Part 3: Deploy to Netlify (Alternative)

Netlify is another excellent option for static sites.

### Method A: Netlify Drop (Quickest)

**Step 1: Build Locally**

```bash
npm run build
```

This creates a `dist/` folder with static files.

**Step 2: Deploy via Drag & Drop**

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `dist/` folder into the drop zone
3. Netlify deploys immediately and provides a URL

**Limitations:** No auto-deploy from GitHub, manual re-deploy needed for updates.

### Method B: Netlify CLI

**Step 1: Install Netlify CLI**

```bash
npm install -g netlify-cli
```

**Step 2: Login**

```bash
netlify login
```

**Step 3: Build and Deploy**

```bash
# Build the project
npm run build

# Deploy to production
netlify deploy --prod --dir=dist
```

Follow prompts:
- **Create & configure a new site:** Yes
- **Team:** Select your team
- **Site name:** `vector-db-comparison` (or your choice)
- **Publish directory:** `dist` (already specified)

### Method C: Connect GitHub to Netlify (Auto-Deploy)

**Step 1: Connect Repository**

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub**
4. Authorize Netlify
5. Select `vector-db-comparison-2025`

**Step 2: Configure Build Settings**

- **Branch to deploy:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

**Step 3: Deploy**

Click **Deploy site**. Netlify will:
- Build your site
- Deploy to a URL like `https://vector-db-comparison.netlify.app`
- Auto-deploy on every push to `main`

---

## 📄 Part 4: Deploy to GitHub Pages (Free Hosting)

GitHub Pages is free for public repositories.

### Step 1: Install gh-pages Package

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Add deployment script and homepage:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/vector-db-comparison-2025",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Update vite.config.ts

Add base path for GitHub Pages:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/vector-db-comparison-2025/'  // Add this line
})
```

### Step 4: Deploy

```bash
# Build and deploy
npm run deploy
```

This will:
1. Build your project
2. Create/update `gh-pages` branch
3. Push to GitHub

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
4. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/vector-db-comparison-2025/`

**Note:** GitHub Pages may take 2-10 minutes for the first deployment.

---

## 🔧 Troubleshooting

### Build Fails Locally

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Vercel Build Fails

1. Check build logs in Vercel dashboard
2. Verify `package.json` has correct build script
3. Ensure all dependencies are in `dependencies`, not `devDependencies`

### GitHub Pages Shows 404

1. Ensure `base` in `vite.config.ts` matches repo name
2. Check GitHub Pages settings (Settings → Pages)
3. Verify `gh-pages` branch exists
4. Wait 5-10 minutes for GitHub's CDN to update

### .env File Accidentally Committed

If you accidentally committed `.env`:

```bash
# Remove from Git (but keep locally)
git rm --cached .env

# Add to .gitignore if not already there
echo ".env" >> .gitignore

# Commit the removal
git add .gitignore
git commit -m "Remove .env from version control"
git push
```

**Important:** If `.env` contained API keys, **rotate them immediately**!

---

## 📊 Deployment Comparison

| Platform | Setup Time | Auto-Deploy | Custom Domain | Free Tier | Best For |
|----------|-----------|-------------|---------------|-----------|----------|
| **Vercel** | 5 min | ✅ Yes | ✅ Yes | ✅ Unlimited | **Best overall** - Zero config, fast CDN |
| **Netlify** | 5 min | ✅ Yes | ✅ Yes | ✅ 100GB/mo | Great alternative to Vercel |
| **GitHub Pages** | 10 min | ✅ Yes | ⚠️ Via CNAME | ✅ Unlimited | Free, but needs config |
| **Netlify Drop** | 1 min | ❌ No | ❌ No | ✅ Free | Quick test deployments |

---

## ✅ Post-Deployment Checklist

After deploying, verify:

- ✅ Site loads correctly
- ✅ All sections render properly
- ✅ Interactive features work (tabs, hover effects)
- ✅ External links work (cost calculators)
- ✅ Responsive design works on mobile
- ✅ No console errors (check browser DevTools)

### Update README with Live Link

Once deployed, update your README.md:

```markdown
🌐 **[Live Demo](https://your-app.vercel.app)** | 📊 **[View Benchmarks](#benchmarks)** | 📓 **[Jupyter Notebooks](./notebooks/)**
```

Commit and push:

```bash
git add README.md
git commit -m "Add live demo link to README"
git push origin main
```

---

## 🎉 You're Done!

Your Vector Database Comparison app is now live and accessible to the world!

**Share your deployment:**
- Twitter: "Just deployed a production-ready comparison of 5 vector databases 🚀"
- LinkedIn: Share your learning journey
- Dev.to: Write a blog post about your findings
- Reddit r/MachineLearning: Share benchmark results

**Next steps:**
- ⭐ Star the repo on GitHub
- 📝 Add more databases as you test them
- 📊 Update benchmarks with larger datasets
- 🎨 Customize the design
- 🤝 Accept contributions from others

---

**Questions?** Open an issue on GitHub!
