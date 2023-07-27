<script lang="ts">
	export let href: string;
	export let target: '_blank' | '_parent' | '_self' | '_top' = '_blank';
</script>

<a {href} {target} class="underline underline-offset-4 transition-all hover:text-gray-600"
	><slot /></a
>
