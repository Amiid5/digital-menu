<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	interface FormState {
		name: string;
		phone: string;
		email: string;
		date: string;
		time: string;
		guests: number;
	}

	interface FormErrors {
		name?: string;
		phone?: string;
		email?: string;
		date?: string;
		time?: string;
		submit?: string;
	}

	let form = $state<FormState>({
		name: '',
		phone: '',
		email: '',
		date: '',
		time: '',
		guests: 2
	});

	let errors = $state<FormErrors>({});
	let submitted = $state(false);
	let isSubmitting = $state(false);
	let tableNumber = $state<string | null>(null);

	const MAX_GUESTS = 12;

	function incGuests() {
		if (form.guests < MAX_GUESTS) form.guests += 1;
	}
	function decGuests() {
		if (form.guests > 1) form.guests -= 1;
	}

	function validate(): boolean {
		const e: FormErrors = {};
		if (!form.name.trim()) e.name = 'Please tell us your name.';
		if (!form.phone.trim()) e.phone = 'A phone number helps us confirm your table.';
		if (!form.email.trim()) {
			e.email = "We'll need an email to send your confirmation.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			e.email = 'That email address looks incomplete.';
		}
		if (!form.date) e.date = 'Choose a date for your visit.';
		if (!form.time) e.time = 'Choose a time for your visit.';
		errors = e;
		return Object.keys(e).length === 0;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		if (!validate()) return;

		isSubmitting = true;

		try {
			const res = await fetch('/api/reservations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			});

			const data = await res.json();

			if (!res.ok) throw new Error(data.message || 'Something went wrong.');

			tableNumber = data.tableNumber;
			submitted = true;
		} catch (err) {
			errors = { submit: err instanceof Error ? err.message : 'Something went wrong.' };
		} finally {
			isSubmitting = false;
		}
	}

	function bookAnother() {
		submitted = false;
		tableNumber = null;
		form = { name: '', phone: '', email: '', date: '', time: '', guests: 2 };
		errors = {};
	}

	let sectionEl: HTMLDivElement;

	onMount(() => {
		let cleanup: (() => void) | undefined;

		import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
			gsap.registerPlugin(ScrollTrigger);

			const content = sectionEl.querySelector('.book-content') as HTMLElement;
			const children = gsap.utils.toArray<HTMLElement>(content.children);

			gsap.set(children, { opacity: 0, y: 36 });

			const tl = gsap.timeline({ paused: true });
			tl.to(children, {
				opacity: 1,
				y: 0,
				duration: 0.9,
				ease: 'power3.out',
				stagger: 0.15
			});

			const st = ScrollTrigger.create({
				trigger: sectionEl,
				start: 'top 78%',
				end: 'bottom top',
				onEnter: () => tl.play(),
				onLeaveBack: () => tl.reverse()
			});

			cleanup = () => {
				st.kill();
				tl.kill();
			};
		});

		return () => cleanup?.();
	});

	const todayISO = new Date().toISOString().split('T')[0];
</script>

