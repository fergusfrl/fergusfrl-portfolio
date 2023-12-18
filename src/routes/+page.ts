import type { Scratchpad, WorkFrontmatter, WritingFrontmatter } from '../types';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const workResponse = await fetch(`api/work?limit=4`);
	const work = (await workResponse.json()) as WorkFrontmatter[];

	const writingResponse = await fetch(`api/writing?limit=5`);
	const writing = (await writingResponse.json()) as WritingFrontmatter[];

	const scratchpad = [{
		title: 'Murphys Pubs In Ireland',
		slug: '/murphys-pubs-in-ireland',
		image: '/murphys.jpeg'
	}, {
		title: 'Conways Game of Life',
		slug: 'conways-game-of-life',
		image: '/game-of-life.png'
	}] as Scratchpad[];

	return {
		seo: {
			title: 'Fergus Farrell',
			description: 'Freelance web developer'
		},
		work,
		writing,
		scratchpad
	};
}) satisfies PageLoad;
