<script lang="ts">
	const images = [
		'slides/IMAGE (1).png',
		'slides/IMAGE (2).png',
		'slides/IMAGE (3).png',
		'slides/IMAGE (4).png',
		'slides/IMAGE (5).png',
		'slides/IMAGE (6).png'
	];

	const track = [...images, ...images];
</script>

<section class="w-full overflow-hidden py-10 mt-10 mb-20 border-y border-y-black/10">
	<div class="flex gap-8 w-max animate-marquee">
		{#each track as src, i (i)}
			<div class="w-72 h-48 rounded-xl overflow-hidden flex-shrink-0">
				<img {src} alt="image {i}" class="w-full h-full object-cover" draggable="false" />
			</div>
		{/each}
	</div>
</section>
