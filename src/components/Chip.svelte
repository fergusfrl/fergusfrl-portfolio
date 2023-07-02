<script lang="ts">
	export let interactive: boolean = false;
</script>

<li class="rounded-full border border-slate px-4 py-2 text-sm" class:interactive>
	<slot />
</li>

<style lang="postcss">
	.interactive {
		@apply px-0 py-0 transition-all hover:border-primary hover:text-primary;
	}
</style>
