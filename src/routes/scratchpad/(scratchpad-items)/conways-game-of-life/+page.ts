import type { PageLoad } from './$types';

export const load = (() => {
    return {
        title: 'Conways Game of Life',
        seo: {
            title: 'Conways Game Of Life | Fergus Farrell',
            description: "A browser based game of life simulation"
        }
    };
}) satisfies PageLoad;
