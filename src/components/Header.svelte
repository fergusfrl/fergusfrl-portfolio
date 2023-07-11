<script lang="ts">
	import { page } from '$app/stores';

	let darkMode = true;

	function toggleDarkMode() {
		darkMode = !darkMode;

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	const links = [
		{
			label: 'Home',
			path: '/'
		},
		{
			label: 'Blog',
			path: '/blog'
		}
	];
</script>

<header class="mb-4 flex justify-between py-8 md:mb-8 md:py-16">
	<nav>
		<ul class="flex gap-4">
			{#each links as link}
				<li>
					<a
						href={link.path}
						class="px-2 hover:text-primary"
						class:active={$page.url.pathname === link.path ||
							$page.url.pathname
								.split('/')
								.filter((pathSeg) => pathSeg !== '')
								.includes(link.path.replace('/', ''))}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<button on:click={toggleDarkMode} class="hover:text-primary">
		{#if darkMode}Light{:else}Dark{/if}
	</button>
</header>

<style lang="postcss">
	.active {
		@apply underline decoration-primary decoration-4 underline-offset-8;
	}
</style>
