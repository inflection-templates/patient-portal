<script lang="ts">
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';

    Chart.register(...registerables);

    interface CareplanTask {
        Task: string;
        Status: string;
        ScheduledStartTime: string;
        CreatedAt: string;
    }

    export let tasks: CareplanTask[] = [];
    export let view: 'day' | 'week' = 'day';

    let canvas: HTMLCanvasElement;
    let chart: Chart;

    function getDateLabel(date: Date, viewType: 'day' | 'week'): string {
        if (viewType === 'week') {
            const weekNumber = Math.ceil((date.getTime() - new Date(tasks[0].CreatedAt).getTime()) / (7 * 24 * 60 * 60 * 1000));
            return `Week ${weekNumber}`;
        }
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    function processTasksData(tasks: CareplanTask[], viewType: 'day' | 'week') {
        const timeGroups = new Map();
        
        tasks.forEach(task => {
            const taskDate = new Date(task.ScheduledStartTime);
            const label = getDateLabel(taskDate, viewType);

            if (!timeGroups.has(label)) {
                timeGroups.set(label, {
                    completed: 0,
                    pending: 0
                });
            }

            const group = timeGroups.get(label);
            if (task.Status === 'Completed') {
                group.completed++;
            } else {
                group.pending++;
            }
        });

        // Sort labels chronologically
        const sortedLabels = Array.from(timeGroups.keys()).sort((a, b) => {
            if (viewType === 'week') {
                return parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]);
            }
            return new Date(a).getTime() - new Date(b).getTime();
        });

        return {
            labels: sortedLabels,
            datasets: [
                {
                    label: 'Completed',
                    data: sortedLabels.map(label => timeGroups.get(label).completed),
                    backgroundColor: '#22C55E', // Green
                },
                {
                    label: 'Pending',
                    data: sortedLabels.map(label => timeGroups.get(label).pending),
                    backgroundColor: '#EF4444', // Red
                }
            ]
        };
    }

    function createChart() {
        if (chart) {
            chart.destroy();
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const chartData = processTasksData(tasks, view);

        chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: view === 'week' ? 'Weeks' : 'Days',
                            font: { size: 14 }
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Tasks',
                            font: { size: 14 }
                        },
                        grid: {
                            color: '#E5E7EB'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Task Status by ${view === 'week' ? 'Week' : 'Day'}`,
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: { bottom: 20 }
                    },
                    legend: {
                        position: 'top',
                        align: 'center',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                const total = context.chart.data.datasets.reduce(
                                    (sum, dataset) => sum + dataset.data[context.dataIndex],
                                    0
                                );
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            },
                            footer: (tooltipItems) => {
                                const total = tooltipItems.reduce(
                                    (sum, item) => sum + item.parsed.y,
                                    0
                                );
                                return `Total: ${total} tasks`;
                            }
                        }
                    }
                }
            }
        });
    }

    $: if (canvas && tasks) {
        createChart();
    }

    $: if (view) {
        if (canvas && tasks) {
            createChart();
        }
    }

    onMount(() => {
        if (canvas && tasks) {
            createChart();
        }

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    });
</script>

<div class="h-full w-full">
    <canvas bind:this={canvas}></canvas>
</div>