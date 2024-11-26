<script lang="ts">
	import CareplanData from '$lib/components/careplan/careplan.data.svelte';
	import CareplanGraph from '$lib/components/careplan/careplan.graph.svelte';
	import type { any } from 'zod';
	import type { PageServerData } from './$types';
    import chalk from "chalk"

    export let data: PageServerData;
    let tasks = data.userTasks.Items;
    // console.log(chalk.redBright('Tasks'), tasks);

// Initialize objects to store scheduled and completed tasks
let scheduledTasks :any = {};
let completedTasks :any = {};

// Loop through tasks and count scheduled and completed tasks for each day
tasks.forEach(task => {
  let date = new Date(task.ScheduledStartTime).toLocaleDateString(); // Extract date from ScheduledStartTime

  // Count scheduled tasks
  if (scheduledTasks[date]) {
    scheduledTasks[date]++;
  } else {
    scheduledTasks[date] = 1;
  }

  // Count completed tasks
  if (task.Status === 'Completed') {
    if (completedTasks[date]) {
      completedTasks[date]++;
    } else {
      completedTasks[date] = 1;
    }
  }
});

console.log('Scheduled Tasks:', scheduledTasks);
console.log('Completed Tasks:', completedTasks);
</script>

<div class="flex flex-row w-full p-4 sm:mx-8">
	<div class="w-[50%] h-fit">
		<div class="">
			<CareplanData {tasks}/>
		</div>
	</div>
	<div class="w-[50%] h-fit relative">
    <div class="py-10 px-3">
      <CareplanGraph {scheduledTasks} {completedTasks}/>
    </div></div>
</div>
