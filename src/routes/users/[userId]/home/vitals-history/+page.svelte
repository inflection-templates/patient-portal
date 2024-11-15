<script lang="ts">
	import VitalsMain from '$lib/components/home/vitals-main.svelte';
	import type { PageServerData } from './$types';
	import chalk from 'chalk';
	import { page } from '$app/stores';
	import { formatDateMonth } from '$lib/components/home/functions';
	import { onMount } from 'svelte';

	const userId = $page.params.userId;
	export let data: PageServerData;
	let heightData: any = [];
	let weightData = [];
	let bloodPressureData = [];
	let glucoseData: any = [];
	let oxygenSaturationData: any = [];
	let temperatureData: any = [];
	let pulseData: any = [];


	let activeVital: string = 'Height';
	const vitals = [
		'Height',
		'Weight',
		'Blood Pressure',
		'Glucose',
		'Oxygen Saturation',
		'Temperature',
		'Pulse'
	];



	if (data.heightData?.BodyHeightRecords?.Items) {
		for (let item of data.heightData.BodyHeightRecords.Items) {
			heightData.push({
				value: item.BodyHeight,
				date: formatDateMonth(item.RecordDate),
				unit: item.Unit
			});
		}
	}

	if (data.weightData?.BodyWeightRecords?.Items) {
		for (let item of data.weightData.BodyWeightRecords.Items) {
			weightData.push({
				value: item.BodyWeight,
				date: formatDateMonth(item.RecordDate),
				unit: item.Unit
			});
		}
	}
	if (data.pressureData?.BloodPressureRecords?.Items) {
		for (let item of data.pressureData.BloodPressureRecords.Items) {
			bloodPressureData.push({
				value: item.Systolic,
				// + '/' + item.Diastolic,
				date: formatDateMonth(item.RecordDate),
				unit: item.Unit
			});
		}
	}

	if (data.glucoseData?.BloodGlucoseRecords?.Items) {
		for (let item of data.glucoseData.BloodGlucoseRecords.Items) {
			glucoseData.push({
				value: item.BloodGlucose,
				date: formatDateMonth(item.RecordDate),
				unit: item.Unit
			});
		}
	}
	if (data.oxygenSaturationData?.BloodOxygenSaturationRecords?.Items) {
		for (let item of data.oxygenSaturationData.BloodOxygenSaturationRecords.Items) {
			oxygenSaturationData.push({
				value: item.BloodOxygenSaturation,
				date: formatDateMonth(item.RecordDate),
				unit: item.Unit
			});
		}
	}
	if (data.temperatureData?.BodyTemperatureRecords?.Items) {
		for (let item of data.temperatureData.BodyTemperatureRecords.Items) {
			temperatureData.push({
				value: item.BodyTemperature,
				date: formatDateMonth(item.RecordDate),
				unit: item.Unit
			});
		}
	}
	if (data.pulseRateData?.PulseRecords?.Items) {
		for (let item of data.pulseRateData.PulseRecords.Items) {
			pulseData.push({
				value: item.Pulse,
				date: formatDateMonth(item.RecordDate),
				unit: item.Unit
			});
		}
	}

	$: currentData = (() => {
		switch (activeVital) {
			case 'Height':
				return heightData;
			case 'Weight':
				return weightData;
			case 'Blood Pressure':
				return bloodPressureData;
			case 'Glucose':
				return glucoseData;
			case 'Oxygen Saturation':
				return oxygenSaturationData;
			case 'Temperature':
				return temperatureData;
			case 'Pulse':
				return pulseData;
			default:
				return [];
		}
	})();
	function setActiveVitals(vital: string) {
		activeVital = vital;
	}
</script>

<div class="container">
	<div class="space-x-2 mt-4 ml-10">
		<a class="btn1" href="/users/{userId}/home"> Task History</a>
		<button class="btn1"> vitals History </button>
	</div>
	<div class="space-x-2 mt-4 mx-10">
		{#each vitals as vital}
			<button
				class="btn1"
				on:click={() => setActiveVitals(vital)}
				class:active={activeVital === vital}
			>
				{vital}
			</button>
		{/each}
	</div>
	<VitalsMain data={currentData} title={activeVital} />
</div>
