<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	onMount(() => {
		let cleanup: (() => void) | undefined;

		import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
			gsap.registerPlugin(ScrollTrigger);

			const header = document.querySelector<HTMLElement>('.showcase-header');
			const showcase = document.querySelector<HTMLElement>('.bg-showCase');

			if (!header || !showcase) {
				console.warn('Showcase: required elements not found in the DOM.');
				return;
			}

			const cards = gsap.utils.toArray<HTMLElement>('[data-card]');
			const headerChildren = gsap.utils.toArray<HTMLElement>(header.children);
			const flourishes = gsap.utils.toArray<HTMLElement>('[data-flourish]');

			// Initial hidden state
			gsap.set(headerChildren, { opacity: 0, y: 30 });
			gsap.set(cards, { opacity: 0, y: 70 });
			gsap.set(flourishes, { opacity: 0, scale: 0.8 });

			// Master timeline — scrubbed by a single ScrollTrigger so it can
			// play forward on enter and reverse cleanly on scroll-up/leave-back.
			const tl = gsap.timeline({ paused: true });

			tl.to(flourishes, {
				opacity: 1,
				scale: 1,
				duration: 0.6,
				ease: 'power2.out',
				stagger: 0.1
			});

			tl.to(
				headerChildren,
				{
					opacity: 1,
					y: 0,
					duration: 1.1,
					ease: 'power3.out',
					stagger: 0.22
				},
				'-=0.3'
			);

			cards.forEach((card: HTMLElement, i: number): void => {
				tl.to(
					card,
					{
						opacity: 1,
						y: 0,
						duration: 0.9,
						ease: 'power3.out'
					},
					i === 0 ? '-=0.2' : '-=0.55'
				);
			});

			const st = ScrollTrigger.create({
				trigger: showcase,
				start: 'top 80%',
				end: 'bottom top',
				onEnter: (): void => {
					tl.play();
				},
				onLeaveBack: (): void => {
					tl.reverse();
				}
			});

			cleanup = (): void => {
				st.kill();
				tl.kill();
			};
		});

		return () => cleanup?.();
	});
</script>

