<script>
	import image from '$lib/assets/wedding-longshot.jpeg';
	import Image from '../components/Image.svelte';
</script>

<div class="flex flex-col gap-y-10 md:gap-y-20">
	<h1 class="reading-view text-3xl font-bold leading-relaxed md:text-4xl">
		Hello, I’m <span class="text-primary">Fergus Farrell</span>. I’m a Software Developer living in
		Christchurch, NZ.
	</h1>

	<Image src={image} alt="Fergus Farrell wedding landscape" />
	<!-- <img src={image} alt="test" /> -->

	<p class="reading-view leading-loose">
		I am a full stack web developer with a passion for simple, clean design.
		<span class="text-primary"> Simplicity is elegance.</span>
		<br />I work at
		<a
			href="https://www.batch.nz/"
			target="_blank"
			rel="noopener noreferrer"
			class="text-primary underline underline-offset-2 hover:no-underline"
		>
			Batch
		</a>
		where we dream up, design and develop websites, web apps and online stores.
		<br /><br />
		In the weekends I'm a whitewater kayaker, mountain biker and outdoor adventurer.
	</p>
</div>
