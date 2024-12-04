<script lang="ts">
	import UserHistoryTable from '$lib/components/home/user.history.table.svelte';
	import { page } from '$app/stores';
	import Timeline from '$lib/components/chart/timeline.chart.svelte';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;

	const { userTasks, chartData } = data;

	const userId = $page.params.userId;

	let activeButton: string = 'taskHistory';
	function setActive(button: string) {
		activeButton = button;
	}
	const activevital = ['height', 'weight'];
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

<div class="usertasks">
	<h1 >User Tasks</h1>
	{#if userTasks?.Items?.length > 0}
		<div>
			<Timeline {chartData} />
		</div>
	{:else}
		<div>Data Not Available</div>
	{/if}
</div>
