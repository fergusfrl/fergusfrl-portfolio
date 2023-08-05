import { error } from '@sveltejs/kit';
import type { WorkFrontmatter } from '../../../types/index.js';

export async function load({ params, fetch }) {
	try {
		const post = await import(`../../../articles/work/${params.slug}.md`);
		const workResponse = await fetch(`../../api/work?limit=8`);
		const work = (await workResponse.json()) as WorkFrontmatter[];

		return {
			content: post.default,
			metadata: { ...post.metadata, slug: params.slug } as WorkFrontmatter,
			work,
			seo: {
				title: `${post.metadata.title} | Fergus Farrell`,
				image: `/images/${post.metadata.image}`
			}
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
