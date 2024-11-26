import { error, type ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getUserTasks } from "$routes/api/services/user.task";

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
    const sessionId = event.cookies.get('sessionId') as string;
    
    let itemsPerPage = 10;
    let response;
    const searchParams = {
        userId: event.params.userId as string,
        ActionType: 'CarePlan',
        itemsPerPage: itemsPerPage 
    }
    
    response = await getUserTasks(sessionId, searchParams);
    console.log(response);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message || 'An error occurred');
    }

    const userTasks = response.Data.UserTasks;
    console.log(userTasks);

    // if (userTasks.TotalCount > itemsPerPage) {
    //     itemsPerPage = userTasks.TotalCount;
    //     response = await getUserTasks(sessionId, searchParams);
    // }

    // const chartData = processChartData(userTasks.Items);

    return {
        userTasks,
        sessionId,
    };
};