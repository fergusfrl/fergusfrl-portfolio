<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let isPlaying: boolean = false;

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

<div class="flex w-full justify-between">
	<div class="flex space-x-4">
		<button on:click={togglePlay}
			>{#if isPlaying}
				Pause
			{:else}
				Play
			{/if}</button
		>
		<button on:click={clearAllCells}>Clear</button>
	</div>
	<div>
		<button on:click={randomise}>Randomise</button>
	</div>
</div>
