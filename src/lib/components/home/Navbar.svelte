<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	///////////////////////////////////////////////////////////////////////////////

	export let logout;
	export let userId : string | undefined;
	export let deleteAccount;
	export let userName : string | undefined;
	export let imageUrl : string | undefined;	

	let showUserMenu = false;

	// const userMenuItems = [
	// 	{ label: 'User Profile', href: '/user-profile' },
	// 	{ label: 'Help', href: '/help' },
	// 	{ label: 'Sign Out',type: 'button', href: '/signout' },
	// 	{ label: 'Delete Account', type: 'button', class: 'delete-account' }
	// ];


	async function myProfile() {

		await goto(`/users/${userId}/my-profile`);
	}

	let userMenuItems = [
		{ 
		name   : 'User Profile', 
		icon   : 'material-symbols:person-outline' ,
		href   : `/users/${userId}/my-profile`
		},
		{ 
		name	 : 'Sign Out', 
		action : logout, 
		icon	 : 'material-symbols:lock-outline',
		type    : 'button' 
		},
		{ 
		name   : 'Delete Account', 
		action : deleteAccount, 
		icon   : 'material-symbols:logout' ,
		type    : 'button'
		}
  ];

</script>

<header class="navbar">
	<div class="flex items-center justify-between sm:px-4 h-14 w-full">
		<div class="flex items-center">
			<img src="/patient.png" alt="Logo" class="logo" />
			<h1 class="heading">Patient Portal</h1>
		</div>

		<div class="relative ml-auto">
			<button class="user-profile-btn" on:click={() => (showUserMenu = !showUserMenu)}>
				<Icon icon="ant-design:user-outlined" class="iconsize" />
			</button>

			{#if showUserMenu}
				<div class="user-menu">
					<div class="user-name">
						{userName}
					</div>
					<hr class="user-menu-divider" />

					{#each userMenuItems as item}
						{#if item.type === 'button'}
							<button class="user-menu-item" on:click={item.action}>
								<span>{item.name}</span>
							</button>
						{:else}
							<a href={item.href} class="user-menu-item">
								<span>{item.name}</span>
							</a>
						{/if}
					{/each}
				</div>
			{/if}
		</div>
	</div>
</header>
