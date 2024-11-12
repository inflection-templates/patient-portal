<script lang="ts">
	import Icon from '@iconify/svelte';

	const sidebarItems = [
		{ label: 'Home', icon: 'mdi:home', href: '/home' },
		{ label: 'Careplan', icon: 'mdi:clipboard-text', href: '/careplan' },
		{ label: 'Notifications', icon: 'mdi:bell', href: '/notifications' }
	];
</script>

<div class="flex">
	<!-- Sidebar -->
	<div class="sidebar">
		<ul class="sidebar-list">
			{#each sidebarItems as item}
				<li>
					<a href={item.href} class="sidebar-item">
						<Icon icon={item.icon} class="iconsize" />
						<span class="sidebar-text">{item.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
