<script lang="ts">
    import { onMount } from 'svelte';
    import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
  
    // Register Chart.js components
    Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  
    export let labels: string[] = [];
    export let data: number[] = [];
    export let chartTitle: string = 'Bar Chart';
  
    let chart: Chart | null = null;
    let canvas: HTMLCanvasElement;
  
    onMount(() => {
      if (chart) chart.destroy();
  
      chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: chartTitle,
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: chartTitle,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  
    // Destroy the chart on component unmount
    $: () => {
      if (chart) chart.destroy();
    };
  </script>
  
  <canvas bind:this={canvas}></canvas>
  