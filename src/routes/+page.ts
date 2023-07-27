import type { Frontmatter } from '../types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const workResponse = await fetch(`api/writing?limit=4`);
	const work = (await workResponse.json()) as Frontmatter[];

	const writingResponse = await fetch(`api/writing?limit=5`);
	const writing = (await writingResponse.json()) as Frontmatter[];

	return {
		seo: {
			title: 'Fergus Farrell',
			description: 'Freelance web developer'
		},
		work,
		writing
	};
}) satisfies PageLoad;
