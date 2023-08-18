<script lang="ts">
	import { page } from '$app/stores';
	import 'iconify-icon';
	import '../app.css';

	import Footer from '../components/Footer.svelte';
</script>

<svelte:head>
	<!-- Title -->
	{#if $page.data.seo.title}
		<title>{$page.data.seo.title}</title>
		<meta property="og:title" content={$page.data.seo.title} />
		<meta name="twitter:title" content={$page.data.seo.title} />
	{/if}

	<!-- Description -->
	{#if $page.data.seo.description}
		<meta name="description" content={$page.data.seo.description} />
		<meta property="og:description" content={$page.data.seo.description} />
		<meta name="twitter:description" content={$page.data.seo.description} />
	{/if}

	<!-- image -->
	{#if $page.data.seo.image}
		<meta property="og:image" content={$page.data.seo.image} />
		<meta name="twitter:image" content={$page.data.seo.image} />
	{/if}

	<!-- url -->
	<link rel="canonical" href={$page.url.href} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:url" content={$page.url.href} />
</svelte:head>

<div class="mx-auto flex flex-col justify-between bg-eggshell px-4 py-32 md:px-12 lg:px-60">
	<slot />
	<Footer />
</div>
