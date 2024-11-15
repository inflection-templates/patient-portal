import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

export const getHeights = async (
	sessionId     :       string | undefined,
	patientUserId : string | undefined
) => {
	const url =
		BACKEND_API_URL + `/clinical/biometrics/body-heights/search?PatientUserId=${patientUserId}`;
	console.log(`getHeights url: ${url}`);
	return await get_(url, true, sessionId);
};

export const getGlucose = async (
	sessionId     : string | undefined,
	patientUserId : string | undefined
) => {
	const url =
		BACKEND_API_URL + `/clinical/biometrics/blood-glucose/search?PatientUserId=${patientUserId}`;
	return await get_(url, true, sessionId);
};

export const getBloodPressure = async (
	sessionId     : string | undefined,
	patientUserId : string | undefined
) => {
	const url =
		BACKEND_API_URL + `/clinical/biometrics/blood-pressures/search?PatientUserId=${patientUserId}`;
	return await get_(url, true, sessionId);
};

export const getOxygenSaturation = async (
	sessionId     : string | undefined,
	patientUserId : string | undefined
) => {
	const url =
		BACKEND_API_URL +
		`/clinical/biometrics/blood-oxygen-saturations/search?PatientUserId=${patientUserId}`;
	return await get_(url, true, sessionId);
};

export const getTemperature = async (
	sessionId     : string | undefined,
	patientUserId : string | undefined
) => {
	const url =
		BACKEND_API_URL +
		`/clinical/biometrics/body-temperatures/search?PatientUserId=${patientUserId}`;
	return await get_(url, true, sessionId);
};

export const getWeights = async (
	sessionId     : string | undefined,
	patientUserId : string | undefined
) => {
	const url =
		BACKEND_API_URL + `/clinical/biometrics/body-weights/search?PatientUserId=${patientUserId}`;
	console.log(`getWeights url: ${url}`);
	return await get_(url, true, sessionId);
};

export const getPulse = async (
	sessionId     : string | undefined,
	patientUserId : string | undefined
) => {
	const url = BACKEND_API_URL + `/clinical/biometrics/pulse/search?PatientUserId=${patientUserId}`;
	return await get_(url, true, sessionId);
};
