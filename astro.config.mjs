// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import swup from '@swup/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://lincie.me',
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
		}),
		sitemap({
			filter: (page) => !page.includes('/diary') && !page.includes('/404'),
		}),
	],
	vite: {
		plugins: [tailwindcss()]
	},
});
