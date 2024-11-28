<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	/////////////////////////////////////////////////////////////////////////////

	export let labels: string[] = [];
	export let data1: number[] = [];
	export let data2: number[] = [];
	export let title: string;

	let barChart:any;
	let ctx;

	let xLabel = 'Date';
	let yLabel = 'Tasks Status';
	onMount(() => {
		ctx = barChart.getContext('2d');
		barChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
					{
						data: data1,
						backgroundColor: '#68d33d',
						borderColor: '#5EC009',
						borderWidth: 1,
						label: 'Scheduled Task',
						borderRadius: {
							topLeft: 4,
							topRight: 4
						}
					},
					{
						data: data2,
						backgroundColor: '#f86565',
						borderColor: '#5EC1E9',
						borderWidth: 1,
						label: 'Completed Task',
						borderRadius: {
							topLeft: 4,
							topRight: 4
						}
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				indexAxis: 'x',
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							color: document.documentElement.classList.contains('dark') ? '#808080' : '#808080'
						},
						title: {
							display: true,
							text: xLabel,
							color: document.documentElement.classList.contains('dark') ? '#808080' : '#808080'
						}
					},
					y: {
						beginAtZero: true,
						grid: {
							display: true
						},
						ticks: {
							color: document.documentElement.classList.contains('dark') ? '#808080' : '#808080'
						},
						title: {
							display: true,
							text: yLabel,
							color: document.documentElement.classList.contains('dark') ? '#808080' : '#808080'
						}
					}
				},
				layout: {
					padding: {
						bottom: 20
					}
				},
				plugins: {
					legend: {
						display: true,
						position: 'top',
						align: 'center',
						labels: {
							color: document.documentElement.classList.contains('dark') ? '#808080' : '#808080'
						}
					},
					title: {
						display: false,
						text: title,
						position: 'top',
						color: document.documentElement.classList.contains('dark') ? '#808080' : '#808080',
						align: 'start',
						padding: 20,
						font: {
							size: 22,
							weight: 'normal',
							lineHeight: 1.2
						}
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								let label = context.dataset.label || '';
								let xLabel = labels[context.dataIndex] || 'No label';
								let yValue = context.parsed.y !== null ? context.parsed.y : 'No value';
								if (label) {
									label += ': ';
								}
								label += `${xLabel} , Value: ${yValue}`;
								return label;
							}
						}
					}
				}
			}
		});
	});
</script>

<canvas class="canvas" bind:this={barChart}></canvas>
