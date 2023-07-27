<script lang="ts">
	import LinkButton from './LinkButton.svelte';

	export let title: string;
	export let href: string;
</script>

<section>
	<div class="flex justify-between pb-8">
		<a {href} class="transition-opacity hover:opacity-70">
			<h2 class="font-sans-black text-3xl">{title}</h2>
		</a>
		<LinkButton {href} label={`More ${title}`} />
	</div>
	<slot />
</section>
