<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import ConfirmModal from '../modal/confirm.modal.svelte';

	///////////////////////////////////////////////////////////////////////////////

	export let logout;
	export let userId: string | undefined;
	export let deleteAccount: () => void;
	export let userName: string | undefined;
	export let imageUrl: string | undefined;
	let showConfirmDelete_ = false;
	$: showModal = showConfirmDelete_;

	const deleteMessage_ =
		'Are you sure you want to delete your account? ' +
		'This action is irreversible, and all associated data will be permanently removed.';

	$: deleteMessage = deleteMessage_;

	let showUserMenu = false;

	let showThemeMenu = false;
	const user = 'Mayur Bankar';
	const themeModes = ['Light', 'Dark'];
	const themeOptions = ['Blue', 'Mint', 'Yellow', 'Teal', 'Bronze'];
	let selectedMode = 'Light';
	let selectedOption = '';

	const userMenus = [
		{
			name: 'User Profile',
			icon: 'material-symbols:person-outline',
			href: `/users/${userId}/my-profile`,
			type: 'button'
		},
		{
			name: 'Sign Out',
			icon: 'material-symbols:lock-outline',
			href: `/home`,
			type: 'button'
		},
		{ name: 'Themes', icon: '', href: ``, type: 'button' },
		{ name: 'Help', icon: '', href: '/help', type: 'button' }
		// { name: 'Delete Account', icon: '', href: '', type: 'button' }
	];

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
						{user}
					</div>
					<hr class="user-menu-divider" />

					{#each userMenus as item}
						{#if item.type === 'button'}
							<button class="user-menu-item">
								<span>{item.name}</span>
							</button>
						{:else if item.name === 'Themes'}
							<button class="user-menu-item" on:click={() => (showThemeMenu = !showThemeMenu)}>
								<span>{item.name}</span>
							</button>
						{:else if item.type === 'button'}
							<button class="user-menu-item" on:click={deleteAccount}>
								<span>{item.name}</span>
							</button>
						{:else}
							<a href={item.href} class="user-menu-item">
								<span>{item.name}</span>
							</a>
						{/if}
					{/each}
					<button class="user-menu-item" on:click={openModal}> Delete Account </button>
				</div>
			{/if}

			{#if showThemeMenu}
				<div class="theme-menu">
					<button class="themes-close-button" on:click={closeThemeMenu}>
						<Icon icon="ant-design:close-outlined" class="text-xl" />
					</button>
					<div class="theme-modes">
						{#each themeModes as theme}
							<button class="theme-option" on:click={() => handleModeChange(theme)}>
								{theme}
							</button>
						{/each}
					</div>

					<hr class=" theme-divider" />

					<div class="theme-options">
						{#each themeOptions as option}
							<button class="theme-option" on:click={() => handleOptionChange(option)}>
								{option}
							</button>
						{/each}
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
