<script>
	import Navbar from '$lib/components/home/Navbar.svelte';
	import Sidebar from '$lib/components/home/Sidebar.svelte';
</script>


<Navbar/>
<Sidebar/>
<div>
	<slot></slot>
</div>
