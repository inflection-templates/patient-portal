<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	export let labels: string[] = [];
	export let data1: number[] = []; // Data for first line
	export let data2: number[] = []; // Data for second line
	export let title: string;

	let barChart: Chart;
	let ctx;

	onMount(() => {
		try {
			ctx = barChart.getContext('2d');
			barChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Systolic',
							data: data1,
							borderColor: '#808080',
							backgroundColor: 'transparent',
							borderWidth: 2,
							pointRadius: 2,
							pointHoverRadius: 4,
							tension: 0.1
						},
						{
							label: 'Diastolic',
							data: data2,
							borderColor: '#FF0000', // Different color for second line
							backgroundColor: 'transparent',
							borderWidth: 2,
							pointRadius: 2,
							pointHoverRadius: 4,
							tension: 0.1
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
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
								text: 'Date',
								color: document.documentElement.classList.contains('dark') ? '#808080' : '#808080'
							}
						},
						y: {
							grid: {
								display: true,
								borderColor: 'rgba(0, 0, 0, 0.1)', // Light gray, 10% opacity
								lineWidth: 0.3,
								borderDash: [10, 10] // Dashed lines
							},
							ticks: {
								color: document.documentElement.classList.contains('dark') ? '#808080' : '#808080'
							},
							title: {
								display: true,
								text: title,
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
							display: true, // Show legend for multiple lines
							labels: {
								color: document.documentElement.classList.contains('dark') ? '#808080' : '#808080',
								boxWidth: 10,
								boxHeight: 10
							}
						},
						title: {
							display: false,
							text: title,
							color: document.documentElement.classList.contains('dark') ? '#808080' : '#808080',
							font: {
								size: 22,
								weight: 'normal',
								lineHeight: 1.2
							}
						}
					}
				}
			});
		} catch (error) {
			console.error('Error initializing chart:', error);
		}
	});

	onDestroy(() => {
		if (barChart) {
			barChart.destroy();
		}
	});
</script>

<div class="chart">
	{#if data1 && data1.length > 0 && data2 && data2.length > 0}
		<canvas bind:this={barChart} class="canvas"></canvas>
	{:else}
		<p>No data available.</p>
	{/if}
</div>
