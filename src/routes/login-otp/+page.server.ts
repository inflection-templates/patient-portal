import { type RequestEvent, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { loginWithOtp } from '../api/services/user';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils.ts/message.utils';
import { formData } from 'zod-form-data';

export const load:PageServerLoad = async (event: RequestEvent) => {
    let phone = event.url.searchParams.get('phone')
    if (!phone) {
        throw error(500,'Invalid url')
    }
    return {
        phone : phone,
    }
}

export const actions = {
	login: async (event: RequestEvent) => {
		const request = event.request;
        const data = Object.fromEntries(await request.formData());; // or .json(), or .text(), etc
        console.log('Form Data Input', formData);
        const otp = data.otp as string;
        const phone = data.phone as string;
        console.log('OTPPP: ' + otp);
        const response = await loginWithOtp(otp, phone);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            console.log(response.Message);
            //Login error, so redirect to the sign-in page
            throw redirect(303, '/', errorMessage('Incorrect OTP. Please try again.'), event);
        }

        const user = response.Data.User;
        user.SessionId = response.Data.SessionId;
      
        const userId: string = response.Data.User.id;

        console.log("response",response)

        if (user.Role.RoleName !== 'Patient') {
            throw redirect(303, `/`, errorMessage(`Unsupported user role!`), event);
        }

       

        throw redirect(303, `/dashboard`, successMessage(`Login successful!`), event);
	}
};

