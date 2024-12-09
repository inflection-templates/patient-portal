<script lang="ts">
	// import CareplanStackedChart from './../../../../lib/components/careplan/CareplanStackedChart.svelte';
    import CareplanGraph from '$lib/components/careplan/careplan.graph.svelte';
    import CareplanStackedChart from '$lib/components/careplan/CareplanStackedChart.svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;
    console.log('========================================>', data);
    let dayWiseSeparatedData = data.dayWiseSeparatedData;
    let weekWiseSeparatedData = data.weekWiseSeparatedData;
    let careplanTasks = data.careplanTasks || [];
    let selectedView = 'day';
    let viewType = 'line';
    let careplanData = careplanTasks[0];
    let careplanCode = careplanData?.Action?.PlanCode ?? '';
    let careplanName = careplanData?.Action?.PlanName ?? '';

    // Check if data is available
    const hasData = careplanTasks.length > 0;
    const hasGraphData = dayWiseSeparatedData?.labels?.length > 0 || weekWiseSeparatedData?.labels?.length > 0;

    function getTaskCounts(tasks) {
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

    const chartData = {
        standingCosts: [
            { category: 'Insurance', value: 4.5 },
            { category: 'Parking', value: 5 },
            { category: 'Car tax', value: 5.5 }
        ],
        runningCosts: [
            { category: 'Washing and cleaning', value: 2 },
            { category: 'Traffic tickets', value: 1 },
            { category: 'Tolls', value: 1.5 },
            { category: 'Parking', value: 2 },
            { category: 'Car tax', value: 2.5 },
            { category: 'Repairs and improvements', value: 2 },
            { category: 'Maintenance', value: 2 },
            { category: 'Inspection', value: 2 },
            { category: 'Loan interest', value: 2 },
            { category: 'Depreciation of the vehicle', value: 2.5 },
            { category: 'Fuel', value: 2 },
            { category: 'Insurance and Breakdown cover', value: 2.5 }
        ]
    };

</script>

<!-- Main Container -->
<div class="w-full p-4">
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm">
        <!-- Header -->
        <div class="border-b border-gray-200 px-6 py-3">
            <h2 class="text-xl font-semibold text-gray-800">Careplan History</h2>
        </div>

        {#if hasData}
        <!-- Content -->
        <div class="p-6">
            <div class="flex flex-col md:flex-row w-full">
                <!-- Left side - Task Information Table -->
                <div class="md:w-1/2 md:border-r border-gray-200 md:pr-6">
                    <div class="overflow-hidden">
                        <table class="min-w-full">
                            <tbody class="divide-y divide-gray-200">
                                <tr>
                                    <td class="py-2.5 text-gray-700 font-medium">Careplan</td>
                                    <td class="py-2.5 text-gray-900">{careplanName || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-gray-700 font-medium">Code</td>
                                    <td class="py-2.5 text-gray-900">{careplanCode || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-gray-700 font-medium">Total Tasks</td>
                                    <td class="py-2.5 text-gray-900">{taskStatusCounts.total || 0}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-gray-700 font-medium">Completed Tasks</td>
                                    <td class="py-2.5 text-gray-900">{taskStatusCounts.completed || 0}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-gray-700 font-medium">Pending Tasks</td>
                                    <td class="py-2.5 text-gray-900">{taskStatusCounts.pending || 0}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-gray-700 font-medium">Delayed Tasks</td>
                                    <td class="py-2.5 text-gray-900">{taskStatusCounts.delayed || 0}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-gray-700 font-medium">Start Date</td>
                                    <td class="py-2.5 text-gray-900">{data.startDate || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="py-2.5 text-gray-700 font-medium">End Date</td>
                                    <td class="py-2.5 text-gray-900">{data.endDate || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Right side - Graph -->
                <div class="md:w-1/2 md:pl-6 mt-6 md:mt-0">
                    <!-- View Selectors -->
                    <div class="flex justify-end mb-4 gap-4">
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-600">Chart Type:</span>
                            <select
                                class="border rounded px-3 py-1 text-sm"
                                bind:value={viewType}
                            >
                                <option value="line">Line Chart</option>
                                <option value="stacked">Stacked Chart</option>
                            </select>
                        </div>
                        
                        {#if viewType === 'line'}
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-gray-600">Time Period:</span>
                            <select
                                class="border rounded px-3 py-1 text-sm"
                                bind:value={selectedView}
                            >
                                <option value="day">Day Wise</option>
                                <option value="week">Week Wise</option>
                            </select>
                        </div>
                        {/if}
                    </div>

                    <!-- Graph Container -->
                    {#if hasGraphData}
                        <div class="h-[400px] w-full">
                            {#if viewType === 'line'}
                                {#if selectedView === 'week'}
                                    <CareplanGraph
                                        labels={weekWiseSeparatedData.labels}
                                        data1={weekWiseSeparatedData.scheduled}
                                        data2={weekWiseSeparatedData.completed}
                                    />
                                {:else}
                                    <CareplanGraph
                                        labels={dayWiseSeparatedData.labels}
                                        data1={dayWiseSeparatedData.scheduled}
                                        data2={dayWiseSeparatedData.completed}
                                    />
                                {/if}
                            {:else}
                                <CareplanStackedChart tasks={careplanTasks} />
                            {/if}
                        </div>
                    {:else}
                        <div class="h-[400px] w-full flex items-center justify-center bg-gray-50 rounded-lg">
                            <p class="text-gray-500">No graph data available</p>
                        </div>
                    {/if}

                    <!-- Legend for line chart -->
                    {#if viewType === 'line'}
                    <div class="flex justify-center gap-6 mt-4">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span class="text-sm">Scheduled Task</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span class="text-sm">Completed Task</span>
                        </div>
                    </div>
                    {/if}
                </div>
            </div>
        </div>
        {:else}
        <!-- No Data Message -->
        <div class="p-6">
            <div class="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <div class="text-center">
                    <p class="text-gray-500 text-lg">No careplan data available</p>
                </div>
            </div>
        </div>
        {/if}
    </div>
</div>