<script lang="ts">
	import Icon from '@iconify/svelte';

	let showUserMenu = false;
	const userName = 'Mayur Bankar';

	const userMenuItems = [
		{ label: 'User Profile', href: '/user-profile' },
		{ label: 'Help', href: '/help' },
		{ label: 'Sign Out', href: '/signout' },
		{ label: 'Delete Account', href: '/delete-account' }
	];
</script>

<header class="navbar">
	<div class="flex items-center justify-between px-4 h-14 w-full">
		<div class="flex items-center">
			<img src="/patient.png" alt="Logo" class="logo" />
			<h1 class="heading">Patient Portal</h1>
		</div>

		<div class="relative ml-auto">
			<button class="user-profile-btn" on:click={() => (showUserMenu = !showUserMenu)}>
				<Icon icon="ant-design:user-outlined"  class="iconsize" />
			</button>

			{#if showUserMenu}
				<div class="user-menu">
					<div class="user-name">
						{userName}
					</div>
					<hr class="user-menu-divider" />

					{#each userMenuItems as item}
						<a href={item.href} class="user-menu-item">
							<span>{item.label}</span>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</header>
