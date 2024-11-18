<script lang="ts">
	import BarChart from './BarChart.svelte';
	import LineChart from './LineChart.svelte';
	import JoinLineChart from './JoinLineChart.svelte';
	export let data;
	export let title;

	let date: any[] = [];
	let value: any[] = [];
	let value1: any[] = [];

	$: if (data && Array.isArray(data)) {
		date = data.map((item) => item.date);
		value = data.map((item) => item.value);
		value1 = data.map((item) => item.value1);
	}

</script>

{#if date.length > 0}
	<div class="h-96 w-full">
		
			{#if title == "Height"}
			<LineChart data={value} labels={date} title={title} />
			{:else if title == "Weight"}
			<BarChart dataSource={value} labels={date} title={title} />
			{:else if title == "Blood Pressure"}
			<JoinLineChart data1={value} data2={value1} labels={date} title={title} />
			{:else if title == "Glucose"}
			<LineChart data={value} labels={date} title={title} />
			{:else if title == "Oxygen Saturation"}
			<LineChart data={value} labels={date} title={title} />
			{:else if title == "Temperature"}
			<LineChart data={value} labels={date} title={title} />
			{:else if title == "Pulse"}
			<LineChart data={value} labels={date} title={title} />
			{/if}
	</div>
{:else}
	<div class="">
		<p class="justify-left items-center flex text-2xl">
			<!-- Access Frequency -->
		</p>
		<p class="justify-center items-center flex text-xl ">Data Not Available</p>
	</div>
{/if}
