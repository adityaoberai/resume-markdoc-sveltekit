import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { markdoc } from 'svelte-markdoc-preprocess';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		markdoc({
			layouts: {
				resume: join(dirname(fileURLToPath(import.meta.url)), './src/markdoc/layouts/Resume.svelte')
			}
		})
	],
	extensions: ['.markdoc', '.svelte'],
	kit: {
		adapter: adapter()
	},
	adapter: adapter({
      maxDuration: 60,
    })
};

export default config;
