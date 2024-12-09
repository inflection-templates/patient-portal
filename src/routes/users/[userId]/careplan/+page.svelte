<script lang="ts">
    import CareplanStackedChart from '$lib/components/careplan/CareplanStackedChart.svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;
    let careplanTasks = data.careplanTasks || [];
    let selectedView = 'day';
    let careplanData = careplanTasks[0];
    let careplanCode = careplanData?.Action?.PlanCode ?? '';
    let careplanName = careplanData?.Action?.PlanName ?? '';

    const hasData = careplanTasks.length > 0;

    function getTaskCounts(tasks: any[]) {
        const taskCounts = {
            total: 0,
            completed: 0,
            pending: 0,
            delayed: 0,
        };

        if (!tasks?.length) return taskCounts;

        tasks.forEach((task) => {
            taskCounts.total++;
            switch (task.Status) {
                case "Completed":
                    taskCounts.completed++;
                    break;
                case "Pending":
                    taskCounts.pending++;
                    break;
                case "Delayed":
                    taskCounts.delayed++;
                    break;
            }
        });
        return taskCounts;
    }
    const taskStatusCounts = getTaskCounts(careplanTasks);
</script>

<!-- Main Container -->
<div class="w-full p-4">
    <div class="bg-white border border-divider rounded-lg shadow-sm">
        <!-- Header -->
        <div class="border-b border-divider px-6 py-3">
            <h2 class="text-xl font-semibold text-header">Careplan History</h2>
        </div>

        {#if hasData}
        <!-- Content -->
        <div class="p-6">
            <div class="flex flex-col md:flex-row w-full">
                <!-- Left side - Task Information Table -->
                <div class="md:w-1/2 md:border-r border-divider md:pr-6">
                    <div class="overflow-hidden">
                        <table class="min-w-full">
                            <tbody class="divide-y">
                                <tr>
                                    <td class="py-2.5 text-label font-medium">Careplan</td>
                                    <td class="py-2.5 text-value">{careplanName || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-label font-medium">Code</td>
                                    <td class="py-2.5 text-value">{careplanCode || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-label font-medium">Total Tasks</td>
                                    <td class="py-2.5 text-value">{taskStatusCounts.total || 0}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-label font-medium">Completed Tasks</td>
                                    <td class="py-2.5 text-value">{taskStatusCounts.completed || 0}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-label font-medium">Pending Tasks</td>
                                    <td class="py-2.5 text-value">{taskStatusCounts.pending || 0}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-label font-medium">Delayed Tasks</td>
                                    <td class="py-2.5 text-value">{taskStatusCounts.delayed || 0}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-label font-medium">Start Date</td>
                                    <td class="py-2.5 text-value">{data.startDate || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-label font-medium">End Date</td>
                                    <td class="py-2.5 text-value">{data.endDate || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Right side - Graph -->
                <div class="md:w-1/2 md:pl-6 mt-6 md:mt-0">
                    <!-- View Selectors -->
                    <div class="flex justify-end mb-4">
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-label">View:</span>
                            <select
                                class="border rounded px-3 py-1 text-sm"
                                bind:value={selectedView}
                            >
                                <option value="day">Day Wise</option>
                                <option value="week">Week Wise</option>
                            </select>
                        </div>
                    </div>

                    <!-- Chart -->
                    <div class="h-[400px] w-full">
                        <CareplanStackedChart 
                            tasks={careplanTasks} 
                            view={selectedView}
                        />
                    </div>
                </div>
            </div>
        </div>
        {:else}
        <!-- No Data Message -->
        <div class="p-6">
            <div class="flex items-center justify-center h-64 bg-no-data rounded-lg">
                <div class="text-center">
                    <p class="text-no-data text-lg">No careplan data available</p>
                </div>
            </div>
        </div>
        {/if}
    </div>
</div>