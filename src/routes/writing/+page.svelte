<script lang="ts">
	import IndexView from '../../components/IndexView.svelte';
	export let data;
</script>

<IndexView
	title="Writing"
	base="/writing"
	breadcrumbs={[{ label: 'Fergus Farrell', href: '/' }]}
	listItems={data.writing}
/>
