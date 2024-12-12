import { BACKEND_API_URL,API_CLIENT_INTERNAL_KEY } from '$env/static/private';
import {  put_ } from "./common";
export const updateAddress = async (
	sessionId: string,
	addressId: string,
	addressLine: string,
	city: string,
	district: string,
	state: string,
	country: string,
	postalCode: number
) => {
	const body = {
		AddressLine: addressLine,
		City: city ? city : null,
		District: district ? district : null,
		State: state ? state : null,
		Country: country ? country : null,
		PostalCode: postalCode ? postalCode : null
	};
	const url = BACKEND_API_URL + `/addresses/${addressId}`;
	return await put_(url, body, true,sessionId);
};