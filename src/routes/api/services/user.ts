import { BACKEND_API_URL } from '$env/static/private';
import { post_, get_, delete_ } from './common';

///////////////////////////////////////////////////////////////////////////////

export const generateOtp = async (phone: string, purpose?: string, loginRoleId?: number) => {
	const url = BACKEND_API_URL + `/users/generate-otp`;
	phone = '+' + phone;
	const body = {
		Phone: phone,
		Purpose: purpose ? purpose : 'Login',
		RoleId: loginRoleId ? loginRoleId : 3
	};
	return await post_(url, body);
};

export const loginWithOtp = async (otp: string, phone: string, loginRoleId: number = 3) => {
	const url = BACKEND_API_URL + `/users/login-with-otp`;
	const body = {
		Phone: `+${phone}`,
		Otp: otp,
		LoginRoleId: loginRoleId ?? 3
	};
	return await post_(url, body);
};

export const getPatientById = async (sessionId: string, patientId: string) => {
	const url = BACKEND_API_URL + `/patients/${patientId}`;
	return await get_(url, true, sessionId);
};

export const logout = async (sessionId: string) => {
	const url = BACKEND_API_URL + `/users/logout`;
	return await post_(url, {}, true, sessionId);
};

export const deletePatient = async (sessionId: string, patientId: string) => {
	const url = BACKEND_API_URL + `/patients/${patientId}`;
	return await delete_(url, true, sessionId);
};


