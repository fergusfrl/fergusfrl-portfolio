<script lang="ts">
	export let interactive: boolean = false;
</script>

<div
	class="whitespace-nowrap rounded-full border border-slate px-4 py-2 text-sm dark:border-slate-lightest"
	class:interactive
>
	<slot />
</div>

<style lang="postcss">
	.interactive {
		@apply px-0 py-0 transition-all hover:border-primary hover:text-primary;
	}
</style>
