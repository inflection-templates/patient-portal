<script lang="ts">
	import { Chart, Colors, registerables } from 'chart.js';
	import { onMount } from 'svelte';

	Chart.register(...registerables);

    // svelte-ignore export_let_unused
    export let tasks: any[] = [];
    export let view: 'day' | 'week' = 'day';
    export let selectedPlan: string;
    export let careplanTasks_: any;

	let canvas: HTMLCanvasElement;
	let chart: Chart;

    $: if (careplanTasks_ && selectedPlan) {
        console.log('Current tasks:', careplanTasks_[selectedPlan]);
    }

    function processTasksData(tasks: any[], viewType: 'day' | 'week') {
        if (!tasks?.length) {
            console.log('No tasks available to process');
            return { labels: [], datasets: [] };
        }

        console.log('Processing tasks:', tasks.length);

		const sortedTasks = [...tasks].sort(
			(a, b) => new Date(a.ScheduledStartTime).getTime() - new Date(b.ScheduledStartTime).getTime()
		);

		const firstDate = new Date(sortedTasks[0].ScheduledStartTime);
		const lastDate = new Date(sortedTasks[sortedTasks.length - 1].ScheduledStartTime);

		const dataMap = new Map();

		if (viewType === 'day') {
			const totalDays =
				Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
			for (let i = 0; i < totalDays; i++) {
				dataMap.set(`Day ${i + 1}`, { Completed: 0, Delayed: 0 });
			}
		} else {
			const totalWeeks =
				Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1;
			for (let i = 0; i < totalWeeks; i++) {
				dataMap.set(`Week ${i + 1}`, { Completed: 0, Delayed: 0 });
			}
		}

		sortedTasks.forEach((task) => {
			const taskDate = new Date(task.ScheduledStartTime);
			let key;

            if (viewType === 'day') {
                const dayDiff = Math.floor((taskDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));
                key = `Day ${dayDiff + 1}`;
            } else {
                const weekDiff = Math.floor((taskDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
                key = `Week ${weekDiff + 1}`;
            }

			const entry = dataMap.get(key);
			if (entry) {
				if (task.Status === 'Completed') entry.Completed++;
				else if (task.Status === 'Delayed') entry.Delayed++;
			}
		});

        const chartData = {
            labels: Array.from(dataMap.keys()),
            datasets: [
                {
                    label: 'Completed',
                    data: Array.from(dataMap.values()).map(v => v.Completed),
                    backgroundColor: '#22C55E'
                },
                {
                    label: 'Delayed',
                    data: Array.from(dataMap.values()).map(v => v.Delayed),
                    backgroundColor: '#EF4444'
                }
            ]
        };

        console.log('Chart data:', chartData);
        return chartData;
    }

	function getThemeColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? '#D9DEE9' : '#1C252A';
    }

    function createChart() {
        if (!canvas) {
            console.log('Canvas not available');
            return;
        }

        if (chart) {
            chart.destroy();
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.log('Context not available');
            return;
        }

        const currentTasks = careplanTasks_[selectedPlan] || [];
        const chartData = processTasksData(currentTasks, view);
		const themeColor = getThemeColor();
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
                            font: {
                                size: 16
                            },
                            color: themeColor // Set text color dynamically
                        },
                        ticks: {
                            color: themeColor
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
                            font: {
                                size: 16
                            },
                            color: themeColor // Set text color dynamically
                        },
                        ticks: {
                            color: themeColor
                        },
                        grid: {
                            display: true
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: `Task status by ${view === 'week' ? 'Week' : 'Day'}`,
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        color: themeColor, // Set text color dynamically
                        padding: 8
                    },
                    legend: {
                        position: 'top',
                        align: 'center',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            color: themeColor // Set legend text color dynamically
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
                                const total = tooltipItems.reduce((sum, item) => sum + item.parsed.y, 0);
                                return `Total: ${total} tasks`;
                            }
                        }
                    }
                }
            }
        });
	}

    $: if (canvas && careplanTasks_ && selectedPlan) {
        console.log('Updating chart with new data');
        createChart();
    }

    $: if (view && canvas && careplanTasks_ && selectedPlan) {
        console.log('View changed, updating chart');
        createChart();
    }

    onMount(() => {
        console.log('Component mounted');
        if (canvas && careplanTasks_ && selectedPlan) {
            createChart();
        }

		// Update chart on theme change using MutationObserver
		const updateChartOnThemeChange = () => {
			if (chart) {
				createChart();
			}
		};

		const observer = new MutationObserver(updateChartOnThemeChange);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		// Cleanup function
		return () => {
			if (chart) {
				chart.destroy();
			}
			observer.disconnect();
		};
	});
</script>

<div class="h-full w-full">
	<canvas bind:this={canvas}></canvas>
</div>
