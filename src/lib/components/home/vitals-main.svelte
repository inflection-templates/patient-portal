<script lang="ts">
	import VitalsGraph from './vitals-graph.svelte';
	import VitalsData from './vitals-data.svelte';
	import JoinLineChart from './JoinLineChart.svelte';
	// export let data;

	export let title;

	export let data;
</script>

<div class="flex flex-col justify-center mx-10 py-2">
	<div class="grid grid-cols-1 justify-center rounded-lg gap-8 my-2">
		<div
			class="flex flex-col justify-center items-center h-full gap-10 w-full p-4 rounded-lg shadow-xl border"
		>
			<div
				class="flex overflow-x-auto h-[100%] p-2 justify-center items-center rounded-lg sm:px-4 w-full"
			>
				<div class="w-full">
					<div class="flex items-center flex-col">
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
			</div>

			<div class="flex h-[100%] justify-center items-center rounded-lg sm:px-4 w-full">
				<div class="w-full">
					<div class="flex items-center flex-col p-8">
						<VitalsData {data} {title} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
