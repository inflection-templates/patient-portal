<script lang="ts">
	import BarChart from './BarChart.svelte';
	export let date;
	export let value;
	export let title;


</script>

{#if date.length > 0}
	<div class="h-96 w-full">
		<BarChart dataSource={value} labels={date} title={title} />
	</div>
{:else}
	<div class="">
		<p class="justify-left items-center flex text-2xl">
			<!-- Access Frequency -->
		</p>
		<p class="justify-center items-center flex text-xl ">Data Not Available</p>
	</div>
{/if}
