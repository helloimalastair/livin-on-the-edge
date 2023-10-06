import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import { Cleanup, Fontaine } from "./plugins";
import Preload from "vite-plugin-preload";

export default defineConfig({
	trailingSlash: "always",
	build: {
		assets: "static",
		inlineStylesheets: "never",
	},
	site: "https://www.goalastair.com",
	integrations: [
		mdx(),
		sitemap(),
		tailwind({
			applyBaseStyles: false,
		}),
		Fontaine([
			{
				family: "Open Sans",
				fallback: "Arial",
			},
		]),
		Cleanup(),
	],
	vite: {
		ssr: {
			external: ["@resvg/resvg-js"],
		},
		optimizeDeps: { exclude: ["@resvg/resvg-js"] },
		plugins: [Preload()],
		build: {
			rollupOptions: {
				external: ["@resvg/resvg-js"],
				output: {
					chunkFileNames: "static/[hash].mjs",
					assetFileNames: "static/[hash][extname]",
				},
			},
		},
	},
});
