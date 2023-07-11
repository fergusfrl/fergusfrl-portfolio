<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let src: string;
	export let alt: string;
	export let loading: 'lazy' | 'eager' = 'eager';
	export let decoding: 'async' | 'sync' | 'auto' = 'auto';

	const opacity = tweened(0.2, {
		duration: 5000,
		easing: cubicOut
	});
</script>

<img
	{src}
	{alt}
	{loading}
	{decoding}
	style={`opacity: ${$opacity};`}
	on:load={() => opacity.set(1)}
/>
