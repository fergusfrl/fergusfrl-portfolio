<script lang="ts">
	import LinkButton from './LinkButton.svelte';

	export let title: string;
	export let href: string;
	export let includeLinkButton: boolean = true;
</script>

<section>
	<div class="flex justify-between pb-8">
		<a {href} class="transition-opacity hover:opacity-70">
			<h2 class="font-sans text-3xl font-bold">{title}</h2>
		</a>
		{#if includeLinkButton}
			<LinkButton {href} label={`More ${title}`} />
		{/if}
	</div>
	<slot />
</section>
