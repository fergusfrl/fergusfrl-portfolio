<script lang="ts">
	import { browser } from '$app/environment';

	let darkMode = true;

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}

	function toggleDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}
</script>

<button
	on:click={toggleDarkMode}
	class="hover:text-primary"
	title={darkMode ? 'Light Mode' : 'Dark Mode'}
>
	{darkMode ? 'Light' : 'Dark'}
</button>
