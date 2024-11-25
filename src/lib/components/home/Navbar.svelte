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
	let userMenuItems = [
		{
			name: 'User Profile',
			icon: 'material-symbols:person-outline',
			href: `/users/${userId}/my-profile`
		},
		{
			name: 'Sign Out',
			action: logout,
			icon: 'material-symbols:lock-outline',
			type: 'button'
		}
		// {
		// name   : 'Delete Account',
		// action : deleteAccount,
		// icon   : 'material-symbols:logout' ,
		// type    : 'button'
		// }
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
					<button class="user-menu-item" on:click={openModal}> Delete Account </button>
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
