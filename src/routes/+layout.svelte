<script>
	import Footer from './Footer.svelte';
	import Navbar from './Navbar.svelte';
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen">
	<header><Navbar /></header>
	<main class="flex-grow mt-24">
		<slot />
	</main>
	<footer><Footer /></footer>
</div>
