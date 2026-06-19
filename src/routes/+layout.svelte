<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	// eslint-disable-next-line svelte/valid-prop-names-in-kit-pages
	export const ssr = false;
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Header />
<main class="h-fit">
	{@render children()}
</main>
<Footer />
