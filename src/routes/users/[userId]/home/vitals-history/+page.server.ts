import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	getGlucose,
	getHeights,
	getWeights,
	getTemperature,
	getOxygenSaturation,
	getBloodPressure,
	getPulse
} from '$routes/api/services/vitals';
import chalk from 'chalk';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils.ts/message.utils';
import { string } from 'zod';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	try {
		const sessionId = event.cookies.get('sessionId');
		const userId = event.params.userId;

		const height = await getHeights(sessionId, {userId});
		const heightData = height.Data;

		const weight = await getWeights(sessionId, { userId });
		const weightData = weight.Data;

		const temperature = await getTemperature(sessionId, {userId});
		const temperatureData = temperature.Data;

		const glucose = await getGlucose(sessionId, {userId});
		const glucoseData = glucose.Data;

		const oxygenSaturation = await getOxygenSaturation(sessionId, {userId});
		const oxygenSaturationData = oxygenSaturation.Data;

		const pressure = await getBloodPressure(sessionId, {userId});
		const pressureData = pressure.Data;

		const pulseRate = await getPulse(sessionId, {userId});
		const pulseRateData = pulseRate.Data;

		if (
			!heightData ||
			!weightData ||
			!temperatureData ||
			!glucoseData ||
			!oxygenSaturationData ||
			!pressureData ||
			!pulseRateData
		) {
			throw error(404, 'vitals data not found');
		}
		if (
			height.Status === 'Failure' ||
			weight.Status === 'Failure' ||
			temperature.Status === 'Failure' ||
			glucose.Status === 'Failure' ||
			oxygenSaturation.Status === 'Failure' ||
			pressure.Status === 'Failure' ||
			pulseRate.Status === 'Failure'
		) {
			throw redirect(
				303,
				`/users/${userId}/home`,
				errorMessage('Latest height report not available.'),
				event
			);
		}
		return {
			sessionId,
			heightData,
			weightData,
			temperatureData,
			glucoseData,
			oxygenSaturationData,
			pressureData,
			pulseRateData
		};
	} catch (error) {
		console.error(`Error retriving Vitals: ${error}`);
	}
};
