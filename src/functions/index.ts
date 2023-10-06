import base from "./base.json";
import html from "./html.json";
export default {
	async fetch(req, { ASSETS }) {
		const { pathname } = new URL(req.url);
		// Trailing Slashes
		if (!(/\/.+\.[a-z0-9]+$/i.test(pathname) || pathname.endsWith("/"))) {
			return new Response(null, {
				status: 308,
				headers: {
					location: `${pathname}/`,
				},
			});
		}
		let headers: HeadersInit = base;
		if (pathname.startsWith("/static/")) {
			headers["Cache-Control"] = "public, max-age=31536000, immutable";
		} else {
			headers["Cache-Control"] = "public, max-age=0, must-revalidate";
		}
		const res = await ASSETS.fetch(req);
		if (res.headers.get("Content-Type")?.startsWith("text/html")) {
			headers = {
				...headers,
				"content-type": "text/html; charset=utf-8",
				...html,
			};
		} else {
			headers["content-type"] = res.headers.get("Content-Type") ?? "text/plain";
		}
		return new Response(res.body, {
			...res,
			headers,
		});
	},
} as ExportedHandler<Environment>;
