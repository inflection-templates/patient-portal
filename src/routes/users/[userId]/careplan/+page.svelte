<script lang="ts">
	import CareplanData from '$lib/components/careplan/careplan.data.svelte';
	import CareplanGraph from '$lib/components/careplan/careplan.graph.svelte';
	import type { PageServerData } from './$types';

	////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let dayWiseSeparatedData = data.dayWiseSeparatedData;
	let weekWiseSeparatedData = data.weekWiseSeparatedData;
	let careplanTasks = data.careplanTasks;
	let selectedView = 'day';
	let careplanData = careplanTasks[0];
	console.log('careplanData',careplanData);
	let careplanCode = careplanData?.Action?.PlanCode ?? '';
	let careplanName = careplanData?.Action?.PlanName ?? '';

	function getTaskCounts(tasks) {
		const taskCounts = {
			total: 0,
			completed: 0,
			pending: 0,
			delayed: 0,
		};

		tasks.forEach((task) => {
			taskCounts.total++;

			switch (task.Status) {
				case "Completed":
					taskCounts.completed++;
					break;
				case "Pending":
					taskCounts.pending++;
					break;
				case "Delayed":
					taskCounts.delayed++;
					break;
			}
		});

		return taskCounts;
	}
	const taskStatusCounts = getTaskCounts(careplanTasks);
	let taskStatusArray = Object.entries(taskStatusCounts).map(([key, value]) => {
        const titles = {
            total: "Total Tasks",
            completed: "Completed Tasks",
            pending: "Pending Tasks",
            delayed: "Delayed Tasks"
        };

        return { title: titles[key] || key, value };
    });

</script>

<!-- <div class="flex flex-row w-full p-4 sm:mx-8">
	<div class="w-[50%] h-fit">
		<div class="">
			<CareplanData labels={weekWiseSeparatedData.labels} data1={weekWiseSeparatedData.scheduled} data2={weekWiseSeparatedData.completed} />
		</div>
	</div>
	<div class="w-[50%] h-fit relative">
		<div class="py-10 px-3">
			<CareplanGraph labels={dayWiseSeparatedData.labels} data1={dayWiseSeparatedData.scheduled} data2={dayWiseSeparatedData.completed}  />
		</div>
	</div>
</div> -->

<div class="flex flex-row w-full p-4 sm:mx-8">
	<!-- <div class="w-[50%] h-fit">
		{#if selectedView === 'week'}
			<CareplanData 
				labels={weekWiseSeparatedData.labels} 
				data1={weekWiseSeparatedData.scheduled} 
				data2={weekWiseSeparatedData.completed} 
			/>
		{:else}
			<CareplanData 
				labels={dayWiseSeparatedData.labels} 
				data1={dayWiseSeparatedData.scheduled} 
				data2={dayWiseSeparatedData.completed} 
			/>
		{/if}
	</div> -->


	
<div class="flex-col items-center mt-2 ">
	<div class="flex mx-2 gap-6">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="lable-text font-semibold">Careplan</label>
		<span class="">{careplanName}</span>
	</div>
	<div class="flex mx-2 gap-14">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="lable-text font-semibold">Code </label>
		<span class="">{careplanCode}</span>
	</div>
    {#each taskStatusArray as taskStatus}
        <div class="flex mx-2 gap-14">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="label-text font-semibold">{taskStatus.title}</label>
            <span>{taskStatus.value}</span>
        </div>
    {/each}
	<div class="flex mx-2 gap-6">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="lable-text font-semibold">Start Date</label>
		<span class="">{data.startDate}</span>
	</div>
	<div class="flex mx-2 gap-14">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="lable-text font-semibold">End Date</label>
		<span class="">{data.endDate}</span>
	</div>


</div>
	<div class="flex flex-row items-center  space-x-4 mb-4">
		<label for="view-selector" class="text-lg">Select View:</label>
		<select 
			id="view-selector" 
			class="px-4 py-2 border rounded"
			bind:value={selectedView}>
			<option value="day">Day Wise</option>
			<option value="week">Week Wise</option>
		</select>
	</div>

	<div class="w-[50%] h-fit relative">
		{#if selectedView === 'week'}
			<CareplanGraph 
				labels={weekWiseSeparatedData.labels} 
				data1={weekWiseSeparatedData.scheduled} 
				data2={weekWiseSeparatedData.completed} 
			/>
		{:else}
			<CareplanGraph 
				labels={dayWiseSeparatedData.labels} 
				data1={dayWiseSeparatedData.scheduled} 
				data2={dayWiseSeparatedData.completed} 
			/>
		{/if}
	</div>

</div>
