<script lang="ts">
	import { onMount } from 'svelte';
	import { decode } from 'blurhash';

	export let src: string;
	export let alt: string;
	export let height: number | string | undefined = undefined;
	export let width: number | string | undefined = undefined;
	export let loading: 'lazy' | 'eager' = 'eager';
	export let fill: boolean = false;

	let canvas: HTMLCanvasElement;
	let w: number;
	let h: number;
	let fullSrc: string = src;

	if (src[0] === '/') {
		fullSrc = 'http://localhost:5173' + src;
	}

	onMount(async () => {
		const res = await fetch(`/api/image/blurhash/${encodeURIComponent(fullSrc)}`);
		const json = await res.json();
		const blurhash = json.blurhash;
		const pixels = decode(blurhash, Number(w), Number(h));
		const ctx = canvas.getContext('2d');
		const imageData = ctx!.createImageData(Number(w), Number(h));
		imageData.data.set(pixels);
		ctx!.putImageData(imageData, 0, 0);
		return;
	});
</script>

<div class="flex">
	<div
		class="absolute"
		bind:clientHeight={h}
		bind:clientWidth={w}
		style={fill
			? `width: 100%; height: 100%;`
			: `width: ${Number(width)}px; height: ${Number(height)}px;`}
	>
		<canvas bind:this={canvas} width={w} height={h} class="absolute left-0 top-0" />
		<img
			{alt}
			width={w}
			height={h}
			{loading}
			{src}
			decoding="async"
			class="absolute left-0 top-0"
		/>
	</div>
</div>
