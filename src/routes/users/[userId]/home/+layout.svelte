<script>
	import Navbar from '$lib/components/home/navbar.svelte';
	import Sidebar from '$lib/components/home/sidebar.svelte';
	import { page } from '$app/stores';

	//////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;

</script>

<Navbar />

<div  class="flex">
	<Sidebar userId={userId} />
	<div class="flex-1 p-4">
		<slot />
	</div>
</div>
