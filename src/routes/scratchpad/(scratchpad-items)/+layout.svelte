<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumbs from '../../../components/Breadcrumbs.svelte';
</script>

<div class="flex flex-col gap-12 pt-6">
	<Breadcrumbs
		breadcrumbs={[
			{ label: 'Fergus Farrell', href: '/' },
			{ label: 'Scratchpad', href: '/scratchpad' }
		]}
	/>
	<h1 class="pb-12 text-[3rem] font-black md:text-[5rem]">{$page.data.title}</h1>
	<slot />
</div>
