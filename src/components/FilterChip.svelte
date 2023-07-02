<script lang="ts">
	import { toggleActiveFilter } from '../store/filter';
	import Chip from './Chip.svelte';

	export let tag: string;
	let active: boolean;

	const toggleFilter = () => {
		active = !active;
		toggleActiveFilter(tag);
	};
</script>

<Chip interactive>
	<button
		on:click={toggleFilter}
		class="flex items-center gap-2 px-4 py-2"
		class:text-primary={active}
	>
		{#if active}
			<iconify-icon icon="mdi:check" class="text-lg" />
		{/if}
		<p>{tag}</p>
	</button>
</Chip>
