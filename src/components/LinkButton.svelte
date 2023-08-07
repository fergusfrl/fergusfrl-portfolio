<script lang="ts">
	export let href: string;
	export let label: string;
	export let target: '_blank' | '_parent' | '_self' | '_top' = '_self';
</script>

<a {href} {target} class="group flex items-center gap-2 transition-opacity hover:opacity-70"
	>{label}
	<iconify-icon
		icon="gg:arrow-right"
		class="mt-[2px] text-xl transition-all group-hover:translate-x-1"
	/></a
>
