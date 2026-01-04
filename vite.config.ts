import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import unocss from 'unocss/vite';
import {
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup,
	presetWind4,
	presetWebFonts,
} from 'unocss';
import icons from 'unplugin-icons/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		unocss({
			presets: [
				presetWind4({ preflights: { reset: true } }),
				presetWebFonts({
					fonts: {
						sans: 'Poppins:100,200,300,400,500,600,700,800',
					},
				}),
			],
			transformers: [transformerCompileClass(), transformerDirectives(), transformerVariantGroup()],
		}),
		icons({ compiler: 'svelte' }),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				theme_color: '#fff',
				icons: [],
			},
		}),
	],
});
