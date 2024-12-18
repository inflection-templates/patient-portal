<script lang="ts">
	import VitalsMain from '$lib/components/home/vitals.main.svelte';
	import type { PageServerData } from './$types';
	import chalk from 'chalk';
	import { page } from '$app/stores';
	import {
		formatDateMonth,
		handleVitals,
		formatBloodPressureData,
		formatData
	} from '$lib/utils.ts/functions';
	import { onMount } from 'svelte';

	const userId = $page.params.userId;
	export let data: PageServerData;
	console.log('Vitals Data', data.vitalsData);
	let vitalsData = data.vitalsData ?? {};
	let heightData = vitalsData?.height ?? [];
	let weightData = vitalsData.weight?? [];
	let bloodPressureData = vitalsData.bloodPressure ?? [];
	let glucoseData = vitalsData.glucose ?? [];
	let oxygenSaturationData = vitalsData.oxygenSaturation ?? [];
	let temperatureData = vitalsData.temperature ?? [];
	let pulseData = vitalsData.pulse ?? [];
	// let heightData = data.heightData ?? [];
	// let weightData = data.weightData?? [];
	// let bloodPressureData = data.pressureData ?? [];
	// let glucoseData = data.glucoseData ?? [];
	// let oxygenSaturationData = data.oxygenSaturationData ?? [];
	// let temperatureData = data.temperatureData ?? [];
	// let pulseData = data.pulseRateData ?? [];

	// const formattedHeightData = formatData(heightData, 'BodyHeight');
	// const formattedWeightData = formatData(weightData, 'BodyWeight');
	// const formattedBloodPressureData = formatBloodPressureData(
	// 	bloodPressureData,
	// 	'Systolic',
	// 	'Diastolic'
	// );
	// console.log('BloodPressureData', formattedBloodPressureData);
	// const formattedGlucoseData = formatData(glucoseData, 'BloodGlucose');
	// const formattedOxygenSaturationData = formatData(oxygenSaturationData, 'BloodOxygenSaturation');
	// const formattedTemperatureData = formatData(temperatureData, 'BodyTemperature');
	// const formattedPulseData = formatData(pulseData, 'Pulse');

	// const sampleHeightData = handleVitals(formattedHeightData, 'Height');
	// const sampleWeightData = handleVitals(formattedWeightData, 'Weight');
	// const sampleBloodPressureData = handleVitals(formattedBloodPressureData, 'Blood Pressure');
	// const sampleGlucoseData = handleVitals(formattedGlucoseData, 'Glucose');
	// const sampleOxygenSaturationData = handleVitals(
	// 	formattedOxygenSaturationData,
	// 	'Oxygen Saturation'
	// );
	// const sampleTemperatureData = handleVitals(formattedTemperatureData, 'Temperature');
	// const samplePulseData = handleVitals(formattedPulseData, 'Pulse');

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

	// $: currentData = (() => {
	// 	switch (activeVital) {
	// 		case 'Height':
	// 			return sampleHeightData;
	// 		case 'Weight':
	// 			return sampleWeightData;
	// 		case 'Blood Pressure':
	// 			return sampleBloodPressureData;
	// 		case 'Glucose':
	// 			return sampleGlucoseData;
	// 		case 'Oxygen Saturation':
	// 			return sampleOxygenSaturationData;
	// 		case 'Temperature':
	// 			return sampleTemperatureData;
	// 		case 'Pulse':
	// 			return samplePulseData;
	// 		default:
	// 			return [];
	// 	}
	// })();

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

<div>
	<div class="activetasks">
		{#each vitals as vital}
			<button
				class="history"
				on:click={() => setActiveVitals(vital)}
				class:active={activeVital === vital}
			>
				{vital}
			</button>
		{/each}
	</div>
</div>
{#if currentData.length != 0}
	<VitalsMain data={currentData} title={activeVital} />
{:else}
	<p class="not-available my-4 mx-2 sm:mx-8">Data not available for {activeVital}.</p>
{/if}
