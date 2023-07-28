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
			{ label: 'Work', href: '/work' }
		]}
	/>
	<h1 class="font-sans-black text-[5rem]">{data.metadata.title}</h1>
	<p>{`${data.metadata.startDate} to ${data.metadata.finishDate}`}</p>
	<img
		src={`/images/${data.metadata.image}`}
		alt={data.metadata.title}
		class="max-w-4xl rounded-sm"
	/>
	<article class="prose flex max-w-4xl flex-col gap-4 pb-24 font-sans text-lg leading-8">
		<svelte:component this={data.content} />
	</article>

	<Collection title="More Work" href="/work" includeLinkButton={false}>
		<ul class="grid grid-cols-4 gap-8">
			{#each data.work as work}
				<li>
					<PreviewCard label={work.title} href={`/work/${work.slug}`} image={work.image} />
				</li>
			{/each}
		</ul>
	</Collection>
</div>
