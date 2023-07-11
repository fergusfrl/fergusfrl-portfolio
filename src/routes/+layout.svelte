<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import shareImg from '$lib/assets/headshot.jpg';

	export let data;

	const durationMicroSeconds = 200;
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

{#key data.url}
	<div class="min-h-screen w-full border-8 border-slate bg-white dark:bg-slate dark:text-white">
		<div class="container mx-auto flex h-full flex-col justify-between px-4 md:px-0">
			<div>
				<Header />
				<div
					in:fade={{ duration: durationMicroSeconds, delay: durationMicroSeconds }}
					out:fade={{ duration: durationMicroSeconds }}
				>
					<slot />
				</div>
			</div>
			<Footer />
		</div>
	</div>
{/key}
