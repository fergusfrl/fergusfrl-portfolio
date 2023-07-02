import type { Frontmatter } from '../../types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`api/articles`);
	const articles = (await response.json()) as Frontmatter[];
	const tags = articles.reduce((prev: string[], curr: Frontmatter) => {
		return [...prev, ...curr.tags];
	}, []);

	return {
		articles,
		tags: [...new Set(tags)].sort((a, b) => (a > b ? 1 : -1)),
		seo: {
			title: 'Blog | Fergus Farrell',
			description: "Technical guides, interesting projects and some fun things I've learned"
		}
	};
}) satisfies PageLoad;
