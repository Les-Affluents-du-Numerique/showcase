// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// Determine the site URL based on the environment
// Priority: SITE_URL env var > VERCEL_URL > fallback
const getSiteUrl = () => {
  // Custom environment variable for explicit site URL (can be set in Vercel dashboard)
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }
  // For Vercel deployments (preview and production)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback for local development
  return 'http://localhost:4321';
};

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
  integrations: [mdx(), sitemap()],

  build: {
    inlineStylesheets: 'auto',
  },

  compressHTML: true,

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      options: {
        variants: [
          { src: ['./src/assets/fonts/atkinson-regular.woff'], weight: '400', style: 'normal' },
          { src: ['./src/assets/fonts/atkinson-bold.woff'], weight: '700', style: 'normal' },
        ],
      },
    },
  ],
    
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});