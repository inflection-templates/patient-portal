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

<div class="careplan-container">
    <div class="careplan-card">
        <div class="careplan-header">
            <div class="careplan-header-content">
                <h2 class="careplan-title">Careplan History</h2>
                {#if hasData}
                <div class="careplan-view-selector">
                    <span class="text-sm text-label">View:</span>
                    <select
                        class="careplan-select"
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
        <div class="careplan-content">
            <div class="careplan-stats-grid">
                <div class="careplan-stat-card bg-stat-total">
                    <div class="careplan-stat-label text-stat-total">Total Tasks</div>
                    <div class="careplan-stat-value">{taskStatusCounts.total || 0}</div>
                </div>
                <div class="careplan-stat-card bg-stat-completed">
                    <div class="careplan-stat-label text-stat-completed">Completed</div>
                    <div class="careplan-stat-value">{taskStatusCounts.completed || 0}</div>
                </div>
                <div class="careplan-stat-card bg-stat-delayed">
                    <div class="careplan-stat-label text-stat-delayed">Delayed</div>
                    <div class="careplan-stat-value">{taskStatusCounts.delayed || 0}</div>
                </div>
            </div>

            <div class="careplan-chart-container">
                <div class="careplan-chart">
                    <div class="careplan-chart-wrapper">
                        <CareplanStackedChart 
                            tasks={careplanTasks}
                            view={selectedView}
                        />
                    </div>
                </div>
                <div class="careplan-info-sidebar">
                    <div class="careplan-info-card">
                        <table class="careplan-table">
                            <tbody class="careplan-table-body">
                                <tr>
                                    <td class="careplan-table-cell careplan-table-label">Careplan</td>
                                    <td class="careplan-table-cell careplan-table-value">{careplanName || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="careplan-table-cell careplan-table-label">Code</td>
                                    <td class="careplan-table-cell careplan-table-value">{careplanCode || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="careplan-table-cell careplan-table-label">Start Date</td>
                                    <td class="careplan-table-cell careplan-table-value">{data.startDate || '-'}</td>
                                </tr>
                                <tr>
                                    <td class="careplan-table-cell careplan-table-label">End Date</td>
                                    <td class="careplan-table-cell careplan-table-value">{data.endDate || '-'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        {:else}
        <div class="careplan-content">
            <div class="careplan-empty-state">
                <div class="text-center">
                    <p class="careplan-empty-text">Careplan data not available</p>
                </div>
            </div>
        </div>
        {/if}
    </div>
</div>