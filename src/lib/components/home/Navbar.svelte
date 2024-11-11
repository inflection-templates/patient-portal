<script lang="ts">
	let showUserMenu = false;
	const userName = 'John Doe'; // Example user name

	const userMenuItems = [
		{ label: 'Settings', href: '/settings' },
		{ label: 'Profile', href: '/profile' },
		{ label: 'Sign Out', href: '/signout' }
	];
</script>

<header class="navbar">
	<div class="flex items-center justify-between px-4 h-14 w-full">
		<!-- Logo and Heading (Left Side) -->
		<div class="flex items-center">
			<img src="patient.png" alt="Logo" class="logo" />
			<h1 class="heading">Patient Portal</h1>
		</div>

		<!-- User Profile (Right Side) -->
		<div class="relative ml-auto"> <!-- Added ml-auto to push this to the right -->
			<button
				class="user-profile-btn"
				on:click={() => (showUserMenu = !showUserMenu)}
			>
				<span class="user-profile-btn-text">U</span>
			</button>

			{#if showUserMenu}
				<div class="user-menu">
					<!-- User Name -->
					<div class="user-name">
						{userName}
					</div>
					<hr class="user-menu-divider" />

					{#each userMenuItems as item}
						<a
							href={item.href}
							class="user-menu-item"
						>
							<span>{item.label}</span>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</header>
