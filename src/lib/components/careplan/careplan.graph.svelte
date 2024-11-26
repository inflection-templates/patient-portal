<script lang="ts">
	export let scheduledTasks;
	export let completedTasks;
	import JointBarGraph from '$lib/components/vitals.graphs/Joint.Bar.Graph.svelte';

	console.log('scheduledTasks', scheduledTasks);
	// const labels = Object.keys(scheduledTasks).sort((a, b) => new Date(a) - new Date(b));

	// Step 2: Create values arrays for both scheduled and completed tasks
	// const firstDataSource = labels.map((date) => scheduledTasks[date]);
	// const secondDataSource = labels.map((date) => completedTasks[date] || 0);
	const firstDataSource = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
	const secondDataSource = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
	const labels = [ '20/11/2024','21/11/2024','22/11/2024', '23/11/2024', '24/11/2024', '25/11/2024','26/11/2024','27/11/2024','28/11/2024','29/11/2024','30/11/2024','1/12/2024','2/12/2024', '3/12/2024', '4/12/2024', '5/12/2024','6/12/2024','7/12/2024','8/12/2024','9/12/2024' ]

	// Output the results
	console.log('Common Dates:', labels);
	console.log('Scheduled Values:', firstDataSource);
	console.log('Completed Values:', secondDataSource);
</script>

<div class="">
	<JointBarGraph title={"I am boy"} {labels} {firstDataSource} {secondDataSource} />
</div>
<!-- <JointBarGraph  {scheduledTasks} {completedTasks} /> -->
