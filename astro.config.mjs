// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import swup from '@swup/astro';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    swup({
      theme: false,
      animationClass: 'transition-',
      containers: ['main'],
      cache: true,
      preload: { hover: true, visible: false },
      accessibility: true,
      smoothScrolling: true,
      morph: ['nav'],
      updateHead: true,
      reloadScripts: false,
      globalInstance: false,
    })
  ]
});