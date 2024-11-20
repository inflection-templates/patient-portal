<script lang="ts">
	import { formatDateMonth } from "../../utils.ts/functions";

	export let data
	export let title
		
</script>

<!-- <table class="table1 h-96 p-10">
	<thead>
		<tr class="tr1">
			<th class="th1 p-2">Date</th>
			<th class="th1 p-2">{title}({data[0].unit})</th>
		</tr>
	</thead>
	<tbody>
		{#each data as height}
			<tr class="tr1">
				<td class="td1">{height.date}</td>
				<td class="td1">{height.value}</td>
			</tr>
		{/each}
	</tbody>
</table> -->
{#if title == 'Blood Pressure'}
	<div class="w-full overflow-hidden border rounded-lg shadow-md">
		<div class="overflow-y-auto h-96">
		<table class="table1">
			<thead class="sticky top-0">
			<tr class="tr1">
				<th class="th1 p-2">Date</th>
				<th class="th1 p-2">Systolic ({data[0].unit})</th>
				<th class="th1 p-2">Diastolic  ({data[0].unit})</th>
			</tr>
			</thead>
			<tbody class="bg-white">
			{#each data as item}
				<tr class="tr1 hover:bg-blue-50">
				<td class="td1 p-2">{formatDateMonth(item.date)}</td>
				<td class="td1 p-2">{item.value}</td>
				<td class="td1 p-2">{item.value1}</td>
				</tr>
			{/each}
			</tbody>
		</table>
		</div>
	</div>
  {:else}
	<div class="w-full overflow-hidden border rounded-lg shadow-md">
		<div class="overflow-y-auto h-96">
		<table class="table1">
			<thead class="sticky top-0 bg-blue-200">
			<tr class="tr1">
				<th class="th1 p-2">Date</th>
				<th class="th1 p-2">{title} ({data[0].unit})</th>
			</tr>
			</thead>
			<tbody class="bg-white">
			{#each data as item}
				<tr class="tr1 hover:bg-blue-50">
				<td class="td1 p-2">{formatDateMonth(item.date)}</td>
				<td class="td1 p-2">{item.value}</td>
				</tr>
			{/each}
			</tbody>
		</table>
		</div>
	</div>
{/if}