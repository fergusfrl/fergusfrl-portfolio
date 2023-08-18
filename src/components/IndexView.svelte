<script lang="ts">
	import type { Breadcrumb } from '../types';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import ArticleCard from './ArticleCard.svelte';

	export let title: string;
	export let base: string;
	export let listItems: { slug: string; title: string; image: string }[];
	export let breadcrumbs: Breadcrumb[];
</script>

<div class="flex flex-col gap-12 pt-6">
	<Breadcrumbs {breadcrumbs} />
	<h1 class="pb-12 text-[3rem] font-black md:text-[5rem]">{title}</h1>
	<ul class="flex grid-cols-4 flex-wrap justify-between gap-4 md:grid">
		{#each listItems as item}
			<li class="flex-1">
				<ArticleCard href={`${base}/${item.slug}`} label={item.title} image={item.image} />
			</li>
		{/each}
	</ul>
</div>
