<script>
	import Navbar from '$lib/components/home/Navbar.svelte';
	import Sidebar from '$lib/components/home/Sidebar.svelte';
</script>

<Navbar />

<div class="flex">
	<Sidebar />
	<div class="flex-1 p-4">
		<slot />
	</div>
</div>