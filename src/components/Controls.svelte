<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let isPlaying: boolean = false;
	export let generation: number;

	const dispatch = createEventDispatcher();

	function togglePlay() {
		dispatch('togglePlay');
	}

	function clearAllCells() {
		dispatch('clearCells');
	}

	function randomise() {
		dispatch('randomise');
	}
</script>

<div class="mt-4 flex flex-col space-y-4">
	<div class="flex space-x-4">
		<button on:click={togglePlay}
			>{#if isPlaying}
				Pause
			{:else}
				Play
			{/if}</button
		>
		<button on:click={clearAllCells}>Clear</button>
		<div>Generation: {generation}</div>
	</div>
	<div>
		<button on:click={randomise}>Randomise Cells</button>
	</div>
</div>
