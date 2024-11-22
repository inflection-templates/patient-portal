<script lang="ts">
	import VitalsGraph from './vitals.graph.svelte';
	import VitalsData from './vitals.data.svelte';
	import JoinLineChart from './JoinLineChart.svelte';
	// export let data;

	export let title;

	export let data;
</script>

<div class="mx-2 sm:mx-8">
	<div class=" my-4">
		<div class=" border">
			{#if title == 'Height'}
				<VitalsGraph {data} {title} />
			{:else if title == 'Weight'}
				<VitalsGraph {data} {title} />
			{:else if title == 'Blood Pressure'}
				<VitalsGraph {data} {title} />
			{:else if title == 'Glucose'}
				<VitalsGraph {data} {title} />
			{:else if title == 'Oxygen Saturation'}
				<VitalsGraph {data} {title} />
			{:else if title == 'Temperature'}
				<VitalsGraph {data} {title} />
			{:else if title == 'Pulse'}
				<VitalsGraph {data} {title} />
			{/if}
		</div>
	</div>
	<VitalsData {data} {title} />
</div>