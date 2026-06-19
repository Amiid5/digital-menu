<script lang="ts">
	import { gsap } from 'gsap';
	import { onMount, tick } from 'svelte';

	interface MenuItem {
		category: string;
		image: string;
		title: string;
		price: number;
		description: string;
	}

	let activeCategory = $state('Breakfast');
	let gridEl = $state<HTMLDivElement | null>(null);

	const menuData: MenuItem[] = [
		// Breakfast
		{
			category: 'Breakfast',
			image: 'slides/IMAGE (1).png',
			title: 'French Toast Brioche',
			price: 22,
			description:
				'Thick-cut brioche soaked in vanilla custard, pan-seared golden, finished with maple butter and berries'
		},
		{
			category: 'Breakfast',
			image: 'slides/IMAGE (2).png',
			title: 'Classic Eggs Benedict',
			price: 24,
			description:
				'Poached eggs and smoked ham on a toasted English muffin, draped in silky hollandaise'
		},
		{
			category: 'Breakfast',
			image: 'slides/IMAGE (3).png',
			title: 'Granola & Greek Yogurt',
			price: 16,
			description:
				'House-toasted granola layered with creamy Greek yogurt, honey, and fresh seasonal berries'
		},

		// Cold Starters
		{
			category: 'Cold Starters',
			image: 'slides/IMAGE (4).png',
			title: 'Creamed Chicken Soup',
			price: 29,
			description:
				'A rich and velvety broth simmered with tender shredded chicken, fresh herbs, and a touch of cream'
		},
		{
			category: 'Cold Starters',
			image: 'slides/IMAGE (5).png',
			title: 'Smoked Salmon Carpaccio',
			price: 32,
			description:
				'Delicately sliced cold-smoked salmon with capers, shaved fennel, and a citrus dill dressing'
		},
		{
			category: 'Cold Starters',
			image: 'slides/IMAGE (6).png',
			title: 'Burrata Caprese',
			price: 27,
			description:
				'Creamy burrata over heirloom tomatoes, basil, and a drizzle of aged balsamic and olive oil'
		},

		// Hot Starters
		{
			category: 'Hot Starters',
			image: 'slides/IMAGE (1).png',
			title: 'Crispy Calamari',
			price: 26,
			description:
				'Lightly battered calamari rings, fried to a golden crisp, served with a smoked paprika aioli'
		},
		{
			category: 'Hot Starters',
			image: 'slides/IMAGE (2).png',
			title: 'Truffle Arancini',
			price: 24,
			description:
				'Crisp risotto balls filled with mozzarella and black truffle, served with a wild mushroom sauce'
		},

		// Hot Dishes (Lunch)
		{
			category: 'Hot Dishes (Lunch)',
			image: 'slides/IMAGE (3).png',
			title: 'Grilled Chicken Caesar',
			price: 26,
			description:
				'Grilled chicken breast over crisp romaine, parmesan, and croutons with a classic Caesar dressing'
		},
		{
			category: 'Hot Dishes (Lunch)',
			image: 'slides/IMAGE (4).png',
			title: 'Pan-Seared Salmon',
			price: 34,
			description:
				'Crisp-skinned salmon fillet over a bed of lemon herb couscous and grilled asparagus'
		},

		// Hot Dishes (Dinner)
		{
			category: 'Hot Dishes (Dinner)',
			image: 'slides/IMAGE (5).png',
			title: 'Grilled Lamb Chops',
			price: 48,
			description:
				'Herb-marinated lamb chops grilled to perfection, served with rosemary jus and roasted root vegetables'
		},
		{
			category: 'Hot Dishes (Dinner)',
			image: 'slides/IMAGE (6).png',
			title: 'Beef Tenderloin',
			price: 52,
			description:
				'Slow-roasted beef tenderloin with a red wine reduction, truffle mash, and seasonal vegetables'
		},

		// Pizza Corner
		{
			category: 'Pizza Corner',
			image: 'slides/IMAGE (1).png',
			title: 'Truffle Margherita Pizza',
			price: 34,
			description:
				'Wood-fired thin crust topped with san marzano tomato, fior di latte mozzarella, basil, and black truffle shavings'
		},
		{
			category: 'Pizza Corner',
			image: 'slides/IMAGE (2).png',
			title: 'Pepperoni Classic',
			price: 28,
			description: 'A timeless favorite with spicy pepperoni, mozzarella, and a rich tomato base'
		},

		// Fast Foods
		{
			category: 'Fast Foods',
			image: 'slides/IMAGE (3).png',
			title: 'Classic Beef Burger',
			price: 24,
			description:
				'A juicy grilled beef patty with aged cheddar, caramelized onions, and house sauce on a brioche bun'
		},
		{
			category: 'Fast Foods',
			image: 'slides/IMAGE (4).png',
			title: 'Crispy Chicken Wrap',
			price: 20,
			description:
				'Crispy fried chicken, lettuce, and a tangy ranch sauce wrapped in a soft tortilla'
		},

		// Indian Dishes
		{
			category: 'Indian Dishes',
			image: 'slides/IMAGE (5).png',
			title: 'Butter Chicken',
			price: 27,
			description:
				'Tender chicken simmered in a velvety tomato and butter curry, served with fragrant basmati rice'
		},
		{
			category: 'Indian Dishes',
			image: 'slides/IMAGE (6).png',
			title: 'Lamb Rogan Josh',
			price: 31,
			description: 'Slow-braised lamb in a deeply spiced kashmiri chili and yogurt curry'
		},

		// Drinks
		{
			category: 'Drinks',
			image: 'slides/IMAGE (1).png',
			title: 'Fresh Citrus Spritz',
			price: 14,
			description:
				'A refreshing blend of fresh orange, grapefruit, and a splash of soda over crushed ice'
		},
		{
			category: 'Drinks',
			image: 'slides/IMAGE (2).png',
			title: 'Iced Berry Lemonade',
			price: 12,
			description: 'House-made lemonade infused with crushed mixed berries, served over ice'
		},

		// Mojito
		{
			category: 'Mojito',
			image: 'slides/IMAGE (3).png',
			title: 'Classic Mint Mojito',
			price: 16,
			description:
				'White rum, fresh mint leaves, lime, and soda water, shaken and served over crushed ice'
		},
		{
			category: 'Mojito',
			image: 'slides/IMAGE (4).png',
			title: 'Strawberry Mojito',
			price: 17,
			description: 'A fruity twist on the classic, muddled with fresh strawberries and mint'
		},

		// Desserts
		{
			category: 'Desserts',
			image: 'slides/IMAGE (5).png',
			title: 'Molten Chocolate Lava Cake',
			price: 18,
			description:
				'Warm dark chocolate cake with a molten center, served with vanilla bean ice cream'
		},
		{
			category: 'Desserts',
			image: 'slides/IMAGE (6).png',
			title: 'Classic Tiramisu',
			price: 16,
			description:
				'Espresso-soaked ladyfingers layered with mascarpone cream and a dusting of cocoa'
		}
	];

	const categories: string[] = [
		'Breakfast',
		'Cold Starters',
		'Hot Starters',
		'Hot Dishes (Lunch)',
		'Hot Dishes (Dinner)',
		'Pizza Corner',
		'Fast Foods',
		'Indian Dishes',
		'Drinks',
		'Mojito',
		'Desserts'
	];

	let filteredItems = $derived(menuData.filter((item) => item.category === activeCategory));

	function playCardAnimation() {
		const cards = gridEl?.querySelectorAll('.menu-card');
		if (!cards || cards.length === 0) return;

		gsap.killTweensOf(cards);
		gsap.fromTo(
			cards,
			{ opacity: 0, y: 28, scale: 0.96 },
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.7,
				ease: 'power3.out',
				stagger: { each: 0.07, ease: 'power1.in' }
			}
		);
	}

	async function selectCategory(cat: string) {
		if (cat === activeCategory) return;

		const cards = gridEl?.querySelectorAll('.menu-card');
		if (cards && cards.length > 0) {
			gsap.killTweensOf(cards);
			await new Promise<void>((resolve) => {
				gsap.to(cards, {
					opacity: 0,
					y: 14,
					duration: 0.25,
					ease: 'power2.in',
					stagger: 0.03,
					onComplete: resolve
				});
			});
		}

		activeCategory = cat;
		await tick();
		playCardAnimation();
	}

	onMount(() => {
		let cleanup: (() => void) | undefined;

		import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
			gsap.registerPlugin(ScrollTrigger);

			playCardAnimation();

			const triggers = ScrollTrigger.batch('.menu-card', {
				start: 'top 90%',
				onEnter: (els: Element[]) => {
					gsap.fromTo(
						els,
						{ opacity: 0, y: 24 },
						{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.06 }
					);
				},
				once: true
			});

			cleanup = () => {
				triggers.forEach((t: ScrollTrigger) => t.kill());
			};
		});

		return () => cleanup?.();
	});
