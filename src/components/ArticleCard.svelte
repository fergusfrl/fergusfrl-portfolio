<script lang="ts">
	import Chip from './Chip.svelte';

	export let title: string;
	export let description: string;
	export let publishedDate: string;
	export let tags: string[];
	export let slug: string;
</script>

<a href={`/blog/${slug}`} class="group flex flex-col gap-2 md:gap-4">
	<h4 class="text-xl font-bold text-primary underline group-hover:no-underline md:text-2xl">
		{title}
	</h4>
	<p class="text-sm text-slate-light dark:text-slate-lightest">{publishedDate}</p>
	<p class="font-bold">{description}</p>
	<ul class="flex gap-2">
		{#each tags.sort((a, b) => (a > b ? 1 : -1)) as tag}
			<Chip>{tag}</Chip>
		{/each}
	</ul>
</a>
