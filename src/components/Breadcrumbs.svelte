<script lang="ts">
	export let breadcrumbs: { label: string; href: string }[];
</script>

<ul class="flex gap-8 text-lg">
	{#each breadcrumbs as breadcrumb}
		<li>
			<a class="transition-opacity hover:opacity-70" href={breadcrumb.href}>{breadcrumb.label}</a>
		</li>
		<li>/</li>
	{/each}
</ul>
