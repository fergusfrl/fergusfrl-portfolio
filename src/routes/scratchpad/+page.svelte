<script>
	import IndexView from '../../components/IndexView.svelte';
	export let data;
</script>

<IndexView
	title="Scratchpad"
	description="A collection of small projects, experiments and fun ideas."
	base="/scratchpad"
	breadcrumbs={[{ label: 'Fergus Farrell', href: '/' }]}
	listItems={data.scratchpadItems}
/>
