// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const PRODUCTION_URL = 'https://www.lesaffluentsdunumerique.fr';

// Le site est servi en statique par GitHub Pages sur le domaine personnalisé
// (voir public/CNAME). SITE_URL permet de surcharger l'URL si besoin.
const siteUrl = (process.env.SITE_URL || PRODUCTION_URL).replace(/\/$/, '');

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [mdx(), sitemap()],

  build: {
    // 'always' : tout le CSS est inliné dans le HTML — supprime les requêtes
    // CSS bloquantes signalées par PageSpeed (~2,7 s économisées sur mobile).
    inlineStylesheets: 'always',
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
});
