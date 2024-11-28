<script lang="ts">
	import CareplanData from '$lib/components/careplan/careplan.data.svelte';
	import CareplanGraph from '$lib/components/careplan/careplan.graph.svelte';
	import type { any } from 'zod';
	import type { PageServerData } from './$types';
	import chalk from 'chalk';
	import { getDayWiseData, getWeekWiseData } from '$lib/utils.ts/functions';

	export let data: PageServerData;
	let tasks = data.userTasks.Items;
	// console.log(chalk.green('tasks'), tasks);

	let dayWiseData = getDayWiseData(tasks);
	let weekWiseData = getWeekWiseData(tasks);

	console.log(dayWiseData);
	console.log(weekWiseData);

	function separateData(data) {
		let labels = Object.keys(data);
		let scheduled = labels.map((label) => data[label].scheduled);
		let completed = labels.map((label) => data[label].completed);

		return { labels, scheduled, completed };
	}

	let dayWiseSeparatedData = separateData(dayWiseData);
	let weekWiseSeparatedData = separateData(weekWiseData);

</script>

<div class="flex flex-row w-full p-4 sm:mx-8">
	<div class="w-[50%] h-fit">
		<div class="">
			<CareplanData  labels={weekWiseSeparatedData.labels} data1={weekWiseSeparatedData.scheduled} data2={weekWiseSeparatedData.completed} />
		</div>
	</div>
	<div class="w-[50%] h-fit relative">
		<div class="py-10 px-3">
			<CareplanGraph labels={dayWiseSeparatedData.labels} data1={dayWiseSeparatedData.scheduled} data2={dayWiseSeparatedData.completed}  />
		</div>
	</div>
</div>
