<script lang="ts">
	import { formatDateMonth } from '../../utils.ts/functions';
	export let data: any[] = [];
</script>

{#if data.length > 0}
	<div class="tabs">
		<div class="overflow-y-auto h-96">
			<table>
				<thead class="thead">
					<tr>
						<th class="p-2"></th>
						<th class="p-2">Date</th>
						<th class="p-2">Category</th>
						<th class="p-2">Count</th>
					</tr>
				</thead>
				<tbody class="tbody">
					{#each data as task, index}
						<tr class="tabledata">
							<td class="p-2">{index + 1}</td>
							<td class="p-2">{formatDateMonth(task.date)}</td>
							<td class="p-2">{task.category}</td>
							<td class="p-2">{task.count}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}
