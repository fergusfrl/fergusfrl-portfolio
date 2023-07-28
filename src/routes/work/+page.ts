import type { WorkFrontmatter } from '../../types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const response = await fetch(`api/work`);
	const work = (await response.json()) as WorkFrontmatter[];

	return {
		work,
		seo: {
			title: 'Work | Fergus Farrell',
			description: "Things I've made or worked on at the companies I have worked for"
		}
	};
}) satisfies PageLoad;
