<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	let eyebrowEl: HTMLSpanElement;
	let headlineEl: HTMLHeadingElement;
	let dividerEl: HTMLDivElement;
	let scrollCueEl: HTMLDivElement;

	onMount(() => {
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

		gsap.set([eyebrowEl, headlineEl, dividerEl, scrollCueEl], { opacity: 0 });
		gsap.set(eyebrowEl, { y: 14 });
		gsap.set(headlineEl, { y: 36 });
		gsap.set(dividerEl, { scaleX: 0 });
		gsap.set(scrollCueEl, { y: -8 });

		tl.to(eyebrowEl, { opacity: 1, y: 0, duration: 0.7 })
			.to(headlineEl, { opacity: 1, y: 0, duration: 1.1 }, '-=0.45')
			.to(dividerEl, { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
			.to(scrollCueEl, { opacity: 1, y: 0, duration: 0.8 }, '-=0.2');

		gsap.to(scrollCueEl, {
			y: 6,
			duration: 1.6,
			ease: 'sine.inOut',
			repeat: -1,
			yoyo: true,
			delay: 2.2
		});
	});
</script>

<div
	class="hero-banner relative flex justify-center h-[70vh] md:h-[100vh] border-b border-b-white/50 px-4 overflow-hidden"
>
	<div
		class="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45 pointer-events-none"
	></div>

	<div class="relative flex flex-col justify-center items-center gap-7 md:gap-9 z-10">
		<span
			bind:this={eyebrowEl}
			class="text-gold text-xs sm:text-sm font-spaceGrotesk tracking-[0.25em] uppercase"
		>
			Carro Edeg &middot; Est. Fine Dining
		</span>

		<h1
			bind:this={headlineEl}
			class="text-white text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[1.05] font-lora w-full max-w-[600px] lg:max-w-[820px] text-center"
		>
			Best Quality Foods
		</h1>

		<div bind:this={dividerEl} class="flex items-center gap-3 origin-center">
			<span class="block w-12 h-px bg-gold/70"></span>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-gold">
				<path
					d="M12 2 C12 2 7 6 7 11 C7 13.7614 9.23858 16 12 16 C14.7614 16 17 13.7614 17 11 C17 6 12 2 12 2 Z"
					stroke="currentColor"
					stroke-width="1.3"
				/>
				<path d="M12 16 V22" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
			</svg>
			<span class="block w-12 h-px bg-gold/70"></span>
		</div>

		<div
			class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full sm:w-auto px-4 sm:px-0 mt-2"
		>
			<a
				href="/restaurant"
				class="group relative bg-gold text-black font-bold font-mono capitalize px-8 py-3 rounded overflow-hidden transition-colors duration-300 hover:bg-gold/90 text-center"
			>
				Explore Menu
			</a>

			<span
				class="relative text-white font-bold font-mono capitalize px-8 py-3 rounded bg-transparent border border-white/40 transition-all duration-300 hover:border-gold hover:text-gold text-center"
			>
				<a href="#book-table"> Book Table </a>
			</span>
		</div>
	</div>

	<div
		bind:this={scrollCueEl}
		class="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-white/70 z-10"
	>
		<span class="text-[10px] font-spaceGrotesk tracking-[0.2em] uppercase">Scroll</span>
		<svg width="14" height="22" viewBox="0 0 14 22" fill="none">
			<rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" stroke-width="1" />
			<circle cx="7" cy="6" r="1.6" fill="currentColor" />
		</svg>
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
