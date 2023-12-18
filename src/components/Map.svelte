<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { LatLngExpression, Map } from 'leaflet';
	import type { Location } from '../types';

	let mapElement: HTMLElement;
	let map: Map;
	let L;

	export let center: LatLngExpression;
	export let zoom: number;
	export let tileLayer: string = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	export let attribution: string;
	export let markers: Location[] | undefined = [];

	onMount(async () => {
		if (browser) {
			L = await import('leaflet');
			map = L.map(mapElement).setView(center, zoom);
			L.tileLayer(tileLayer, { attribution }).addTo(map);

			if (markers) {
				for (let i = 0; i < markers.length; i++) {
					const marker = markers[i];
					L.marker(marker.coordinates)
						.addTo(map)
						.bindPopup(
							`<h2>${marker.title}</h2><a href="https://maps.google.com/?${marker.address}">${marker.address}</a>`
						);
				}
			}
		}
	});
</script>

<div bind:this={mapElement} class="h-screen rounded-sm" />

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
