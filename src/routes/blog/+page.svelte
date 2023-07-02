<script>
	import ArticleCard from '../../components/ArticleCard.svelte';
	import FilterChip from '../../components/FilterChip.svelte';
	import { filters } from '../../store/filter';

	export let data;
</script>

<h1 class="reading-view text-2xl font-bold leading-relaxed md:text-4xl">
	<span class="text-primary">The Blog</span>: technical guides, interesting projects and some fun
	things I've learned
</h1>

<ul class="mt-10 flex flex-wrap gap-4 border-t border-slate-lightest pt-10 md:mt-20 md:pt-20">
	{#each data.tags as tag}
		<FilterChip {tag} />
	{/each}
</ul>

<ul class="reading-view flex flex-col gap-16 pt-16 md:gap-32 md:pt-32">
	{#each data.articles.filter((article) => {
		if ($filters.length === 0) return true;
		return article.tags.some((tag) => $filters.includes(tag));
	}) as article}
		<ArticleCard {...article} />
	{/each}
</ul>
