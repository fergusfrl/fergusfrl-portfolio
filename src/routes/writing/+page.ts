import type { Frontmatter } from '../../types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`api/writing`);
	const writing = (await response.json()) as Frontmatter[];

	return {
		writing,
		seo: {
			title: 'Writing | Fergus Farrell',
			description: "Technical guides, thoughts and some fun things I've learned"
		}
	};
}) satisfies PageLoad;
