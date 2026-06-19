<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { gsap } from 'gsap';

	interface GalleryImage {
		id: number;
		src: string;
		alt: string;
	}

	let images = $state<GalleryImage[]>([
		{ id: 1, src: 'slides/IMAGE (1).png', alt: 'Restaurant interior' },
		{ id: 2, src: 'slides/IMAGE (2).png', alt: 'Plated dish' },
		{ id: 3, src: 'slides/IMAGE (3).png', alt: 'Dining area' },
		{ id: 4, src: 'slides/IMAGE (4).png', alt: 'Chef preparing food' },
		{ id: 5, src: 'slides/IMAGE (5).png', alt: 'Fresh ingredients' },
		{ id: 6, src: 'slides/IMAGE (6).png', alt: 'Bar setting' },
		{ id: 7, src: 'slides/IMAGE (1).png', alt: 'Restaurant interior' },
		{ id: 8, src: 'slides/IMAGE (2).png', alt: 'Plated dish' },
		{ id: 9, src: 'slides/IMAGE (3).png', alt: 'Dining area' },
		{ id: 10, src: 'slides/IMAGE (4).png', alt: 'Chef preparing food' }
	]);

	const PAGE_SIZE = 6;
	let visibleCount = $state(PAGE_SIZE);
	let isLoading = $state(false);

	let visibleImages = $derived(images.slice(0, visibleCount));
	let hasMore = $derived(visibleCount < images.length);

	let sectionEl: HTMLDivElement;
	let gridEl: HTMLDivElement;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let entranceDone = false;

	function animateTiles(tiles: Element[]) {
		gsap.fromTo(
			tiles,
			{ opacity: 0, y: 40 },
			{
				opacity: 1,
				y: 0,
				duration: 0.7,
				ease: 'power3.out',
				stagger: 0.08
			}
		);
	}

	onMount(() => {
		let cleanup: (() => void) | undefined;

		import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
			gsap.registerPlugin(ScrollTrigger);

			const header = sectionEl.querySelector('.gallery-header') as HTMLElement;
			const headerChildren = gsap.utils.toArray<HTMLElement>(header.children);
			const initialTiles = gsap.utils.toArray<HTMLElement>(gridEl.children);

			gsap.set(headerChildren, { opacity: 0, y: 24 });
			gsap.set(initialTiles, { opacity: 0, y: 40 });

			const tl = gsap.timeline({ paused: true });
			tl.to(headerChildren, {
				opacity: 1,
				y: 0,
				duration: 0.9,
				ease: 'power3.out',
				stagger: 0.15
			});
			tl.to(
				initialTiles,
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
					ease: 'power3.out',
					stagger: 0.08
				},
				'-=0.4'
			);

			const st = ScrollTrigger.create({
				trigger: sectionEl,
				start: 'top 80%',
				end: 'bottom top',
				onEnter: () => {
					entranceDone = true;
					tl.play();
				},
				onLeaveBack: () => {
					entranceDone = false;
					tl.reverse();
				}
			});

			cleanup = () => {
				st.kill();
				tl.kill();
			};
		});

		return () => cleanup?.();
	});

	async function loadMore() {
		if (isLoading || !hasMore) return;
		isLoading = true;

		await new Promise<void>((resolve) => setTimeout(resolve, 500));

		const previousCount = visibleCount;
		visibleCount = Math.min(visibleCount + PAGE_SIZE, images.length);
		isLoading = false;

		await tick();

		const newTiles = Array.from(gridEl.children).slice(previousCount);
		if (newTiles.length) animateTiles(newTiles);

		newTiles[0]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}
</script>

<div bind:this={sectionEl} class="my-20 control flex flex-col gap-10">
	<div
		class="gallery-header flex flex-col px-2 sm:flex-row justify-between items-start sm:items-center gap-6"
	>
		<div class="flex flex-col gap-4">
			<span class="font-bold font-lora text-2xl text-gold">Photo Gallery</span>
			<h2 class="text-3xl sm:text-4xl md:text-5xl font-medium font-lora capitalize">
				Life at Carro Edeg
			</h2>
		</div>

		{#if hasMore}
			<button
				onclick={loadMore}
				disabled={isLoading}
				class="bg-gold text-black font-lora mx-2 md:mx-0 px-6 py-2 font-bold hover:bg-gold/90 transition-colors duration-300 cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-wait inline-flex items-center gap-2"
			>
				{#if isLoading}
					<span
						class="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin"
					></span>
					Loading...
				{:else}
					View more Photos
				{/if}
			</button>
		{:else}
			<span class="text-black/50 font-lora text-sm px-2 md:px-0 whitespace-nowrap">
				You've seen it all
			</span>
		{/if}
	</div>

	<div class="flex flex-col gap-8 px-2">
		<div
			bind:this={gridEl}
			class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-flow-row-dense auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[200px] gap-4 sm:gap-6"
		>
			{#each visibleImages as image, i (image.id)}
				<div
					class={`relative overflow-hidden rounded-[10px] border border-black/20 bg-showCaseBg group cursor-pointer transition-shadow duration-300 hover:shadow-[0_10px_34px_rgba(0,0,0,0.12)] ${i % 5 === 0 ? 'col-span-2 row-span-2' : ''}`}
				>
					<img
						src={image.src}
						alt={image.alt}
						loading="lazy"
						class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					></div>
					<span
						class="absolute bottom-3 left-3 text-white text-sm font-lora opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
					>
						{image.alt}
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			transition-duration: 0.01ms !important;
		}
	}
</style>
