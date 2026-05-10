# showcase

## Sitemap Configuration

The site's sitemap and robots.txt are dynamically generated based on the deployment environment.

### Environment Variables

#### `SITE_URL` (Recommended for Production)

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

This ensures that:
- **Production deployments** use the custom domain (e.g., `https://www.lesaffluentsdunumerique.fr`)
- **Preview deployments** use the Vercel preview URL (e.g., `https://lesaffluentsdunumerique.vercel.app`)
- **Local development** uses localhost