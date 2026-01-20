# 🚀 Deployment Guide

This guide will help you deploy your Glassmorphic Todo App to various hosting platforms.

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Tested the app locally (`npm run dev`)
- [ ] Built the production bundle successfully (`npm run build`)
- [ ] Tested the production build (`npm run preview`)
- [ ] Updated environment variables (if any)
- [ ] Verified all features work correctly
- [ ] Checked browser console for errors
- [ ] Updated URLs in `index.html` meta tags
- [ ] Added your favicon to `/public` folder

## 🏗️ Building for Production

```bash
# Install dependencies
npm install

# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

The production build will be created in the `dist/` folder.

## 🌐 Deployment Platforms

### Vercel (Recommended)

**Easiest deployment with automatic HTTPS and CDN**

#### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Method 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

**Environment Variables on Vercel:**
- Go to Project Settings → Environment Variables
- Add any variables from `.env.example`

---

### Netlify

**Great for static sites with form handling**

#### Method 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod --dir=dist
```

#### Method 2: Drag and Drop

1. Build your project: `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder to the upload area

#### Method 3: GitHub Integration

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Create a `netlify.toml` file:**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### GitHub Pages

**Free hosting for public repositories**

#### Setup

1. Install `gh-pages` package:
```bash
npm install --save-dev gh-pages
```

2. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/', // Replace with your repo name
  plugins: [react()],
  // ... rest of config
})
```

3. Add deploy scripts to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Select `gh-pages` branch
   - Click Save

Your site will be available at: `https://username.github.io/your-repo-name/`

---

### Cloudflare Pages

**Fast global CDN with generous free tier**

1. Push your code to GitHub
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
3. Navigate to Pages → Create a project
4. Connect your GitHub account
5. Select your repository
6. Configure:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Build output directory: `dist`
7. Click "Save and Deploy"

---

### Railway

**For full-stack apps with backend needs**

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Vite
5. Click "Deploy"

---

### Firebase Hosting

**Google's hosting with great performance**

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init hosting
```

Configuration:
- Public directory: `dist`
- Single-page app: Yes
- Automatic builds: No

4. Build your app:
```bash
npm run build
```

5. Deploy:
```bash
firebase deploy --only hosting
```

---

## 🔒 Security Best Practices

### Before Deploying

1. **Remove Debug Code**
   - Remove all `console.log` statements
   - Remove development-only code

2. **Environment Variables**
   - Never commit `.env` files
   - Use platform-specific environment variable settings
   - Keep sensitive data server-side

3. **Content Security Policy**
   Add to `index.html`:
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com;">
   ```

4. **HTTPS Only**
   - Ensure your hosting platform uses HTTPS
   - All major platforms provide this by default

---

## 📊 Performance Optimization

After deployment, verify performance:

### Google PageSpeed Insights
1. Go to [pagespeed.web.dev](https://pagespeed.web.dev)
2. Enter your deployed URL
3. Check both mobile and desktop scores
4. Aim for 90+ scores

### Lighthouse
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit on your deployed site
4. Review and optimize based on suggestions

---

## 🌍 Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings → Custom domains
2. Add your domain
3. Configure DNS or use Netlify DNS

### Cloudflare Pages
1. Go to Custom domains
2. Add your domain
3. Update DNS records

---

## 🔄 Continuous Deployment

Most platforms support automatic deployment:

1. **Push to GitHub** → Automatic deployment
2. **Pull Request Previews** → Test before merging
3. **Branch Deployments** → Separate staging/production

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 🐛 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: Out of memory**
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Blank Page After Deployment

1. Check browser console for errors
2. Verify `base` path in `vite.config.js`
3. Check that files are in the correct directory
4. Ensure routing is configured for SPA

### 404 on Refresh

Add redirect rules:

**Netlify** - `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel** - `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## 📈 Post-Deployment

1. **Analytics**
   - Add Google Analytics
   - Set up error tracking (Sentry)
   - Monitor performance

2. **SEO**
   - Submit sitemap to Google Search Console
   - Verify meta tags are working
   - Check social media previews

3. **Monitoring**
   - Set up uptime monitoring
   - Configure performance alerts
   - Track user feedback

---

## 🎉 Success!

Your app should now be live! Test all features and share with the world.

**Next Steps:**
- Share your app URL
- Gather user feedback
- Iterate and improve
- Monitor analytics

Need help? Check the [Contributing Guide](CONTRIBUTING.md) or open an issue.
