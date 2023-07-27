import { error } from '@sveltejs/kit';
import type { Frontmatter } from '../../../types/index.js';

export async function load({ params }) {
	try {
		const post = await import(`../../../articles/writing/${params.slug}.md`);

		return {
			content: post.default,
			metadata: { ...post.metadata, slug: params.slug } as Frontmatter,
			seo: {
				title: `${post.metadata.title} | Fergus Farrell`,
				description: post.metadata.description
			}
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
