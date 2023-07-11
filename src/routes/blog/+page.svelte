<script>
	import ArticleCard from '../../components/ArticleCard.svelte';
	import Chip from '../../components/Chip.svelte';
	import FilterChip from '../../components/FilterChip.svelte';
	import { filters } from '../../store/filter';

	export let data;

	let showFilters = false;
</script>

<h1 class="reading-view text-2xl font-bold leading-relaxed md:text-4xl">
	<span class="text-primary">The Blog</span>: technical guides, interesting projects and some fun
	things I've learned
</h1>

<button
	class="flex items-center gap-1 pb-2 pt-8 text-sm text-slate-light hover:text-primary dark:text-slate-lightest md:hidden"
	on:click={() => {
		showFilters = !showFilters;
	}}
	>Filters {#if showFilters}
		<iconify-icon icon="mdi:chevron-down" class="text-lg" />
	{:else}
		<iconify-icon icon="mdi:chevron-right" class="text-lg" />
	{/if}</button
>

<ul
	class="mb-6 mt-1 hidden flex-wrap gap-4 border-t border-slate-lightest py-4 md:my-20 md:flex md:py-20"
	class:!flex={showFilters}
>
	{#each data.tags as tag}
		<FilterChip {tag} />
	{/each}
</ul>

<ul class="reading-view flex flex-col gap-16 pt-8 md:gap-32 md:pt-0">
	{#each data.articles.filter((article) => {
		if ($filters.length === 0) return true;
		return article.tags.some((tag) => $filters.includes(tag));
	}) as article}
		<ArticleCard {...article} />
	{/each}
</ul>
