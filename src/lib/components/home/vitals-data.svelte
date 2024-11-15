<script lang="ts">
	import { formatDateMonth } from "./functions";

	export let data
	export let title
		
</script>

<table class="table1 h-96 p-10">
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
</table>