</script>

<div class="my-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 cursor-pointer">
	<!-- Section heading -->
	<div class="mb-8">
		<span class="text-[#C9A227] text-[13px] font-semibold uppercase tracking-[0.18em] font-lora">
			The Menu
		</span>
		<h1 class="text-[28px] sm:text-[34px] font-bold font-lora text-[#1A1614] mt-1">
			{activeCategory}
		</h1>
	</div>

	<!-- Category buttons -->
	<div class="flex flex-wrap gap-2.5 mb-10 pb-6 border-b border-black/10">
		{#each categories as cat (cat)}
			<button
				onclick={() => selectCategory(cat)}
				class="px-5 py-2.5 rounded-full capitalize text-[14px] sm:text-[15px] font-lora cursor-pointer transition-all duration-200 border whitespace-nowrap
					{activeCategory === cat
					? 'bg-[#C9A227] text-white border-[#C9A227] shadow-[0_4px_14px_-4px_rgba(201,162,39,0.55)]'
					: 'bg-transparent text-[#1A1614]/70 border-black/15 hover:border-[#C9A227] hover:text-[#C9A227]'}"
			>
				{cat}
			</button>
		{/each}
	</div>

	<!-- Menu cards -->
	{#if filteredItems.length > 0}
		<div bind:this={gridEl} class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
			{#each filteredItems as item (item.title)}
				<div
					class="menu-card group flex items-center gap-5 bg-[#FDFBF6] border border-black/10 rounded-[18px] p-4 h-[148px] transition-all duration-300 hover:border-[#C9A227]/50 hover:shadow-[0_10px_26px_-12px_rgba(26,22,20,0.18)]"
				>
					<div
						class="relative w-[112px] h-[112px] shrink-0 rounded-full overflow-hidden border-2 border-[#C9A227]/50"
					>
						<img
							src={item.image}
							alt={item.title}
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>
					</div>
					<div class="flex flex-col gap-1.5 min-w-0">
						<div class="flex items-center justify-between gap-2">
							<h2 class="font-bold font-lora text-[#1A1614] text-[16px] leading-snug truncate">
								{item.title}
							</h2>
							<span
								class="text-[#C9A227] font-bold font-lora text-[15px] whitespace-nowrap shrink-0"
							>
								${item.price}
							</span>
						</div>
						<p class="text-[13px] text-black/55 leading-relaxed line-clamp-3">
							{item.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center py-20 text-center">
			<p class="text-black/40 font-lora text-[15px]">No items found in this category.</p>
		</div>
	{/if}
</div>
