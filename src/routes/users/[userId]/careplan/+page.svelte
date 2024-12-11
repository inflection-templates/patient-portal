<script lang="ts">
    import CareplanStackedChart from '$lib/components/careplan/careplan.stacked.chart.svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;
    let careplanTasks = data.careplanTasks || [];
    let selectedView: 'day' | 'week' = 'day';
    let careplanData = careplanTasks[0];
    let careplanCode = careplanData?.Action?.PlanCode ?? '';
    let careplanName = careplanData?.Action?.PlanName ?? '';

    const hasData = careplanTasks.length > 0;

    function getTaskCounts(tasks: any[]) {
        const taskCounts = {
            total: 0,
            completed: 0,
            delayed: 0,
        };

        if (!tasks?.length) return taskCounts;

        tasks.forEach((task) => {
            taskCounts.total++;
            switch (task.Status) {
                case "Completed":
                    taskCounts.completed++;
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

<div class="w-full p-4">
    <div class="bg-white border border-divider rounded-lg shadow-sm">
        <div class="border-b border-divider px-6 py-4">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-header">Careplan History</h2>
                {#if hasData}
                <div class="flex items-center gap-2">
                    <span class="text-sm text-label">View:</span>
                    <select
                        class="border rounded px-3 py-1.5 text-sm bg-white"
                        bind:value={selectedView}
                    >
                        <option value="day">Day Wise</option>
                        <option value="week">Week Wise</option>
                    </select>
                </div>
                {/if}
            </div>
        </div>

        {#if hasData}
        <div class="p-6">
            <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="text-sm text-gray-600">Total Tasks</div>
                    <div class="text-2xl font-semibold mt-1">{taskStatusCounts.total || 0}</div>
                </div>
                <div class="bg-green-50 rounded-lg p-4">
                    <div class="text-sm text-green-600">Completed</div>
                    <div class="text-2xl font-semibold mt-1">{taskStatusCounts.completed || 0}</div>
                </div>
                <div class="bg-red-50 rounded-lg p-4">
                    <div class="text-sm text-red-600">Delayed</div>
                    <div class="text-2xl font-semibold mt-1">{taskStatusCounts.delayed || 0}</div>
                </div>
            </div>

            <div class="flex gap-6">
                <div class="flex-1">
                    <div class="h-[400px] w-full">
                        <CareplanStackedChart 
                            tasks={careplanTasks}
                            view={selectedView}
                        />
                    </div>
                </div>
                <div class="w-80">
                    <div class="bg-gray-50 rounded-lg p-4 mt-16">
                        <table class="w-full">
                            <tbody class="divide-y divide-gray-200">
                                <tr>
                                    <td class="py-3 text-sm font-medium text-gray-600">Careplan</td>
                                    <td class="py-3 text-sm text-gray-900">{careplanName || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="py-3 text-sm font-medium text-gray-600">Code</td>
                                    <td class="py-3 text-sm text-gray-900">{careplanCode || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="py-3 text-sm font-medium text-gray-600">Start Date</td>
                                    <td class="py-3 text-sm text-gray-900">{data.startDate || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="py-3 text-sm font-medium text-gray-600">End Date</td>
                                    <td class="py-3 text-sm text-gray-900">{data.endDate || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {:else}
        <div class="p-6">
            <div class="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <div class="text-center">
                    <p class="text-gray-500 text-lg">Careplan data not available</p>
                </div>
            </div>
        </div>
        {/if}
    </div>
</div>