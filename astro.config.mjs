// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      fallbacks: ["sans-serif"],
      cssVariable: '--font-headline'
    },
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      fallbacks: ["sans-serif"],
      cssVariable: '--font-label'
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      fallbacks: ["sans-serif"],
      cssVariable: '--font-body'
    },
  ],
    
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel()
});