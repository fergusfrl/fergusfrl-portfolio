<script lang="ts">
	import 'iconify-icon';
	import FooterSegment from './FooterSegment.svelte';

	const socialLinks = [
		{
			label: 'LinkedIn',
			icon: 'mdi:linkedin',
			link: 'https://www.linkedin.com/in/fergusfrl/'
		},
		{
			label: 'Github',
			icon: 'mdi:github',
			link: 'https://github.com/fergusfrl'
		},
		{
			label: 'Email',
			icon: 'mdi:email',
			link: 'mailto:fergusfrl@gmail.com'
		}
	];
</script>

<footer class="container flex flex-col pt-10 md:pt-20">
	<FooterSegment>
		<p class="text-xl font-bold md:text-2xl">Let's have a chat. Come find me on the web.</p>
		<ul class="mt-8 flex justify-center gap-2">
			{#each socialLinks as socialLink}
				<li>
					<a href={socialLink.link} target="_blank" class="p-2">
						<iconify-icon
							title={socialLink.label}
							class="text-2xl text-primary transition-all hover:scale-110 md:text-3xl"
							icon={socialLink.icon}
						/>
					</a>
				</li>
			{/each}
		</ul>
	</FooterSegment>
	<FooterSegment>
		<span class="text-sm text-slate-light dark:text-slate-lightest"
			>Fergus Farrell | {new Date().getFullYear()}</span
		>
	</FooterSegment>
</footer>
