import { error } from '@sveltejs/kit';
import type { WritingFrontmatter } from '../../../types/index.js';

export async function load({ params, fetch }) {
	try {
		const post = await import(`../../../articles/writing/${params.slug}.md`);
		const writingResponse = await fetch(`../../api/writing?limit=4`);
		const writing = (await writingResponse.json()) as WritingFrontmatter[];

		return {
			content: post.default,
			metadata: { ...post.metadata, slug: params.slug } as WritingFrontmatter,
			writing,
			seo: {
				title: `${post.metadata.title} | Fergus Farrell`,
				description: post.metadata.description
			}
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
