import { tmpdir } from "os";
import { join } from "path";
import { load } from "cheerio";
import { minify } from "csso";
import { nanoid } from "nanoid";
import { readFile, writeFile } from "fs/promises";
import {
	generateFallbackName,
	generateFontFace,
	getMetricsForFamily,
} from "fontaine";
import type { AstroIntegration } from "astro";

type FontaineOpts = {
	family: string;
	fallback: string;
}[];

const encoder = new TextEncoder();

function Fontaine(fonts: FontaineOpts): AstroIntegration {
	const outFile = join(tmpdir(), nanoid() + ".css");
	let isDev = false;
	let fallbackCSS = "";
	return {
		name: "fontaine",
		hooks: {
			"astro:config:setup": ({ command, injectScript }) => {
				if (command === "dev") {
					injectScript("page-ssr", `import "${outFile}";`);
					isDev = true;
				}
			},
			"astro:config:done": async () => {
				fallbackCSS =
					(
						await Promise.all(
							fonts.map(async ({ family, fallback }) => {
								let metrics = await getMetricsForFamily(family);
								if (!metrics) {
									throw new Error(`Could not find metrics for font ${family}`);
								}
								return generateFontFace(metrics, {
									name: generateFallbackName(family),
									font: fallback,
								});
							}),
						)
					).join("\n") +
					`\nbody { font-family: Open Sans, Open Sans fallback; font-display: swap; }`;
				if (isDev) {
					await writeFile(outFile, fallbackCSS);
				}
			},
			"astro:build:done": async ({ pages, dir }) => {
				const miniFallback = minify(fallbackCSS).css;
				const cssHash = btoa(
					Array.from(
						new Uint8Array(
							await crypto.subtle.digest(
								"SHA-256",
								encoder.encode(miniFallback).buffer,
							),
						),
					)
						.map((e) => String.fromCharCode(e))
						.join(""),
				);
				await Promise.all(
					pages.map(async ({ pathname }) => {
						let extensionWithPathname = "";

						if (pathname === "") {
							extensionWithPathname = "index.html";
						} else if (pathname === "404/") {
							extensionWithPathname = "404.html";
						} else {
							// Assumes Directory Mode
							extensionWithPathname = join(pathname, "index.html");
						}

						const filePath = join(dir.pathname, extensionWithPathname);
						const file = await readFile(filePath, "utf-8");

						const $ = load(file);

						$("head").prepend(`<style>${miniFallback}</style>`);
						await writeFile(filePath, $.html());
					}),
				);
				console.log(`[Fontaine]: Add Style Hash to CSP: "sha256-${cssHash}"`);
			},
		},
	};
}

export { Fontaine };
