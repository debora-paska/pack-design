import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const packageRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [tailwindcss(), svelte()],
	resolve: {
		alias: [
			{
				find: '$lib',
				replacement: path.resolve(packageRoot, 'src/lib')
			},
			{
				find: '@pack/ui/lib',
				replacement: path.resolve(packageRoot, 'src/lib')
			}
		]
	}
});
