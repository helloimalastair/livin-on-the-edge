import { join } from "path";
import { build } from "esbuild";
import type { AstroIntegration } from "astro";
import { rename, rm, readdir } from "node:fs/promises";

export const Cleanup: () => AstroIntegration = () => {
	let src: string;
	return {
		name: "cleanup-and-functions",
		hooks: {
			"astro:config:done": ({ config }) => {
				src = config.srcDir.pathname;
			},
			"astro:build:done": async ({ dir }) => {
				// Cleanup Sitemap
				const index = new URL("sitemap-index.xml", dir);
				const oldSitemap = new URL("sitemap-0.xml", dir);
				const newSitemap = new URL("sitemap.xml", dir);
				await rm(index, { force: true });
				await rename(oldSitemap, newSitemap);
				// Cleanup Original Images
				const staticDir = new URL("static", dir);
				for (const file of await readdir(staticDir)) {
					if (/[0-9a-f]{8}\.(jpg|jpeg|webp|avif|png)/.test(file)) {
						const original = join(staticDir.pathname, file);
						await rm(original, { force: true });
					}
				}
				// Build Functions
				await build({
					entryPoints: [join(src, "functions", "index.ts")],
					bundle: true,
					// minify: true,
					format: "esm",
					target: "esnext",
					outfile: join(dir.pathname, "_worker.js"),
				});
			},
		},
	};
};
