import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/config";

export const GET: APIRoute = async ({ url: { origin } }) => {
	const posts = await getCollection("blog"),
		sortedPosts = posts.sort(
			({ data: a }, { data: b }) =>
				new Date(b.date).valueOf() - new Date(a.date).valueOf(),
		),
		rssItems = sortedPosts.map(({ data, slug }) => {
			const { title } = data,
				pubDate = data.date,
				{ description } = data,
				link = new URL(`/blog/${slug}`, origin).toString();

			return {
				title,
				pubDate,
				description,
				link,
			};
		});

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: origin,
		items: rssItems,
	});
};
