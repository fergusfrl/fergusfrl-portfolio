<script lang="ts">
	import type { Breadcrumb } from '../types';

	export let breadcrumbs: Breadcrumb[];
</script>

<ul class="flex gap-8 text-lg">
	{#each breadcrumbs as breadcrumb}
		<li>
			<a class="transition-opacity hover:opacity-70" href={breadcrumb.href}>{breadcrumb.label}</a>
		</li>
		<li>/</li>
	{/each}
</ul>
