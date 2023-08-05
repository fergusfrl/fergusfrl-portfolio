<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import type { WorkFrontmatter, WritingFrontmatter } from '../types';
	import Breadcrumbs from './Breadcrumbs.svelte';
	import Collection from './Collection.svelte';
	import CopyButton from './CopyButton.svelte';
	import LinkButton from './LinkButton.svelte';
	import PreviewCard from './PreviewCard.svelte';

	export let breadcrumbs: { label: string; href: string }[];
	export let title: string;
	export let subtitle: string;
	export let imageSrc: string;
	export let content: any;
	export let link: string | undefined = undefined;
	export let base: string;
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
	<h1 class="font-sans-black text-[3rem] md:text-[5rem]">{title}</h1>
	<p>{subtitle}</p>
	<img src={imageSrc} alt={title} class="max-w-4xl rounded-sm" />
	<article class="prose flex max-w-4xl flex-col gap-4 pb-24 font-sans text-lg leading-8">
		<svelte:component this={content} />
		{#if link}
			<br />
			<LinkButton label="View Project" href={link} target="_blank" />
		{/if}
	</article>

	<Collection title={`More ${title}`} href={base} includeLinkButton={false}>
		<ul class="flex grid-cols-4 flex-wrap justify-between gap-8 md:grid">
			{#each listItems as item}
				<li class="flex-1">
					<PreviewCard label={item.title} href={`${base}/${item.slug}`} image={item.image} />
				</li>
			{/each}
		</ul>
	</Collection>
</div>
