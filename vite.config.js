import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import 'src/app.css';`
			}
		}
	},
	server: {
		host: true,
		port: 5173,
		watch: {
			usePolling: true
		}
	}
});
