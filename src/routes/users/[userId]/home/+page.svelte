<script lang="ts">
	import UserHistoryTable from '$lib/components/home/user.history.table.svelte';
	import { page } from '$app/stores';
	import Timeline from '$lib/components/chart/timeline.chart.svelte';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////////
	export let data: PageServerData;
	const { userTasks, chartData, tableData } = data;
	const userId = $page.params.userId;

	let activeButton: string = 'taskHistory';
	function setActive(button: string) {
		activeButton = button;
	}
</script>

<div class="tasks">
	<button
		class={`history ${activeButton === 'taskHistory' ? 'active' : ''}`}
		on:click={() => setActive('taskHistory')}
	>
		Task History
	</button>

	<a
		class={`history ${activeButton === 'vitalsHistory' ? 'active' : ''}`}
		href={`/users/${userId}/home/vitals.history`}
		on:click={() => setActive('vitalsHistory')}
	>
		Vitals History
	</a>
</div>

<div class="mx-2 sm:mx-8">
	<div class=" mb-5">
		<div>
			{#if userTasks?.Items?.length > 0}
				<Timeline {chartData} />
			{:else}
				<p class="text-center p-4">No Data Available</p>
			{/if}
		</div>
	</div>
	<UserHistoryTable data={tableData} />
</div>
