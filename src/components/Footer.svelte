<script lang="ts">
	import 'iconify-icon';
	import Link from './Link.svelte';

	const socialLinks = [
		{
			label: 'LinkedIn',
			link: 'https://www.linkedin.com/in/fergusfrl/'
		},
		{
			label: 'Github',
			link: 'https://github.com/fergusfrl'
		},
		{
			label: 'Email',
			link: 'mailto:fergusfrl@gmail.com'
		}
	];

	const indexPages = [
		{
			label: 'Work',
			link: '/writing'
		},
		{
			label: 'Writing',
			link: '/writing'
		}
	];
</script>

<footer class="container flex flex-col gap-8 pt-36">
	<ul class="flex gap-4">
		{#each socialLinks as socialLink}
			<li>
				<Link href={socialLink.link}>{socialLink.label}</Link>
			</li>
		{/each}
	</ul>
	<ul class="flex gap-4">
		{#each indexPages as indexPage}
			<li>
				<Link href={indexPage.link}>{indexPage.label}</Link>
			</li>
		{/each}
	</ul>
</footer>
