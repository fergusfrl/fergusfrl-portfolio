<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let x: number;
	export let y: number;
	export let active: boolean = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click', { x, y });
	}
</script>

<div
	data-coordinates={`${x},${y}`}
	on:click={handleClick}
	class="h-5 w-5 border-l border-t border-black last:border-b"
	class:bg-gray-400={active}
/>
