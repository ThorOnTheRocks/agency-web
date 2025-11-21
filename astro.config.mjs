// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import 'dotenv/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: 'production',
      studioBasePath: '/admin',
      useCdn: true,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  output: 'server',
  adapter: vercel(),
});
