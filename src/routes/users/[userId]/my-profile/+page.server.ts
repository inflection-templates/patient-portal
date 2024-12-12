import { getPatientById, updatePatientById } from '$routes/api/services/user';
import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { string } from 'zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { countryCode } from '$lib/components/country.code.svelte';
import { updateAddress } from '$routes/api/services/address';

const itemsPerPage = 100;
export const load: PageServerLoad = async (event: RequestEvent) => {
	try {
		const sessionId = event.cookies.get('sessionId');
		const userId = event.params.userId;

		// const searchParams = {
		// 	userId: event.params.userId as string,
		// 	itemsPerPage: itemsPerPage
		// }
		const response = await getPatientById(sessionId, userId);
		const healthProfile = response.Data;
		// console.log('response', JSON.stringify(response.Data));
		return {
			healthProfile,
			sessionId
		};
	} catch (error) {
		console.error(`Error retriving Vitals: ${error}`);
	}
};

const updateUserProfile = zfd.formData({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	gender: z.string().optional(),
	birthDate: z.string().optional(),
	maritalStatus: z.string().optional(),
	email: z.string().optional(),
	countryCode: z.string().optional(),
	phone: z.string().optional(),
	race: z.string().optional(),
	ethnicity: z.string().optional(),
	strokeSurvivorOrCaregiver: z.string().optional(),
	workedPriorToStroke: z
		.union([
			z.boolean(),
			z.enum(['true', 'false']).transform((val) => (val === 'false' ? false : true))
		])
		.optional(),
	livingAlone: z
		.union([
			z.boolean(),
			z.enum(['true', 'false']).transform((val) => (val === 'false' ? false : true))
		])
		.optional(),
	addressId: z.string().optional(),
	addressLine: z.string().optional(),
	city: z.string().optional(),
	district: z.string().optional(),
	state: z.string().optional(),
	country: z.string().optional(),
	postalCode: z.string().optional(),
	imageResourceId: z.string().optional()
});

export const actions = {
	updateprofile: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		console.log('############################in the update profile action');
		type updateProfileSchema = z.infer<typeof updateUserProfile>;
		let result: updateProfileSchema = {};

		try {
			console.log('******before processing', formData.email);

			result = updateUserProfile.parse(formData);
			console.log("after validation")
			
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		// const addressResponse = await updateAddress(
		// 	sessionId,
		// 	result.addressId,
		// 	result.addressLine,
		// 	result.city,
		// 	result.district,
		// 	result.state,
		// 	result.country,
		// 	result.postalCode
		// )

		const phone = result.countryCode + '-' + result.phone;
		const response = await updatePatientById(
			sessionId,
			userId,
			result.firstName,
			result.lastName,
			result.gender,
			result.birthDate,
			result.maritalStatus,
			result.email,
			phone,
			result.race,
			result.ethnicity,
			result.strokeSurvivorOrCaregiver,
			result.workedPriorToStroke,
			result.livingAlone,
			result.addressLine,
			result.city,
			result.district,
			result.state,
			result.country,
			result.postalCode,
			result.imageResourceId
		);
	}
};
