<!-- src/lib/components/careplan/CareplanStackedChart.svelte -->
<script lang="ts">
    import { Chart, registerables } from 'chart.js';
    import { onMount } from 'svelte';

    Chart.register(...registerables);

    export let data: {
        standingCosts: any[];
        runningCosts: any[];
    };

    let canvas: HTMLCanvasElement;
    let chart: Chart;

    function createChart() {
        if (chart) {
            chart.destroy();
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const chartData = {
            labels: ['Standing costs', 'Running costs'],
            datasets: [
                {
                    label: 'Washing and cleaning',
                    data: [0, 2],
                    backgroundColor: '#06B6D4',
                },
                {
                    label: 'Traffic tickets',
                    data: [0, 1],
                    backgroundColor: '#8B5CF6',
                },
                {
                    label: 'Tolls',
                    data: [0, 1.5],
                    backgroundColor: '#1E40AF',
                },
                {
                    label: 'Parking',
                    data: [5, 2],
                    backgroundColor: '#EF4444',
                },
                {
                    label: 'Car tax',
                    data: [5.5, 2.5],
                    backgroundColor: '#22C55E',
                },
                {
                    label: 'Repairs and improvements',
                    data: [0, 2],
                    backgroundColor: '#F97316',
                },
                {
                    label: 'Maintenance',
                    data: [0, 2],
                    backgroundColor: '#A3E635',
                },
                {
                    label: 'Inspection',
                    data: [0, 2],
                    backgroundColor: '#7C3AED',
                },
                {
                    label: 'Loan interest',
                    data: [0, 2],
                    backgroundColor: '#059669',
                },
                {
                    label: 'Depreciation of the vehicle',
                    data: [0, 2.5],
                    backgroundColor: '#15803D',
                },
                {
                    label: 'Fuel',
                    data: [0, 2],
                    backgroundColor: '#DC2626',
                },
                {
                    label: 'Insurance and Breakdown cover',
                    data: [4.5, 2.5],
                    backgroundColor: '#3B82F6',
                }
            ]
        };

        chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        max: 25
                    }
                },
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 10
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                }
            }
        });
    }

    $: if (canvas && data) {
        createChart();
    }

    onMount(() => {
        if (canvas && data) {
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