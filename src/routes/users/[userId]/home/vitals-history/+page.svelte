<script lang="ts">
	import VitalsMain from '$lib/components/home/vitals-main.svelte';
	import type { PageServerData } from './$types';
	import chalk from 'chalk';
	import { page } from '$app/stores';
	import { formatDateMonth,handleVitals,formatBloodPressureData,formatData } from '$lib/utils.ts/functions';
	import { onMount } from 'svelte';

	const userId = $page.params.userId;
	export let data: PageServerData;
	let heightData = data.heightData?.BodyHeightRecords?.Items;
	let weightData = data.weightData?.BodyWeightRecords?.Items;
	let bloodPressureData = data.pressureData?.BloodPressureRecords?.Items;
	let glucoseData = data.glucoseData?.BloodGlucoseRecords?.Items;
	let oxygenSaturationData = data.oxygenSaturationData?.BloodOxygenSaturationRecords?.Items;
	let temperatureData = data.temperatureData?.BodyTemperatureRecords?.Items;
	let pulseData = data.pulseRateData?.PulseRecords?.Items;



	const formattedHeightData = formatData(heightData, 'BodyHeight');
	console.log('formattedHeightData', formattedHeightData);
	const formattedWeightData = formatData(weightData, 'BodyWeight');
	const formattedBloodPressureData = formatBloodPressureData(
		bloodPressureData,
		'Systolic',
		'Diastolic'
	);
	console.log('BloodPressureData', formattedBloodPressureData);
	const formattedGlucoseData = formatData(glucoseData, 'BloodGlucose');
	const formattedOxygenSaturationData = formatData(oxygenSaturationData, 'BloodOxygenSaturation');
	const formattedTemperatureData = formatData(temperatureData, 'BodyTemperature');
	const formattedPulseData = formatData(pulseData, 'Pulse');

	const sampleHeightData = handleVitals(formattedHeightData, 'Height');
	const sampleWeightData = handleVitals(formattedWeightData, 'Weight');
	const sampleBloodPressureData = handleVitals(formattedBloodPressureData, 'Blood Pressure');
	const sampleGlucoseData = handleVitals(formattedGlucoseData, 'Glucose');
	const sampleOxygenSaturationData = handleVitals(formattedOxygenSaturationData, 'Oxygen Saturation');
	const sampleTemperatureData = handleVitals(formattedTemperatureData, 'Temperature');
	const samplePulseData = handleVitals(formattedPulseData, 'Pulse');

	console.log("sampledBloodPressureData", sampleBloodPressureData);

	

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

	$: currentData = (() => {
		switch (activeVital) {
			case 'Height':
				return sampleHeightData;
			case 'Weight':
				return sampleWeightData;
			case 'Blood Pressure':
				return formattedBloodPressureData;
			case 'Glucose':
				return sampleGlucoseData;
			case 'Oxygen Saturation':
				return sampleOxygenSaturationData;
			case 'Temperature':
				return sampleTemperatureData;
			case 'Pulse':
				return samplePulseData;
			default:
				return [];
		}
	})();
	let activeButton: string = 'vitalsHistory';
	function setActiveVitals(vital: string) {
		activeVital = vital;
	}
	function setActive(button: string) {
		activeButton = button;
	}
</script>

<div class="container">
	<div class="space-x-2 mt-4 ml-10">
		<a
			class={`btn1 ${activeButton === 'taskHistory' ? 'active' : ''}`}
			href={`/users/${userId}/home/`}
			on:click={() => setActive('taskHistory')}
		>
			Task History
		</a>

		<button
			class={`btn1 ${activeButton === 'vitalsHistory' ? 'active' : ''}`}
			on:click={() => setActive('vitalsHistory')}
		>
			Vitals History
		</button>
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
