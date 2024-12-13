<script lang="ts">
	import { formatDateMonth } from '../../utils.ts/functions';

	export let data: any[] = [];
	export let title: string;

	let currentPage = 1;
	let pageSize = 8;
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

	function updatePageSize(event: Event) {
		const value = parseInt((event.target as HTMLSelectElement).value, 10);
		pageSize = value;
		currentPage = 1; // Reset to first page
	}
</script>

{#if data.length > 0}
	<div class="table-container">
		<div class="table-wrapper">
			<table class="w-full border-collapse text-sm">
				<thead class="thead">
					<tr>
						<th class="th"></th>
						<th class="th" on:click={sortByDate} style="cursor: pointer;">
							Date <span class="sort-icon">{sortOrder === 'ascending' ? '▲' : '▼'}</span>
						</th>
						{#if title == 'Blood Pressure'}
							<th class="th">Systolic ({data[0].unit})</th>
							<th class="th">Diastolic ({data[0].unit})</th>
						{:else}
							<th class="th">{title} ({data[0].unit})</th>
						{/if}
					</tr>
				</thead>
				<tbody class="tbody">
					{#each paginatedData as item, index}
						<tr class="tabledata">
							<td class="td">{(currentPage - 1) * pageSize + index + 1}</td>
							<td class="td">{formatDateMonth(item.date)}</td>
							{#if title == 'Blood Pressure'}
								<td class="td">{item.value}</td>
								<td class="td">{item.value1}</td>
							{:else}
								<td class="td">{item.value}</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Page Selector and Pagination Controls -->
		<div class="table-footer">
			<div class="page-size-container">
				<select class="page-size-selector" on:change={updatePageSize}>
					<option class="pages" value="5">5 Records per page</option>
					<option class="pages" value="10">10 Records per page</option>
					<option class="pages" value="15">15 Records per page</option>
				</select>
			</div>

			<div class="pagination-controls">
				<button
					class="pagination-button"
					on:click={() => (currentPage = 1)}
					disabled={currentPage === 1}
				>
					First
				</button>
				<button class="pagination-button" on:click={prevPage} disabled={currentPage === 1}>
					&larr;
				</button>
				<span class="current-page">{currentPage}</span>
				<button class="pagination-button" on:click={nextPage} disabled={currentPage === totalPages}>
					&rarr;
				</button>
				<button
					class="pagination-button"
					on:click={() => (currentPage = totalPages)}
					disabled={currentPage === totalPages}
				>
					Last
				</button>
			</div>
		</div>
	</div>
{:else}
	<p class="  not-available">No data available for {title}.</p>
{/if}
