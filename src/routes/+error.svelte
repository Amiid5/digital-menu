<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { page } from '$app/stores';

	// ---- Placeholders: swap these for your real components ----
	// import Header from '$lib/components/Header.svelte';
	// import Footer from '$lib/components/Footer.svelte';

	let numberEl: HTMLDivElement;
	let cardEl: HTMLDivElement;
	let lineEl: HTMLDivElement;
	let orb1: HTMLDivElement;
	let orb2: HTMLDivElement;
	let orb3: HTMLDivElement;
	let ringEl: HTMLDivElement;

	const status: number = $page.status ?? 404;
	const message: string = $page.error?.message ?? 'Page not found';

	onMount((): (() => void) => {
		const ctx = gsap.context((): void => {
			const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

			tl.from(numberEl, {
				y: 60,
				opacity: 0,
				duration: 1,
				scale: 0.85
			})
				.from(
					lineEl,
					{
						scaleX: 0,
						duration: 0.7,
						ease: 'power2.inOut'
					},
					'-=0.5'
				)
				.from(
					cardEl.querySelectorAll('.fade-up'),
					{
						y: 24,
						opacity: 0,
						duration: 0.6,
						stagger: 0.12
					},
					'-=0.3'
				);

			// Ambient floating orbs
			gsap.to(orb1, {
				y: -28,
				x: 14,
				duration: 6,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true
			});
			gsap.to(orb2, {
				y: 22,
				x: -18,
				duration: 7.5,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true,
				delay: 0.4
			});
			gsap.to(orb3, {
				y: -16,
				x: -10,
				duration: 5,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true,
				delay: 0.8
			});

			// Slow rotating decorative ring
			gsap.to(ringEl, {
				rotate: 360,
				duration: 40,
				ease: 'none',
				repeat: -1
			});

			// Subtle breathing glow on the number
			gsap.to(numberEl, {
				textShadow: '0 0 36px rgba(201,162,39,0.55)',
				duration: 2.2,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true,
				delay: 1
			});
		});

		return (): void => ctx.revert();
	});

	function handleButtonEnter(e: MouseEvent): void {
		gsap.to(e.currentTarget as HTMLElement, {
			scale: 1.04,
			duration: 0.25,
			ease: 'power2.out'
		});
	}

	function handleButtonLeave(e: MouseEvent): void {
		gsap.to(e.currentTarget as HTMLElement, {
			scale: 1,
			duration: 0.25,
			ease: 'power2.out'
		});
	}
</script>

<svelte:head>
	<title>{status} — Page Not Found</title>
</svelte:head>

<div class="page-shell">
	<!-- <Header /> -->
	<header class="header-placeholder">
		<!-- your Header component goes here -->
	</header>

	<main class="error-main">
		<!-- Decorative rotating ring -->
		<div bind:this={ringEl} class="deco-ring" aria-hidden="true">
			<svg viewBox="0 0 200 200" width="100%" height="100%">
				<circle
					cx="100"
					cy="100"
					r="92"
					fill="none"
					stroke="rgba(201,162,39,0.18)"
					stroke-width="1"
					stroke-dasharray="2 10"
				/>
			</svg>
		</div>

		<!-- Floating orbs -->
		<div bind:this={orb1} class="orb orb-1" aria-hidden="true"></div>
		<div bind:this={orb2} class="orb orb-2" aria-hidden="true"></div>
		<div bind:this={orb3} class="orb orb-3" aria-hidden="true"></div>

		<div class="content-card" bind:this={cardEl}>
			<div bind:this={numberEl} class="status-number">{status}</div>
			<div bind:this={lineEl} class="gold-line" aria-hidden="true"></div>

			<h1 class="fade-up title">Lost in the margins</h1>
			<p class="fade-up subtitle">
				{message || "The page you're looking for doesn't exist or may have moved."}
			</p>

			<div class="fade-up actions">
				<a
					href="/"
					class="btn-primary"
					on:mouseenter={handleButtonEnter}
					on:mouseleave={handleButtonLeave}
				>
					Back to home
				</a>
			</div>
		</div>
	</main>

	<!-- <Footer /> -->
	<footer class="footer-placeholder">
		<!-- your Footer component goes here -->
	</footer>
</div>

<style>
	:global(:root) {
		--gold: #c9a227;
		--gold-soft: rgba(201, 162, 39, 0.12);
		--gold-line: rgba(201, 162, 39, 0.4);
		--ink: #1a1a1a;
		--ink-soft: #6b6b6b;
	}

	.page-shell {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: #ffffff;
		font-family: 'Lora', serif;
	}

	.header-placeholder,
	.footer-placeholder {
		width: 100%;
	}

	.error-main {
		position: relative;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 1.5rem;
		overflow: hidden;
	}

	.deco-ring {
		position: absolute;
		top: 50%;
		left: 50%;
		width: clamp(420px, 55vw, 720px);
		height: clamp(420px, 55vw, 720px);
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 0;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(circle at 30% 30%, var(--gold-soft), transparent 70%);
		filter: blur(2px);
		pointer-events: none;
		z-index: 0;
	}

	.orb-1 {
		width: 140px;
		height: 140px;
		top: 14%;
		left: 12%;
	}

	.orb-2 {
		width: 90px;
		height: 90px;
		bottom: 18%;
		right: 14%;
	}

	.orb-3 {
		width: 60px;
		height: 60px;
		top: 22%;
		right: 20%;
	}

	.content-card {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 560px;
		width: 100%;
	}

	.status-number {
		font-family: 'Lora', serif;
		font-weight: 600;
		font-size: clamp(5rem, 16vw, 9rem);
		line-height: 1;
		color: var(--gold);
		letter-spacing: -0.02em;
	}

	.gold-line {
		width: 72px;
		height: 2px;
		background: var(--gold);
		margin: 1.5rem 0;
		transform-origin: center;
	}

	.title {
		font-family: 'Lora', serif;
		font-weight: 600;
		font-size: clamp(1.5rem, 3vw, 2.1rem);
		color: var(--ink);
		margin: 0 0 0.75rem;
	}

	.subtitle {
		font-family: 'Lora', serif;
		font-weight: 400;
		font-size: 1.05rem;
		line-height: 1.7;
		color: var(--ink-soft);
		margin: 0 0 2.5rem;
		max-width: 420px;
	}

	.actions {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.btn-primary,
	.btn-secondary {
		font-family: 'Lora', serif;
		font-size: 0.95rem;
		font-weight: 500;
		padding: 0.85rem 1.9rem;
		border-radius: 4px;
		text-decoration: none;
		display: inline-block;
		transition:
			background-color 0.25s ease,
			color 0.25s ease,
			border-color 0.25s ease;
	}

	.btn-primary {
		background: var(--gold);
		color: #ffffff;
		border: 1px solid var(--gold);
	}

	.btn-primary:hover {
		background: #b3901f;
		border-color: #b3901f;
	}

	.btn-secondary {
		background: transparent;
		color: var(--ink);
		border: 1px solid var(--gold-line);
	}

	.btn-secondary:hover {
		border-color: var(--gold);
		color: var(--gold);
	}

	@media (max-width: 480px) {
		.actions {
			flex-direction: column;
			width: 100%;
		}

		.btn-primary,
		.btn-secondary {
			width: 100%;
		}
	}
</style>
