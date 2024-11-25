<script lang="ts">
	import { formatDateMonth } from "../../utils.ts/functions";
  
	export let data: any[] = [];
	export let title: string;
  </script>
  
	{#if title == 'Blood Pressure'}
	  <div class="tabs">
		<div class="overflow-y-auto h-96">
		  <table>
			<thead class="thead">
			  <tr>
				<th class="p-2"></th>
				<th class="p-2">Date</th>
				<th class="p-2">Systolic ({data[0].unit})</th>
				<th class="p-2">Diastolic ({data[0].unit})</th>
			  </tr>
			</thead>
			<tbody class="tbody">
			  {#each data as item, index}
				<tr class="tabledata">
				  <td class="">{index + 1}</td>
				  <td class="p-2">{formatDateMonth(item.date)}</td>
				  <td class="p-2">{item.value}</td>
				  <td class="p-2">{item.value1}</td>
				</tr>
			  {/each}
			</tbody>
		  </table>
		</div>
	  </div>
	{:else}
	  <div class="tabs">
		<div class="overflow-y-auto h-96">
		  <table>
			<thead class="thead">
			  <tr>
				<th class=""></th>
				<th class="p-2">Date</th>
				<th class="p-2">{title} ({data[0].unit})</th>
			  </tr>
			</thead>
			<tbody class="bg-white">
			  {#each data as item, index}
				<tr class="tabledata">
				  <td class="">{index + 1}</td>
				  <td class="p-2">{formatDateMonth(item.date)}</td>
				  <td class="p-2">{item.value}</td>
				</tr>
			  {/each}
			</tbody>
		  </table>
		</div>
	  </div>
	{/if}

  