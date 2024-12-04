<script lang="ts">
	import { formatDateMonth } from '../../utils.ts/functions';

	export let data: any[] = [];
	export let title: string;

	let currentPage = 1;
	const pageSize = 8;
	let sortOrder = 'ascending';
	let sortedData = [...data];
	$: sortedData = [...data].sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);
		if (sortOrder === 'ascending') {
			return dateA.getTime() - dateB.getTime();
		} else {
			return dateB.getTime() - dateA.getTime();
		}
	});

	$: paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	function nextPage() {
		const totalPages = Math.ceil(sortedData.length / pageSize);
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	$: totalPages = Math.ceil(sortedData.length / pageSize);

	function sortByDate() {
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
	}
</script>

{#if data.length > 0}
	{#if title == 'Blood Pressure'}
		<div class="tabs">
			<div class="h-58">
				<table>
					<thead class="thead">
						<tr>
							<th class="th"></th>
							<th class="th" on:click={sortByDate} style="cursor: pointer;">
								Date {sortOrder === 'ascending' ? '▲' : '▼'}
							</th>
							<th class="th">Systolic ({data[0].unit})</th>
							<th class="th">Diastolic ({data[0].unit})</th>
						</tr>
					</thead>
					<tbody class="tbody">
						{#each paginatedData as item, index}
							<tr class="tabledata">
								<td class="td">{(currentPage - 1) * pageSize + index + 1}</td>
								<td class="td">{formatDateMonth(item.date)}</td>
								<td class="td">{item.value}</td>
								<td class="td">{item.value1}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{:else}
		<div class="tabs">
			<div class="h-58">
				<table>
					<thead class="thead">
						<tr>
							<th class="th"></th>
							<th class="th" on:click={sortByDate} style="cursor: pointer;">
								Date {sortOrder === 'ascending' ? '▲' : '▼'}
							</th>
							<th class="th">{title} ({data[0].unit})</th>
						</tr>
					</thead>
					<tbody class="bg-white">
						{#each paginatedData as item, index}
							<tr class="tabledata">
								<td class="td">{(currentPage - 1) * pageSize + index + 1}</td>
								<td class="td">{formatDateMonth(item.date)}</td>
								<td class="td">{item.value}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}

	<div class="pagination-controls">
		<button class="previous" on:click={prevPage} disabled={currentPage === 1}>Previous</button>
		<button class="next" on:click={nextPage} disabled={currentPage === totalPages}>Next</button>
	</div>
{:else}
	<div class="p-4 text-center">
		<p>No data available for {title}.</p>
	</div>
{/if}
