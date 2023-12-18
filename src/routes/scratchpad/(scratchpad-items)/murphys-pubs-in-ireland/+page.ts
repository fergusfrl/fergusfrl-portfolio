import type { PageLoad } from './$types';
import type { Location } from '../../../../types';


export const load = (async ({ fetch }) => {
    const pubs = (await import('./data.json')).default as Location[]
    return {
        title: 'Murphys Pubs In Ireland',
        pubs,
        seo: {
            title: 'Murphys Pubs In Ireland | Fergus Farrell',
            description: "Map of all Murphys pub in Ireland"
        }
    };
}) satisfies PageLoad;
