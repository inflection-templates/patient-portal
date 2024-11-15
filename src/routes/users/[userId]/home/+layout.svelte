<script>
	import Navbar from '$lib/components/home/Navbar.svelte';
	import Sidebar from '$lib/components/home/Sidebar.svelte';
</script>

<!-- <Navbar />
<Sidebar />
<slot /> -->

<Navbar />
<div class="flex flex-row">
	<div><Sidebar /></div>
	<div class="w-full"><slot/></div>
</div>