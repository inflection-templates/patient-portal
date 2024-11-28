import { BACKEND_API_URL } from '$env/static/private';
import { CacheService } from '$lib/server/cache/cache.service';
import { post_, get_, delete_ } from './common';

///////////////////////////////////////////////////////////////////////////////

export const generateOtp = async (phone: string, loginRoleId?: number, purpose?: string) => {
	const url = BACKEND_API_URL + `/users/generate-otp`;
	const body = {
		Phone: phone,
		RoleId: loginRoleId ? loginRoleId : 2,
		Purpose: purpose ? purpose : 'Login',
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

export const getPatientById = async (sessionId: string, patientId: string) => {
	const url = BACKEND_API_URL + `/patients/${patientId}`;
	return await get_(url, true, sessionId);
};

export const logout = async (sessionId: string) => {
	const url = BACKEND_API_URL + `/users/logout`;
	const result = await post_(url, {}, true, sessionId);
	const findAndClearKeys = [
        `req-getUserRoles`
    ];
    await CacheService.findAndClear(findAndClearKeys);
	return result;
};

export const deletePatient = async (sessionId: string, patientId: string) => {
	const url = BACKEND_API_URL + `/patients/${patientId}`;
	const result = await delete_(url, true, sessionId);
	const findAndClearKeys = [
        `req-getUserRoles`
    ];
    await CacheService.findAndClear(findAndClearKeys);
	return result;
};


