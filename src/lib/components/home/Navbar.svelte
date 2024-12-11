<script lang="ts">
	import Icon from '@iconify/svelte';
	import ConfirmModal from '../modal/confirm.modal.svelte';
	export let logout;
	export let userId: string | undefined;
	export let deleteAccount: () => void;
	export let imageUrl: string | undefined;
	let showConfirmDelete_ = false;
	$: showModal = showConfirmDelete_;

	const deleteMessage_ =
		'Are you sure you want to delete your account? ' +
		'This action is irreversible, and all associated data will be permanently removed.';

	$: deleteMessage = deleteMessage_;

	let showUserMenu = false;
	let showThemeMenu = false;
	const userName = 'Mayur Bankar';
	const themeModes = ['Light', 'Dark'];
	const themeOptions = [
		{ name: 'Blue', color: '#0096ff' },
		{ name: 'Mint', color: '#4ec55a' },
		{ name: 'Yellow', color: '#ffc000' },
		{ name: 'Teal', color: '#329999' },
		{ name: 'Bronze', color: '#CD7F32' }
	];
	let selectedMode = 'Light';
	let selectedOption = '';

	const userMenuItems = [
		{ label: 'User Profile', href: '/user-profile' },
		{ label: 'Themes' },
		{ label: 'Help', href: '/help' },
		{ label: 'Sign Out', href: '/signout' }
	];

	const handleModeChange = (theme: string) => {
		selectedMode = theme;
		document.documentElement.setAttribute('data-theme', theme.toLowerCase());
		applyThemeOption();
	};

	const handleOptionChange = (option: string) => {
		selectedOption = option;
		applyThemeOption();
	};

	const applyThemeOption = () => {
		const theme = selectedMode.toLowerCase();
		const option = selectedOption.toLowerCase();

		document.documentElement.setAttribute('data-theme-option', option);
	};
	function openModal() {
		showModal = true;
	}

	function handleDeleteConfirm() {
		if (deleteAccount) {
			deleteAccount();
		}
		showModal = false;
	}

	function handleDeleteCancel() {
		showModal = false;
	}

	const closeThemeMenu = () => {
		showThemeMenu = false;
	};
</script>

<header class="navbar">
	<div class="flex items-center justify-between sm:px-4 h-14 w-full">
		<div class="flex items-center">
			<img src="/patient.png" alt="Logo" class="logo" />
			<h1 class="heading">Patient Portal</h1>
		</div>

		<div class="relative ml-auto flex items-center">
			<button
				class="user-profile-btn"
				on:click={() => {
					showUserMenu = !showUserMenu;
					if (showUserMenu) showThemeMenu = false;
				}}
			>
				<Icon icon="ant-design:user-outlined" class="iconsize" />
			</button>

			{#if showUserMenu}
				<div class="user-menu">
					<div class="user-name">
						{userName}
					</div>
					<hr class="user-menu-divider" />

					{#each userMenuItems as item}
						{#if item.label === 'Themes'}
							<button class="user-menu-item" on:click={() => (showThemeMenu = !showThemeMenu)}>
								<span>{item.label}</span>
							</button>
						{:else if item.label === 'button'}
							<button class="user-menu-item" on:click={openModal}>
								<span>{item.label}</span>
							</button>
						{:else}
							<a href={item.href} class="user-menu-item">
								<span>{item.label}</span>
							</a>
						{/if}
					{/each}
					<button class="user-menu-item" on:click={openModal}> Delete Account </button>
				</div>
			{/if}

			{#if showThemeMenu}
				<div class="theme-menu">
					<button class="themes-close-button" on:click={closeThemeMenu}>
						<Icon icon="ant-design:close-outlined" class="h-5 w-5" />
					</button>

					<div>
						<p class="para">Appearance</p>
						<div class="flex items-center space-x-4">
							{#each themeModes as theme}
								<button
									class="theme-modes"
									class:selected={selectedMode === theme}
									on:click={() => handleModeChange(theme)}
								>
									{theme}
								</button>
							{/each}
						</div>
					</div>

					<hr class="theme-divider" />

					<div>
						<p class="para">Themes</p>
						<div class="grid grid-cols-3 gap-2 sm:gap-4">
							{#each themeOptions as { name, color }}
								<button
									class="theme-option"
									class:selected={selectedOption === name}
									style="background-color: {color}"
									on:click={() => handleOptionChange(name)}
								>
									{name}
								</button>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<ConfirmModal
		show={showModal}
		title="Delete Account"
		message={deleteMessage}
		close={handleDeleteCancel}
		confirm={handleDeleteConfirm}
	/>
</header>
