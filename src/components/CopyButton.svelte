<script lang="ts">
	export let content: string;
	let copied = false;

	const handleCopy = () => {
		navigator.clipboard.writeText(content);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 3000);
	};
</script>

<div class="absolute right-1 top-1 p-2 text-slate-lightest">
	{#if copied}
		<span>Copied!</span>
	{:else}
		<button on:click={handleCopy} title="Copy Code">
			<iconify-icon icon="mdi:content-copy" class="text-xl transition-all hover:text-primary" />
		</button>
	{/if}
</div>
