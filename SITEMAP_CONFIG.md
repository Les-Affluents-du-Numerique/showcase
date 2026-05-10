# Sitemap Configuration

## Overview

The sitemap and robots.txt are now dynamic and adapt to the deployment environment.

## Environment Variables

### `SITE_URL` (Recommended for Production)

Set this environment variable in your Vercel project settings to specify the production domain:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - **Name**: `SITE_URL`
   - **Value**: `https://www.lesaffluentsdunumerique.fr`
   - **Environment**: Production (only)

### Automatic Behavior

If `SITE_URL` is not set, the system will automatically use:
- `VERCEL_URL` for Vercel deployments (both production and preview)
- `http://localhost:4321` for local development

## How it Works

1. **Production**: When deployed to production with `SITE_URL` set, all sitemap URLs will use `https://www.lesaffluentsdunumerique.fr`
2. **Preview**: When deployed as a Vercel preview, all sitemap URLs will use the Vercel preview URL (e.g., `https://lesaffluentsdunumerique.vercel.app`)
3. **Local Development**: When running locally, sitemap URLs will use `http://localhost:4321`

## Files Modified

- `astro.config.mjs`: Updated to use dynamic site URL from environment variables
- `src/pages/robots.txt.js`: Created dynamic robots.txt endpoint (replaces static `public/robots.txt`)
- `.env.example`: Added example environment variable configuration
