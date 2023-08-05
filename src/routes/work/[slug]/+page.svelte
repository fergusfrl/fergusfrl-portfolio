<script lang="ts">
	import ArticleView from '../../../components/ArticleView.svelte';
	export let data;
</script>

<ArticleView
	title={data.metadata.title}
	subtitle={`${data.metadata.startDate} to ${data.metadata.finishDate}`}
	imageSrc={`/images/${data.metadata.image}`}
	link={data.metadata.link}
	base="/work"
	listItems={data.work}
	content={data.content}
	breadcrumbs={[
		{ label: 'Fergus Farrell', href: '/' },
		{ label: 'Work', href: '/work' }
	]}
/>
