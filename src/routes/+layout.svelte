<script>
	import { page } from '$app/stores';
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import { fade } from 'svelte/transition';

	export let data;

	const durationMicroSeconds = 200;
</script>

<svelte:head>
	<title>{$page.data.seo.title}</title>
	<meta name="description" content={$page.data.seo.description} />
</svelte:head>

{#key data.url}
	<div class="min-h-screen w-screen border-8 border-slate">
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
