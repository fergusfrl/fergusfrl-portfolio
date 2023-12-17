import type { PageLoad } from './$types';

export const load = (() => {
    return {
        scratchpadItems: [
            {
                slug: 'murphys-pubs-in-ireland',
                title: 'Murphys Pubs in Ireland',
                image: 'svelte.png'
            },
            {
                slug: 'conways-game-of-life',
                title: 'Conways Game of Life',
                image: 'svelte.png'
            }
        ],
        seo: {
            title: 'Scratchpad | Fergus Farrell',
            description: "A collection of small projects, experiments and fun ideas"
        }
    };
}) satisfies PageLoad;
