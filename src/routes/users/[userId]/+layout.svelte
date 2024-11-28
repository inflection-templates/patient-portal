<script>
	import Navbar from '$lib/components/home/Navbar.svelte';
	import Sidebar from '$lib/components/home/Sidebar.svelte';
	import { page } from '$app/stores';

	//////////////////////////////////////////////////////////////////////

	export let data;
	const userId = $page.params.userId;
	const username = data.sessionUser.fullName;
	const imageUrl = data.sessionUser.profileImageUrl;

	const onLogout = async () => {
		const response = await fetch(`/api/server/logout`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' }
		});
		const resp = await response.text();
		console.log(`resp: ${JSON.stringify(resp, null, 2)}`);
		window.location.href = '/';
	};

	const onDelete = async () => {
		console.log('onDelete');
		const response = await fetch(`/api/server/user/delete`, {
			method: 'DELETE',
			headers: { 'content-type': 'application/json' }
		});
		const resp = await response.text();
		console.log(`resp: ${JSON.stringify(resp, null, 2)}`);
		window.location.href = '/';
	};
	
</script>

<Navbar {userId} logout={onLogout} userName={username} {imageUrl} deleteAccount={onDelete} />

<div class="flex min-h-screen">
	<Sidebar {userId} />
	<div class="flex-1 p-4">
		<slot />
	</div>
</div>
