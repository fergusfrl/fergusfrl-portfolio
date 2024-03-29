<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { Breadcrumb, WorkFrontmatter, WritingFrontmatter } from '../types';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import Collection from './Collection.svelte';
	import CopyButton from './CopyButton.svelte';
	import LinkButton from './LinkButton.svelte';
	import ArticleCard from './ArticleCard.svelte';

	export let breadcrumbs: Breadcrumb[];
	export let title: string;
	export let subtitle: string;
	export let imageSrc: string;
	export let content: any;
	export let link: string | undefined = undefined;
	export let base: {
		title: string;
		href: string;
	};
	export let listItems: (WritingFrontmatter | WorkFrontmatter)[];

	afterNavigate(() => {
		for (const node of document.querySelectorAll('pre > code')) {
			new CopyButton({
				target: node,
				props: { content: node.textContent ?? '' }
			});
		}
	});
</script>

<div class="flex flex-col gap-12 pt-6">
	<Breadcrumbs {breadcrumbs} />
	<div class="flex max-w-4xl flex-col gap-12">
		<h1 class="text-[3rem] font-black md:text-[5rem]">{title}</h1>
		<p>{subtitle}</p>
		<img src={imageSrc} alt={title} class="rounded-sm" />
		<article class="prose flex flex-col gap-4 pb-24 text-lg leading-8">
			<svelte:component this={content} />
			{#if link}
				<br />
				<LinkButton label="View Project" href={link} target="_blank" />
			{/if}
		</article>
	</div>

	<Collection title={`More ${base.title}`} href={base.href} includeLinkButton={false}>
		<ul class="flex grid-cols-4 flex-wrap justify-between gap-8 md:grid">
			{#each listItems as item}
				<li class="flex-1">
					<ArticleCard label={item.title} href={`${base.href}/${item.slug}`} image={item.image} />
				</li>
			{/each}
		</ul>
	</Collection>
</div>
