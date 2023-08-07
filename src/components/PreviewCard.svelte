<script lang="ts">
	import { Image } from 'svelte-lazy-loader';
	import LinkButton from './LinkButton.svelte';

	export let href: string;
	export let label: string;
	export let image: string | undefined = undefined;
	export let snippet: string | undefined = undefined;
</script>

<div class="flex min-w-[150px] flex-col gap-4 @container">
	<a {href} class="transition-opacity hover:opacity-70">
		<Image src={`/images/${image}`} loading="lazy" />
	</a>
	<a {href} class="transition-opacity hover:opacity-70"
		><h4 class="font-sans-bold text-lg font-thin @sm:text-2xl md:text-xl">{label}</h4>
	</a>
	<div class="hidden space-y-4 @sm:block">
		{#if snippet}
			<p class="leading-8">
				{snippet}
			</p>
		{/if}
		<LinkButton {href} label="Continue Reading" />
	</div>
</div>
