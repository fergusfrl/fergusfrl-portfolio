<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import CopyButton from '../../../components/CopyButton.svelte';

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

<div class="mx-auto max-w-2xl">
	<ul class="hidden gap-2 pb-10 md:flex">
		<li class="text-primary underline hover:no-underline"><a href="/blog">blog</a></li>
		<li class="flex items-center"><iconify-icon icon="mdi:greater-than" /></li>
		<li>{data.metadata.slug}</li>
	</ul>
	<div class="mb-5 border-b border-slate-lightest pb-4 md:mb-10">
		<h1 class="text-2xl font-bold md:text-3xl">{data.metadata.title}</h1>
		<p class="mt-4 text-sm text-slate-light">{data.metadata.publishedDate}</p>
	</div>

	<div class="prose flex flex-col gap-4">
		<svelte:component this={data.content} />
	</div>

	<a
		href="/blog"
		class="mt-6 flex items-center gap-2 py-2 pr-2 text-primary underline hover:no-underline"
	>
		<iconify-icon icon="mdi:arrow-left" class="text-lg" /> All blogs</a
	>
</div>
