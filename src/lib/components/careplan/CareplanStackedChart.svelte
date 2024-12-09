<script lang="ts">
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';

    Chart.register(...registerables);

    interface CareplanTask {
        Task: string;
        Category: string;
        Status: string;
    }

    export let tasks: CareplanTask[] = [];

    let canvas: HTMLCanvasElement;
    let chart: Chart;

    function processTasksData(tasks: CareplanTask[]) {
        // Group tasks by category
        const categoryGroups = tasks.reduce((acc, task) => {
            if (!acc[task.Category]) {
                acc[task.Category] = {
                    total: 0,
                    completed: 0,
                    pending: 0,
                    delayed: 0
                };
            }
            acc[task.Category].total++;
            
            switch (task.Status) {
                case 'Completed':
                    acc[task.Category].completed++;
                    break;
                case 'Pending':
                    acc[task.Category].pending++;
                    break;
                case 'Delayed':
                    acc[task.Category].delayed++;
                    break;
            }
            return acc;
        }, {});

        const categories = Object.keys(categoryGroups);
        
        return {
            labels: categories,
            datasets: [
                {
                    label: 'Completed',
                    data: categories.map(cat => categoryGroups[cat].completed),
                    backgroundColor: '#22C55E', // Green
                },
                {
                    label: 'Pending',
                    data: categories.map(cat => categoryGroups[cat].pending),
                    backgroundColor: '#3B82F6', // Blue
                },
                {
                    label: 'Delayed',
                    data: categories.map(cat => categoryGroups[cat].delayed),
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

        const chartData = processTasksData(tasks);

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
                            text: 'Categories',
                            font: {
                                size: 14
                            }
                        }
                    },
                    y: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Number of Tasks',
                            font: {
                                size: 14
                            }
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Task Status Distribution by Category',
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: {
                            bottom: 20
                        }
                    },
                    legend: {
                        position: 'top',
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