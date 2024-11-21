import type {  ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserTasks } from '$routes/api/services/user.task';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
	const sessionId  = event.cookies.get('sessionId') as string;
    const response = await getUserTasks(sessionId, {
        userId: event.params.userId as string,
        status: 'completed'
    });
    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message);
    }
    const userTasks = response.Data.UserTasks;
    console.log('userTasks: ' + JSON.stringify(userTasks, null, 2));
    return {
        userTasks,
        sessionId
    };
};
