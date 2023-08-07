<script lang="ts">
	import IndexView from '../../components/IndexView.svelte';
	export let data;
</script>

<IndexView
	title="Work"
	base="/work"
	breadcrumbs={[{ label: 'Fergus Farrell', href: '/' }]}
	listItems={data.work}
/>
