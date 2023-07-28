<script lang="ts">
	import LinkButton from './LinkButton.svelte';

	export let href: string;
	export let label: string;
	export let image: string | undefined = undefined;
	export let snippet: string | undefined = undefined;
</script>

<div class="flex flex-col gap-4 @container">
	<a {href} class="transition-opacity hover:opacity-70">
		<img src={`/images/${image}`} alt="label" class="rounded-sm" />
	</a>
	<a {href} class="transition-opacity hover:opacity-70"
		><h4 class="font-sans-bold text-xl font-thin @sm:text-2xl">{label}</h4>
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
