<script lang="ts">
	import { page } from '$app/stores';
	import 'iconify-icon';
	import '../app.css';

	import Footer from '../components/Footer.svelte';

	const title: string | undefined = $page?.data?.seo?.title;
	const description: string | undefined = $page?.data?.seo?.description;
	const image: string | undefined = $page?.data?.seo?.image;
</script>

<svelte:head>
	<!-- Title -->
	{#if title}
		<title>{title}</title>
		<meta property="og:title" content={title} />
		<meta name="twitter:title" content={title} />
	{/if}

	<!-- Description -->
	{#if description}
		<meta name="description" content={description} />
		<meta property="og:description" content={description} />
		<meta name="twitter:description" content={description} />
	{/if}

	<!-- image -->
	{#if image}
		<meta property="og:image" content={image} />
		<meta name="twitter:image" content={image} />
	{/if}

	<!-- url -->
	<link rel="canonical" href={$page.url.href} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:url" content={$page.url.href} />
</svelte:head>

<div
	class="mx-auto flex flex-col justify-between bg-eggshell px-4 py-32 font-sans md:px-12 lg:px-60"
>
	<slot />
	<Footer />
</div>
