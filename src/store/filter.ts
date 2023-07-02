import { writable } from 'svelte/store';

const DEFAULT_FILTER: string[] = [];

export const filters = writable(DEFAULT_FILTER);

export const toggleActiveFilter = (filterValue: string) => {
	filters.update((activeValues) => {
		if (activeValues.includes(filterValue)) {
			return activeValues.filter((activeValue) => activeValue !== filterValue);
		}

		return [...activeValues, filterValue];
	});
};
