import type { PageLoad } from './$types';

export const load = (() => {
	return {
		seo: {
			title: 'Fergus Farrell',
			description: 'Full stack web developer based in NZ'
		}
	};
}) satisfies PageLoad;
