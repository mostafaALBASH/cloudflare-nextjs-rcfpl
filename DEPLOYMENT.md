# Deployment Instructions

## ✅ GitHub Actions Deployment (Recommended)

The app is configured to automatically deploy to Cloudflare Pages via GitHub Actions when you push to the `main` branch.

### Setup Steps:

1. **Add Cloudflare API Token to GitHub Secrets**:
   - Go to: https://github.com/mostafaALBASH/cloudflare-nextjs-rcfpl/settings/secrets/actions
   - Click "New repository secret"
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: Your Cloudflare API token (get it from https://dash.cloudflare.com/profile/api-tokens)
   - Click "Add secret"

2. **Trigger Deployment**:
   - Push any commit to `main` branch
   - Or go to Actions tab and manually run the workflow

3. **Monitor Deployment**:
   - Check: https://github.com/mostafaALBASH/cloudflare-nextjs-rcfpl/actions
   - View logs and deployment status

### Why GitHub Actions?

OpenNext Cloudflare has Windows compatibility issues with WASM modules. GitHub Actions deploys from Linux, avoiding this problem.

## 🌐 Your Site

- **Production URL**: https://www.rcfpl.net
- **Worker URL**: https://black-term-0ba3.mostafa-a-h-business.workers.dev
- **Dashboard**: https://dash.cloudflare.com

## 📦 Build Configuration

- **Framework**: Next.js 16.1.5
- **Output**: Standalone
- **Images**: Unoptimized (Cloudflare-compatible)
- **Worker**: black-term-0ba3
- **Routes**: rcfpl.net/*, www.rcfpl.net/*, *.rcfpl.net/*

## 🔄 Data Updates

JSON data is served from `/data/` and cached by Cloudflare. To update:

```powershell
# Update JSON file
notepad public/data/player-metrics.json

# Commit and push (triggers auto-deployment)
git add public/data/
git commit -m "Update player data"
git push origin main
```

## 🚀 Manual Deployment (Linux/WSL Only)

If you're on Linux or WSL:

```bash
npm run deploy
```

On Windows, use GitHub Actions instead (already configured).

## ✅ Status

- ✅ Repository: https://github.com/mostafaALBASH/cloudflare-nextjs-rcfpl
- ✅ GitHub Actions: Configured
- ✅ Domain Routes: Configured
- ⏳ Next: Add CLOUDFLARE_API_TOKEN secret to GitHub
