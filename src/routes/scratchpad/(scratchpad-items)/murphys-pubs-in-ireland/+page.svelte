<script lang="ts">
	import Map from '../../../../components/Map.svelte';
	export let data;
</script>

<p>
	Travelling around Ireland, I saw lots of pubs with the name Murphys. I thought it would be
	interesting to visualise how many pubs with that name were in the country. I haven't visited them
	all, but my favourite so far is in <a
		class="underline transition-all hover:no-underline"
		href="https://maps.google.com/?Market Square, Kilkee, Co. Clare">Kilkee, Co. Clare</a
	>. If you ever get the chance, say hi to Adiran at the bar.
</p>

<Map
	attribution={`'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'`}
	zoom={7}
	center={[53.3895515383516, -9.02271182557418]}
	markers={data.pubs}
/>