<div bind:this={sectionEl} id="book-table" class="bg-showCase py-10 px-4 sm:px-6">
	<div
		class="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 rounded-[14px] overflow-hidden border border-black/15 bg-showCaseBg"
	>
		<!-- image side -->
		<div class="hidden lg:block relative">
			<img
				src="showCase/IMAGE (8).png"
				alt="Warm, candlelit dining room at Carro Edeg"
				class="absolute inset-0 w-full h-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20"></div>

			<div class="relative h-full flex flex-col justify-end p-10 gap-4 text-white">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" class="text-gold">
					<path
						d="M12 2 C12 2 7 6 7 11 C7 13.7614 9.23858 16 12 16 C14.7614 16 17 13.7614 17 11 C17 6 12 2 12 2 Z"
						stroke="currentColor"
						stroke-width="1.3"
					/>
					<path d="M12 16 V22" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
				</svg>
				<p class="font-lora text-2xl sm:text-3xl leading-snug max-w-sm">
					"A table here is never just a table — it's an evening, held for you."
				</p>
				<span class="text-white/70 text-sm font-spaceGrotesk tracking-wide">Carro Edeg</span>
			</div>
		</div>

		<!-- form side -->
		<div class="book-content flex flex-col gap-8 p-6 sm:p-10 lg:p-12 justify-center">
			<div class="flex flex-col gap-3">
				<span class="text-gold font-bold font-lora text-sm tracking-wide uppercase">
					Reservations
				</span>
				<h2 class="text-3xl sm:text-4xl font-lora">Book a Table</h2>
				<p class="text-black/60 font-lora text-[15px] lg:hidden">
					"A table here is never just a table — it's an evening, held for you."
				</p>
				<p class="text-black/60 text-sm hidden lg:block">
					Tell us when you'd like to join us, and we'll have your table waiting.
				</p>
			</div>

			{#if submitted}
				<div class="flex flex-col items-start gap-4 py-6">
					<div
						class="w-12 h-12 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center"
					>
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" class="text-gold">
							<path
								d="M5 13l4 4L19 7"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
					<div class="flex flex-col gap-1">
						<h3 class="font-lora text-xl">Request received, {form.name.split(' ')[0]}.</h3>
						<p class="text-black/60 text-sm max-w-sm">
							We've reserved <strong class="text-black">Table {tableNumber}</strong> for {form.guests}
							{form.guests === 1 ? 'guest' : 'guests'} on {form.date} at {form.time}. A confirmation
							has been sent to {form.email}.
						</p>
					</div>
					<button
						onclick={bookAnother}
						class="text-gold font-bold font-lora text-sm underline-offset-4 hover:underline"
					>
						Book another table
					</button>
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="flex flex-col gap-5" novalidate>
					<div class="flex flex-col gap-1.5">
						<label for="name" class="text-sm font-spaceGrotesk text-black/80">Full name</label>
						<input
							id="name"
							type="text"
							bind:value={form.name}
							placeholder="Your name"
							class={`bg-white border rounded-[8px] px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-gold ${errors.name ? 'border-red-400' : 'border-black/20'}`}
						/>
						{#if errors.name}<span class="text-red-500 text-xs">{errors.name}</span>{/if}
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div class="flex flex-col gap-1.5">
							<label for="phone" class="text-sm font-spaceGrotesk text-black/80">Phone</label>
							<input
								id="phone"
								type="tel"
								bind:value={form.phone}
								placeholder="+252 ..."
								class={`bg-white border rounded-[8px] px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-gold ${errors.phone ? 'border-red-400' : 'border-black/20'}`}
							/>
							{#if errors.phone}<span class="text-red-500 text-xs">{errors.phone}</span>{/if}
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="email" class="text-sm font-spaceGrotesk text-black/80">Email</label>
							<input
								id="email"
								type="email"
								bind:value={form.email}
								placeholder="you@email.com"
								class={`bg-white border rounded-[8px] px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-gold ${errors.email ? 'border-red-400' : 'border-black/20'}`}
							/>
							{#if errors.email}<span class="text-red-500 text-xs">{errors.email}</span>{/if}
						</div>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
						<div class="flex flex-col gap-1.5">
							<label for="date" class="text-sm font-spaceGrotesk text-black/80">Date</label>
							<input
								id="date"
								type="date"
								min={todayISO}
								bind:value={form.date}
								class={`bg-white border rounded-[8px] px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-gold ${errors.date ? 'border-red-400' : 'border-black/20'}`}
							/>
							{#if errors.date}<span class="text-red-500 text-xs">{errors.date}</span>{/if}
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="time" class="text-sm font-spaceGrotesk text-black/80">Time</label>
							<input
								id="time"
								type="time"
								bind:value={form.time}
								class={`bg-white border rounded-[8px] px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-gold ${errors.time ? 'border-red-400' : 'border-black/20'}`}
							/>
							{#if errors.time}<span class="text-red-500 text-xs">{errors.time}</span>{/if}
						</div>
					</div>

					<div class="flex flex-col gap-1.5">
						<span class="text-sm font-spaceGrotesk text-black/80">Guests</span>
						<div
							class="flex items-center justify-between bg-white border border-black/20 rounded-[8px] px-4 py-2.5 w-full sm:w-44"
						>
							<button
								type="button"
								onclick={decGuests}
								aria-label="Decrease guests"
								class="w-7 h-7 flex items-center justify-center rounded-full border border-black/20 text-black/70 hover:border-gold hover:text-gold transition-colors duration-200"
							>
								−
							</button>
							<span class="font-spaceGrotesk text-sm">
								{form.guests}
								{form.guests === 1 ? 'guest' : 'guests'}
							</span>
							<button
								type="button"
								onclick={incGuests}
								aria-label="Increase guests"
								class="w-7 h-7 flex items-center justify-center rounded-full border border-black/20 text-black/70 hover:border-gold hover:text-gold transition-colors duration-200"
							>
								+
							</button>
						</div>
					</div>

					{#if errors.submit}
						<p class="text-red-500 text-sm">{errors.submit}</p>
					{/if}

					<button
						type="submit"
						disabled={isSubmitting}
						class="mt-2 bg-gold text-black font-lora font-bold px-6 py-3.5 rounded-[8px] hover:bg-gold/90 transition-colors duration-300 disabled:opacity-60 disabled:cursor-wait inline-flex items-center justify-center gap-2"
					>
						{#if isSubmitting}
							<span
								class="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"
							></span>
							Reserving...
						{:else}
							Reserve My Table
						{/if}
					</button>
				</form>
			{/if}
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
