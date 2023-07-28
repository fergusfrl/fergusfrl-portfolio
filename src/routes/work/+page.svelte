<script lang="ts">
	import Breadcrumbs from '../../components/Breadcrumbs.svelte';
	import PreviewCard from '../../components/PreviewCard.svelte';

	export let data;
</script>

<div class="flex flex-col gap-12 pt-6">
	<Breadcrumbs breadcrumbs={[{ label: 'Fergus Farrell', href: '/' }]} />
	<h1 class="pb-12 font-sans-black text-[5rem]">Work</h1>
	<ul class="grid grid-cols-4 gap-4">
		{#each data.work as work}
			<li>
				<PreviewCard href={`/work/${work.slug}`} label={work.title} image={work.image} />
			</li>
		{/each}
	</ul>
</div>
