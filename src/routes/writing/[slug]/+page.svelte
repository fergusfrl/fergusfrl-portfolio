<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Breadcrumbs from '../../../components/Breadcrumbs.svelte';
	import Collection from '../../../components/Collection.svelte';
	import CopyButton from '../../../components/CopyButton.svelte';
	import PreviewCard from '../../../components/PreviewCard.svelte';

	export let data;

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
	<Breadcrumbs
		breadcrumbs={[
			{ label: 'Fergus Farrell', href: '/' },
			{ label: 'Writing', href: '/writing' }
		]}
	/>
	<h1 class="pb-12 font-sans-black text-[5rem]">{data.metadata.title}</h1>
	<p>{data.metadata.publishedDate}</p>
	<img
		src={`/images/${data.metadata.image}`}
		alt={data.metadata.title}
		class="max-w-4xl rounded-sm"
	/>
	<article class="prose flex max-w-4xl flex-col gap-4 pb-24 font-sans text-lg leading-8">
		<svelte:component this={data.content} />
	</article>

	<Collection title="More Writing" href="/writing" includeLinkButton={false}>
		<ul class="flex justify-between gap-8">
			{#each data.writing as writing}
				<li class="flex-1">
					<PreviewCard
						label={writing.title}
						href={`/writing/${writing.slug}`}
						image={writing.image}
					/>
				</li>
			{/each}
		</ul>
	</Collection>
</div>
