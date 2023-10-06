import { OGImage } from "@/lib";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export async function getStaticPaths() {
	const collection = await getCollection("blog");
	return collection.map((e) => ({
		params: {
			slug: e.slug,
		},
		props: {
			entry: e,
		},
	}));
}

export const GET: APIRoute<{ entry: CollectionEntry<"blog"> }> = async (
	ctx,
) => {
	const { slug } = ctx.params;
	if (!slug) {
		return new Response(null, { status: 404 });
	}
	const { entry } = ctx.props,
		formattedDate = new Date(entry.data.date).toLocaleDateString("en-DE");
	return OGImage(entry.data.title, formattedDate);
};
