<script lang="ts">
	export let href: string;
	export let label: string;
</script>

<a {href} class="group flex items-center gap-2 transition-opacity hover:opacity-70"
	>{label}
	<iconify-icon
		icon="gg:arrow-right"
		class="mt-[2px] text-xl transition-all group-hover:translate-x-1"
	/></a
>
