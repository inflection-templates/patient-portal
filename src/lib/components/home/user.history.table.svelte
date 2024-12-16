<script lang="ts">
	import Icon from '@iconify/svelte';
    import { formatDateMonth } from '../../utils.ts/functions';
    export let data: any[] = [];
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
    $: totalPages = Math.ceil(sortedData.length / pageSize);

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
        }
    }

    function sortByDate() {
        sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
    }

    function updatePageSize(event: Event) {
        const value = parseInt((event.target as HTMLSelectElement).value, 10);
        pageSize = value;
        currentPage = 1;
    }
</script>

{#if data.length > 0}
    <div class="table-container">
        <div class="table-wrapper">
            <table class="w-full border-collapse">
                <thead class="thead">
                    <tr>
                        <th class="th" style="width: 10%;"></th>
                        <th class="th" on:click={sortByDate} style="cursor: pointer; width: 20%;">
                            Date <span class="sort-icon">{sortOrder === 'ascending' ? '▲' : '▼'}</span>
                        </th>
                        <th class="th" style="width: 20%;">Category</th>
                        <th class="th" style="width: 20%;">Count</th>
                    </tr>
                </thead>
                <tbody class="tbody">
                    {#each paginatedData as task, index}
                        <tr class="tabledata">
                            <td class="td" style="width: 10%;">{(currentPage - 1) * pageSize + index + 1}</td>
                            <td class="td" style="width: 20%;">{formatDateMonth(task.date)}</td>
                            <td class="td" style="width: 20%;">{task.category}</td>
                            <td class="td" style="width: 20%;">{task.count}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            
        </div>

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
					<Icon icon="mdi:less-than" width="20" height="20" />
				</button>
				<span class="current-page">{currentPage}</span>
				<button class="pagination-button" on:click={nextPage} disabled={currentPage === totalPages}>
					<Icon icon="mdi:greater-than" width="20" height="20" />
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
{/if}