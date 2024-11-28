<script lang="ts">
	export let labels;
	export let data1;
	export let data2;
	import JointBarGraph from '$lib/components/vitals.graphs/Joint.Bar.Graph.svelte';

</script>

<div class="">
	<JointBarGraph title={"I am boy"} {labels} {data1} {data2} />
</div>

