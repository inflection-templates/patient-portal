<script lang="ts">
		import VitalsMain from '$lib/components/home/vitals.main.svelte';
	import type { PageServerData } from './$types';
	import chalk from 'chalk';
	import { page } from '$app/stores';
	import { formatDateMonth } from '$lib/components/home/functions';
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

	function formatData(data: any, valueKey: any) {
		return data.map((item) => ({
			value: item[valueKey],
			date: formatDateMonth(item.RecordDate),
			unit: item.Unit
		}));
	}

	function formatBloodPressureData(data: any, valueKey1: any, valueKey2: any) {
		return data.map((item) => ({
			value: item[valueKey1],
			value1: item[valueKey2],
			date: formatDateMonth(item.RecordDate),
			unit: item.Unit
		}));
	}

	const formattedHeightData = formatData(heightData, 'BodyHeight');
	console.log('formattedHeightData', formattedHeightData);
	const formattedWeightData = formatData(weightData, 'BodyWeight');
	const formattedBloodPressureData = formatBloodPressureData(
		bloodPressureData,
		'Systolic',
		'Diastolic'
	);
	const formattedGlucoseData = formatData(glucoseData, 'BloodGlucose');
	const formattedOxygenSaturationData = formatData(oxygenSaturationData, 'BloodOxygenSaturation');
	const formattedTemperatureData = formatData(temperatureData, 'BodyTemperature');
	const formattedPulseData = formatData(pulseData, 'Pulse');

	console.log('heightData', formattedBloodPressureData);

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
				return formattedHeightData;
			case 'Weight':
				return formattedWeightData;
			case 'Blood Pressure':
				return formattedBloodPressureData;
			case 'Glucose':
				return formattedGlucoseData;
			case 'Oxygen Saturation':
				return formattedOxygenSaturationData;
			case 'Temperature':
				return formattedTemperatureData;
			case 'Pulse':
				return formattedPulseData;
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

<div>
	<div class="taskbutton1">
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

	<div class="taskbutton2">
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
</div>
<VitalsMain data={currentData} title={activeVital} />