<div class="bg-showCase relative h-fit py-10 px-4 sm:px-6 overflow-hidden">
	<!-- decorative side flourishes -->
	<svg
		data-flourish
		class="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 w-10 h-40 text-gold opacity-70"
		viewBox="0 0 40 160"
		fill="none"
	>
		<path d="M20 4 V100" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
		<path
			d="M20 100 C12 108, 6 118, 6 130 C6 142, 14 152, 20 156"
			stroke="currentColor"
			stroke-width="1"
			stroke-linecap="round"
			fill="none"
		/>
		<path
			d="M20 100 C28 108, 34 118, 34 130 C34 142, 26 152, 20 156"
			stroke="currentColor"
			stroke-width="1"
			stroke-linecap="round"
			fill="none"
		/>
		<circle cx="20" cy="4" r="3" fill="currentColor" />
	</svg>

	<svg
		data-flourish
		class="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 w-10 h-40 text-gold opacity-70 scale-x-[-1]"
		viewBox="0 0 40 160"
		fill="none"
	>
		<path d="M20 4 V100" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
		<path
			d="M20 100 C12 108, 6 118, 6 130 C6 142, 14 152, 20 156"
			stroke="currentColor"
			stroke-width="1"
			stroke-linecap="round"
			fill="none"
		/>
		<path
			d="M20 100 C28 108, 34 118, 34 130 C34 142, 26 152, 20 156"
			stroke="currentColor"
			stroke-width="1"
			stroke-linecap="round"
			fill="none"
		/>
		<circle cx="20" cy="4" r="3" fill="currentColor" />
	</svg>

	<div class="flex flex-col gap-8 sm:gap-10 max-w-[1440px] mx-auto relative">
		<div class="showcase-header flex flex-col justify-center items-center gap-4 text-center">
			<h2 class="text-3xl sm:text-4xl md:text-5xl font-lora">Signature Specials</h2>

			<!-- small divider: fork / leaf motif, echoes the side flourishes -->
			<div data-flourish class="flex items-center gap-3 text-gold">
				<span class="block w-10 h-px bg-gold/70"></span>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
					<path
						d="M12 2 C12 2 7 6 7 11 C7 13.7614 9.23858 16 12 16 C14.7614 16 17 13.7614 17 11 C17 6 12 2 12 2 Z"
						stroke="currentColor"
						stroke-width="1.3"
					/>
					<path d="M12 16 V22" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
				</svg>
				<span class="block w-10 h-px bg-gold/70"></span>
			</div>

			<span class="text-black/70 text-[16px] font-lora">
				Handpicked by our chef, made for your table.
			</span>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- column 1: stacked horizontal cards -->
			<div class="grid grid-cols-1 gap-6">
				<div
					data-card
					class="bg-showCaseBg flex flex-col sm:flex-row rounded-[10px] overflow-hidden w-full border border-black/20 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
				>
					<div class="w-full sm:w-2/5 h-48 sm:h-auto shrink-0 overflow-hidden">
						<img
							src="showCase/IMAGE (8).png"
							alt="Cedar-smoked sea bream with charred lemon"
							class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
						/>
					</div>
					<div class="flex flex-col gap-2 justify-center p-4">
						<span class="text-gold font-bold font-lora">Chef's Selection</span>
						<h2 class="font-medium font-spaceGrotesk">Cedar-Smoked Sea Bream</h2>
						<p class="text-black/60 text-[12px]">
							Slow-smoked bream with charred lemon, capers and roasted fennel.
						</p>
						<div>
							<span class="text-gold font-bold font-lora text-[18px]">$28</span>
						</div>
					</div>
				</div>

				<div
					data-card
					class="bg-showCaseBg flex flex-col sm:flex-row rounded-[10px] overflow-hidden w-full border border-black/20 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
				>
					<div class="w-full sm:w-2/5 h-48 sm:h-auto shrink-0 overflow-hidden">
						<img
							src="showCase/IMAGE (9).png"
							alt="Cedar-smoked sea bream with charred lemon"
							class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
						/>
					</div>
					<div class="flex flex-col gap-2 justify-center p-4">
						<span class="text-gold font-bold font-lora">Chef's Selection</span>
						<h2 class="font-medium font-spaceGrotesk">Cedar-Smoked Sea Bream</h2>
						<p class="text-black/60 text-[12px]">
							Slow-smoked bream with charred lemon, capers and roasted fennel.
						</p>
						<div>
							<span class="text-gold font-bold font-lora text-[18px]">$28</span>
						</div>
					</div>
				</div>
			</div>

			<!-- column 2 -->
			<div class="grid grid-cols-1 gap-6">
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div
						data-card
						class="bg-showCaseBg rounded-[10px] border border-black/20 overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
					>
						<div class="w-full aspect-[4/3] overflow-hidden">
							<img
								src="slides/IMAGE (1).png"
								alt="Cedar-smoked sea bream with charred lemon"
								class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
							/>
						</div>
						<div class="px-4 py-4 flex flex-col gap-3 flex-1">
							<div class="flex flex-col gap-2">
								<span class="text-gold font-bold font-lora">Chef's Selection</span>
								<h2 class="font-medium font-spaceGrotesk">Cedar-Smoked Sea Bream</h2>
								<p class="text-black/60 text-[12px]">
									Slow-smoked bream with charred lemon, capers and roasted fennel.
								</p>
							</div>
							<div>
								<span class="text-gold font-bold font-lora text-[18px]">$28</span>
							</div>
						</div>
					</div>

					<div
						data-card
						class="bg-showCaseBg rounded-[10px] border border-black/20 overflow-hidden flex flex-col transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
					>
						<div class="w-full aspect-[4/3] overflow-hidden">
							<img
								src="slides/IMAGE (6).png"
								alt="Cedar-smoked sea bream with charred lemon"
								class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
							/>
						</div>
						<div class="px-4 py-4 flex flex-col gap-3 flex-1">
							<div class="flex flex-col gap-2">
								<span class="text-gold font-bold font-lora">Chef's Selection</span>
								<h2 class="font-medium font-spaceGrotesk">Cedar-Smoked Sea Bream</h2>
								<p class="text-black/60 text-[12px]">
									Slow-smoked bream with charred lemon, capers and roasted fennel.
								</p>
							</div>
							<div>
								<span class="text-gold font-bold font-lora text-[18px]">$28</span>
							</div>
						</div>
					</div>
				</div>

				<div
					data-card
					class="bg-showCaseBg flex flex-col sm:flex-row rounded-[10px] overflow-hidden w-full border border-black/20 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
				>
					<div class="w-full sm:w-2/5 h-48 sm:h-auto shrink-0 overflow-hidden">
						<img
							src="showCase/IMAGE (10).png"
							alt="Cedar-smoked sea bream with charred lemon"
							class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
						/>
					</div>
					<div class="flex flex-col gap-2 justify-center p-4">
						<span class="text-gold font-bold font-lora">Chef's Selection</span>
						<h2 class="font-medium font-spaceGrotesk">Cedar-Smoked Sea Bream</h2>
						<p class="text-black/60 text-[12px]">
							Slow-smoked bream with charred lemon, capers and roasted fennel.
						</p>
						<div>
							<span class="text-gold font-bold font-lora text-[18px]">$28</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
