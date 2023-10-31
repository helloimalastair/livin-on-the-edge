import satori from "satori";
import { join } from "path";
import { readFileSync } from "fs";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";

const openSans = readFileSync(
		join(
			import.meta.env.PWD as string,
			"node_modules/@fontsource/open-sans/files/open-sans-latin-600-normal.woff",
		),
	),
	openSansItalic = readFileSync(
		join(
			import.meta.env.PWD as string,
			"node_modules/@fontsource/open-sans/files/open-sans-latin-600-italic.woff",
		),
	);

export async function OGImage(title: string, date?: string) {
	const svgString = `
			<svg viewBox="0 0 1200 630" width="1200" height="630">
				<rect x="0" y="0" width="1200" height="630" fill="#001220"></rect>
				<div tw="flex flex-col px-10 py-5 text-white w-full">
					<div tw="flex justify-between">
						<h2 tw="italic font-bold text-5xl">Livin' on the Edge</h2>
						${date ? `<h3 tw="text-3xl">${date}</h3>` : ""}
					</div>
					<h1 tw="text-${ title.length > 30 ? "7" : "8" }xl">${title}</h1>
				</div>
				<path
					d="M0 387L28.5 396.7C57 406.3 114 425.7 171.2 424.7C228.3 423.7 285.7 402.3 342.8 403.7C400 405 457 429 514.2 438.3C571.3 447.7 628.7 442.3 685.8 430.3C743 418.3 800 399.7 857.2 395.7C914.3 391.7 971.7 402.3 1028.8 405.5C1086 408.7 1143 404.3 1171.5 402.2L1200 400L1200 631L1171.5 631C1143 631 1086 631 1028.8 631C971.7 631 914.3 631 857.2 631C800 631 743 631 685.8 631C628.7 631 571.3 631 514.2 631C457 631 400 631 342.8 631C285.7 631 228.3 631 171.2 631C114 631 57 631 28.5 631L0 631Z"
					fill="#fcaf3c"
					style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s;"
				></path>
				<path
					d="M0 420L28.5 425.3C57 430.7 114 441.3 171.2 454.3C228.3 467.3 285.7 482.7 342.8 484.3C400 486 457 474 514.2 461.3C571.3 448.7 628.7 435.3 685.8 431C743 426.7 800 431.3 857.2 444.8C914.3 458.3 971.7 480.7 1028.8 479.3C1086 478 1143 453 1171.5 440.5L1200 428L1200 631L1171.5 631C1143 631 1086 631 1028.8 631C971.7 631 914.3 631 857.2 631C800 631 743 631 685.8 631C628.7 631 571.3 631 514.2 631C457 631 400 631 342.8 631C285.7 631 228.3 631 171.2 631C114 631 57 631 28.5 631L0 631Z"
					fill="#ff9e43"
					style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s;"
				></path>
				<path
					d="M0 482L28.5 483C57 484 114 486 171.2 483.7C228.3 481.3 285.7 474.7 342.8 471C400 467.3 457 466.7 514.2 465.7C571.3 464.7 628.7 463.3 685.8 474.2C743 485 800 508 857.2 518.5C914.3 529 971.7 527 1028.8 518.8C1086 510.7 1143 496.3 1171.5 489.2L1200 482L1200 631L1171.5 631C1143 631 1086 631 1028.8 631C971.7 631 914.3 631 857.2 631C800 631 743 631 685.8 631C628.7 631 571.3 631 514.2 631C457 631 400 631 342.8 631C285.7 631 228.3 631 171.2 631C114 631 57 631 28.5 631L0 631Z"
					fill="#ff8e4b"
					style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s;"
				></path>
				<path
					d="M0 533L28.5 531.8C57 530.7 114 528.3 171.2 529C228.3 529.7 285.7 533.3 342.8 538.2C400 543 457 549 514.2 551.3C571.3 553.7 628.7 552.3 685.8 554.3C743 556.3 800 561.7 857.2 554.5C914.3 547.3 971.7 527.7 1028.8 526.2C1086 524.7 1143 541.3 1171.5 549.7L1200 558L1200 631L1171.5 631C1143 631 1086 631 1028.8 631C971.7 631 914.3 631 857.2 631C800 631 743 631 685.8 631C628.7 631 571.3 631 514.2 631C457 631 400 631 342.8 631C285.7 631 228.3 631 171.2 631C114 631 57 631 28.5 631L0 631Z"
					fill="#ff7e55"
					style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s;"
				></path>
				<path
					d="M0 587L28.5 586.8C57 586.7 114 586.3 171.2 585.8C228.3 585.3 285.7 584.7 342.8 584C400 583.3 457 582.7 514.2 585C571.3 587.3 628.7 592.7 685.8 595C743 597.3 800 596.7 857.2 589.5C914.3 582.3 971.7 568.7 1028.8 569.7C1086 570.7 1143 586.3 1171.5 594.2L1200 602L1200 631L1171.5 631C1143 631 1086 631 1028.8 631C971.7 631 914.3 631 857.2 631C800 631 743 631 685.8 631C628.7 631 571.3 631 514.2 631C457 631 400 631 342.8 631C285.7 631 228.3 631 171.2 631C114 631 57 631 28.5 631L0 631Z"
					fill="#ff6f61"
					style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0s;"
				></path>
			</svg>
		`,
		svgNode = html(svgString),
		svg = await satori(svgNode, {
			width: 1200,
			height: 630,
			fonts: [
				{ name: "Open Sans", data: openSans, weight: 600, style: "normal" },
				{
					name: "Open Sans",
					data: openSansItalic,
					weight: 600,
					style: "italic",
				},
			],
			tailwindConfig: {
				theme: {
					fontFamily: {
						svg: ["Open Sans", "sans-serif"],
					},
				},
			},
		});
	return new Response(new Resvg(svg).render().asPng(), {
		headers: {
			"Content-Type": "image/png",
		},
	});
}
