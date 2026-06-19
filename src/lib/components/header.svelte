<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowRight } from '@lucide/svelte';
</script>

<div>
	<div class="text-center text-sm text-black py-2 bg-gold w-full">
		Welcome to Carro Edeg a Best Quality Restaurant
	</div>
	<header class="md:px-6 px-2 flex flex-col border-b border-gold/40 bg-black">
		<div>
			<div class="flex justify-between items-center py-4 md:px-4 control">
				<div>
					<a href={resolve('/')}>
						<img
							src="/Carro-Edeg-Hotel-logo.webp"
							alt="brand-logo"
							class="w-[100px] md:w-[110px]"
						/>
					</a>
				</div>
				<a
					href="#book-table"
					class="flex gap-1 bg-gold hover:bg-gold/90 py-2 cursor-pointer px-6 rounded capitalize font-lora font-bold text-[16px] tracking-widest items-center"
					>book table <ArrowRight strokeWidth={3} size={18} />
				</a>
			</div>
		</div>
	</header>
</div>
