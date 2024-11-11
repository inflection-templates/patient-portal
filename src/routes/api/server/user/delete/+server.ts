import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils.ts/message.utils';
import { deletePatient } from '$routes/api/services/user';

////////////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId as string;
    
	const data = await event.request.json();
    
	const response = await deletePatient(sessionId, data.patientUserId);

	if (response.Status == 'failure' || response.HttpCode !== 200) {
		throw redirect(errorMessage(response.Message), event);
	}

	throw redirect('/', successMessage(response.Message), event);
};
