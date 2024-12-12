import { BACKEND_API_URL } from '$env/static/private';
import { CacheService } from '$lib/server/cache/cache.service';
import { post_, get_, delete_, put_ } from './common';

///////////////////////////////////////////////////////////////////////////////

export const generateOtp = async (phone: string, loginRoleId?: number, purpose?: string) => {
	const url = BACKEND_API_URL + `/users/generate-otp`;
	const body = {
		Phone: phone,
		RoleId: loginRoleId ? loginRoleId : 2,
		Purpose: purpose ? purpose : 'Login'
	};
	return await post_(url, body);
};

export const loginWithOtp = async (otp: string, phone: string, loginRoleId: number = 2) => {
	const url = BACKEND_API_URL + `/users/login-with-otp`;
	const body = {
		Phone: phone,
		Otp: otp,
		LoginRoleId: loginRoleId ?? 2
	};
	return await post_(url, body);
};

export const getPatientById = async (
	sessionId: string | undefined,
	patientId: string | undefined
) => {
	const url = BACKEND_API_URL + `/patients/${patientId}`;
	return await get_(url, true, sessionId);
};

export const logout = async (sessionId: string) => {
	const url = BACKEND_API_URL + `/users/logout`;
	const result = await post_(url, {}, true, sessionId);
	const findAndClearKeys = [`req-getUserRoles`];
	await CacheService.findAndClear(findAndClearKeys);
	return result;
};

export const deletePatient = async (sessionId: string, patientId: string) => {
	const url = BACKEND_API_URL + `/patients/${patientId}`;
	const result = await delete_(url, true, sessionId);
	const findAndClearKeys = [`req-getUserRoles`];
	await CacheService.findAndClear(findAndClearKeys);
	return result;
};

export const updatePatientById = async (
	sessionId: string | undefined,
	patientId: string | undefined,
	firstName: string,
	LastName: string,
	Gender: string,
	BirthDate: string,
	MaritalStatus: string,
	email: string,
	phone: string,
	race: string,
	Ethnicity: string,
	StrokeSurvivorOrCaregiver: string,
	WorkedPriorToStroke: boolean,
	LivingAlone: boolean,
	AddressLine: string,
	city: string,
	District: string,
	State: string,
	country: string,
	postalcode: string,
	imageresourceid: string
) => {
	console.log('in the user update living alone');
	const body = {
		FirstName: firstName ? firstName : null,
		LastName: LastName ? LastName : null,
		Gender: Gender ? Gender : null,
		BirthDate: BirthDate ? BirthDate : null,
		MaritalStatus: MaritalStatus ? MaritalStatus : null,
		Email: email ? email : null,
		Phone: phone ? phone : null,
		Race: race ? race : null,
		Ethnicity: Ethnicity ? Ethnicity : null,
		StrokeSurvivorOrCaregiver: StrokeSurvivorOrCaregiver ? StrokeSurvivorOrCaregiver : null,
		WorkedPriorToStroke:
			WorkedPriorToStroke !== undefined && WorkedPriorToStroke !== null
				? WorkedPriorToStroke
				: null,
		LivingAlone: LivingAlone !== undefined && LivingAlone !== null ? LivingAlone : null,

		AddressLine: AddressLine ? AddressLine : null,
		City: city ? city : null,
		District: District ? District : null,
		State: State ? State : null,
		Country: country ? country : null,
		PostalCode: postalcode ? postalcode : null,
		ImageResourceId: imageresourceid ? imageresourceid : null
	};
	console.log('in the user update', body);
	const url = BACKEND_API_URL + `/patients/${patientId}`;
	return await put_(url, body, true, sessionId);
};
