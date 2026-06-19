<script lang="ts">
	import { Mail, MapPin, Phone } from '@lucide/svelte';

	const currentYear = new Date().getFullYear();

	const quickLinks = [
		{ label: 'our menu', href: '/restaurant' },
		{ label: 'breakfast', href: '/restaurant' },
		{ label: 'hot dishes', href: '/restaurant' },
		{ label: 'desserts', href: '/restaurant' },
		{ label: 'book a table', href: '#book-table' }
	];
</script>

<footer class="bg-[#1A1614] text-white">
	<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
		<div class="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 lg:gap-0">
			<!-- Brand -->
			<div class="flex flex-col gap-5 items-start">
				<div class="flex items-center gap-4">
					<div class="w-[120px] shrink-0">
						<img src="/Carro-Edeg-Hotel-logo.webp" class="w-full" alt="Carro Edeg logo" />
					</div>
					<div class="flex flex-col">
						<span class="uppercase font-lora text-[17px] font-bold tracking-widest leading-tight">
							carro edeg
						</span>
						<span
							class="capitalize text-[12px] font-lora font-bold text-[#C9A227] tracking-widest mt-0.5"
						>
							hotel & restaurant
						</span>
					</div>
				</div>
				<p class="text-[14px] leading-relaxed text-white/65 font-roboto max-w-[280px]">
					A destination for the finest culinary experiences, crafted with passion and served with
					care.
				</p>
			</div>

			<!-- Contact -->
			<div class="flex flex-col gap-5 items-start">
				<h2 class="font-bold font-lora uppercase tracking-widest text-[14px] text-[#C9A227]">
					Contact
				</h2>
				<div class="flex flex-col gap-4 items-start">
					<div class="flex gap-3 items-start">
						<MapPin size={18} class="text-[#C9A227] shrink-0 mt-0.5" />
						<span class="font-spaceGrotesk font-medium text-[14px] text-white/70 leading-relaxed">
							Wadada Madax-Tooyada, Hargeisa TG JH, Somaliland
						</span>
					</div>
					<div class="flex gap-3 items-center">
						<Phone size={18} class="text-[#C9A227] shrink-0" />

						<a
							href="tel:+252637369053"
							class="font-spaceGrotesk font-medium text-[14px] text-white/70 hover:text-[#C9A227] transition-colors duration-200"
						>
							+(252) 63 736 9053
						</a>
					</div>
					<div class="flex gap-3 items-center">
						<Mail size={18} class="text-[#C9A227] shrink-0" />

						<a
							href="mailto:reservations@carroedeghotels.com"
							class="font-spaceGrotesk font-medium text-[14px] text-white/70 hover:text-[#C9A227] transition-colors duration-200 break-all"
						>
							reservations@carroedeghotels.com
						</a>
					</div>
				</div>
			</div>

			<!-- Quick links -->
			<div class="flex flex-col gap-5 items-start">
				<h2 class="font-bold font-lora uppercase tracking-widest text-[14px] text-[#C9A227]">
					Quick Links
				</h2>
				<div class="flex flex-col gap-3.5 items-start">
					{#each quickLinks as link (link.label)}
						<a
							href={link.href}
							class="font-spaceGrotesk hover:text-[#C9A227] transition-colors duration-200 font-medium capitalize text-[14px] text-white/70"
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="border-t border-[#C9A227]/20 mt-12 pt-6">
			<div
				class="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center text-[12px] font-medium font-lora text-white/45"
			>
				<span>Digital Menu</span>
				<p>&copy; <span id="year">{currentYear}</span> Carro Edeg. All rights reserved.</p>
			</div>
		</div>
	</div>
</footer>
