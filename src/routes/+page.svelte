<script>
	import Collection from '../components/Collection.svelte';
	import Link from '../components/Link.svelte';
	import PreviewCard from '../components/PreviewCard.svelte';

	export let data;
</script>

<div class="flex flex-col gap-12 pt-8 md:pt-24">
	<section>
		<h1 class="pb-12 font-sans-black text-[4rem] md:text-[5rem]">Fergus Farrell</h1>
		<p class="max-w-3xl text-lg leading-8">
			Freelance web developer — <Link
				href="mailto:fergusfrl@gmail.com?subject=Work Availability Enquiry&body=Please include as much of the following information as you have available:%0D%0A
				1. Brief description of your project and its objectives.%0D%0A
				2. Desired features and functionalities for the website.%0D%0A
				3. Any specific design preferences or examples of websites you like.%0D%0A
				4. Expected timeline for the project completion.%0D%0A
				5. Your budget range for the development.%0D%0A
				%0D%0A
				I'll be in touch to organise a face to face.">available for enquiry</Link
			>! Previously, technical lead at <Link href="https://www.batch.nz/">Batch</Link>, cloud
			engineer at <Link href="https://www.linkedin.com/company/akeela/">Akeela</Link>, full stack
			developer at <Link href="https://comrad.co.nz/">Comrad</Link> and <Link
				href="https://orionhealth.com/nz/">Orion Health</Link
			>, and CS at <Link href="https://www.otago.ac.nz/">Otago</Link>, NZ. Email me at
			<Link href="mailto:fergusfrl@gmail.com">fergusfrl@gmail.com</Link>.
		</p>
	</section>

	<div class="flex flex-col gap-28 pt-28">
		<Collection title="Work" href="/work">
			<ul class="flex flex-wrap justify-between gap-8">
				{#each data.work as work}
					<li class="block flex-1 last:md:hidden last:lg:block">
						<PreviewCard href={`/work/${work.slug}`} label={work.title} image={work.image} />
					</li>
				{/each}
			</ul>
		</Collection>

		<Collection title="Writing" href="/writing">
			<ul class="flex flex-wrap justify-between gap-8 lg:grid lg:grid-cols-4">
				{#each data.writing as writing}
					<li class="flex-1 first:col-span-2 first:row-span-2 last:hidden last:lg:block">
						<PreviewCard
							href={`/writing/${writing.slug}`}
							label={writing.title}
							snippet={writing.snippet}
							image={writing.image}
						/>
					</li>
				{/each}
			</ul>
		</Collection>
	</div>
</div>
