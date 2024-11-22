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
const itemsPerPage = 100

export const load: PageServerLoad = async (event: RequestEvent) => {
	try {
		const sessionId = event.cookies.get('sessionId');
		const userId = event.params.userId;

		const searchParams = {
			userId: event.params.userId as string,
			itemsPerPage: itemsPerPage
		}

		const height = await getHeights(sessionId, searchParams);
		const heightData = height.Data;

		const weight = await getWeights(sessionId, searchParams);
		const weightData = weight.Data;

		const temperature = await getTemperature(sessionId, searchParams);
		const temperatureData = temperature.Data;

		const glucose = await getGlucose(sessionId, searchParams);
		const glucoseData = glucose.Data;

		const oxygenSaturation = await getOxygenSaturation(sessionId, searchParams);
		const oxygenSaturationData = oxygenSaturation.Data;

		const pressure = await getBloodPressure(sessionId, searchParams);
		const pressureData = pressure.Data;

		const pulseRate = await getPulse(sessionId, searchParams);
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
