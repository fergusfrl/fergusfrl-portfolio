<script lang="ts">
	import { page } from '$app/stores';
	import 'iconify-icon';
	import '../app.css';

	import Footer from '../components/Footer.svelte';
	import shareImg from '$lib/assets/headshot.jpg';
</script>

<svelte:head>
	<!-- Title -->
	<title>{$page.data.seo.title}</title>
	<meta property="og:title" content={$page.data.seo.title} />
	<meta name="twitter:title" content={$page.data.seo.title} />

	<!-- Description -->
	<meta name="description" content={$page.data.seo.description} />
	<meta property="og:description" content={$page.data.seo.description} />
	<meta name="twitter:description" content={$page.data.seo.description} />

	<!-- image -->
	<meta property="og:image" content={shareImg} />
	<meta name="twitter:image" content={shareImg} />

	<!-- url -->
	<link rel="canonical" href={$page.url.href} />
	<meta property="og:url" content={$page.url.href} />
	<meta name="twitter:url" content={$page.url.href} />
</svelte:head>

<div
	class="mx-auto flex flex-col justify-between bg-eggshell px-4 py-32 font-sans sm:px-12 lg:px-60"
>
	<slot />
	<Footer />
</div>
