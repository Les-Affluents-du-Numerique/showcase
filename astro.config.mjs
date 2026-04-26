// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://lesaffluentsdunumerique.vercel.app/',
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