<script lang="ts">
	import ArticleView from '../../../components/ArticleView.svelte';
	export let data;
</script>

<ArticleView
	title={data.metadata.title}
	base={{ href: '/writing', title: 'Writing' }}
	content={data.content}
	imageSrc={`/images/${data.metadata.image}`}
	listItems={data.writing}
	subtitle={data.metadata.publishedDate}
	breadcrumbs={[
		{ label: 'Fergus Farrell', href: '/' },
		{ label: 'Writing', href: '/writing' }
	]}
/>
