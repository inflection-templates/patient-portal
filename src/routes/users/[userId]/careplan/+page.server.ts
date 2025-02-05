import { error, type ServerLoadEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import {getUserTasks } from "$routes/api/services/user.task";
import { formatDate, getDayWiseData, getWeekWiseData } from "$lib/utils.ts/functions";
// import { formatDate} from "$lib/utils.ts/functions";
// import { getPatientStatistics } from "$routes/api/services/statistics";

///////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
    const sessionId = event.cookies.get('sessionId') as string;
    const userId = event.params.userId as string;
    let itemsPerPage = 500;
    
    const searchParams = {
        userId: userId,
        ActionType: 'CarePlan',
        itemsPerPage: itemsPerPage 
    };
    
    let response = await getUserTasks(sessionId, searchParams);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message || 'An error occurred');
    }

    let userTasks = response.Data.UserTasks.Items;

    // Ensure we have all items
    if (userTasks.TotalCount > itemsPerPage) {
        itemsPerPage = userTasks.TotalCount;
        response = await getUserTasks(sessionId, searchParams);
        userTasks = response.Data.UserTasks.Items;
    }  

    // Group tasks by plan code
    const careplanTasks_ = userTasks.reduce((groupedTasks, task) => {
        const planCode = task?.Action?.PlanCode;
        if (planCode) {
            if (!groupedTasks[planCode]) {
                groupedTasks[planCode] = [];
            }
            groupedTasks[planCode].push({
                ...task,
                ScheduledStartTime: task.ScheduledStartTime || task.Action?.ScheduledAt,
                Status: task.Status || 'Delayed'  // Default to 'Delayed' if status is missing
            });
        }
        return groupedTasks;
    }, {});

    // Get first plan's tasks
    const firstPlanCode = Object.keys(careplanTasks_)[0];
    const firstPlanCodeTasks = firstPlanCode ? careplanTasks_[firstPlanCode] : [];
    
    // Sort tasks by frequency
    const careplanTasks = firstPlanCodeTasks.sort((a, b) => {
        const freqA = a?.Action?.Frequency || 0;
        const freqB = b?.Action?.Frequency || 0;
        return freqA - freqB;
    });

    // Process start and end dates
    const { startDate, endDate } = getStartAndEndDates(careplanTasks);

    console.log('Returning data:', {
        numPlans: Object.keys(careplanTasks_).length,
        numTasks: careplanTasks.length,
        firstPlanCode,
        startDate,
        endDate
    });

    return {
        sessionId,
        careplanTasks,
        startDate,
        endDate,
        careplanTasks_
    };
};

function getStartAndEndDates(tasks) {
    if (!tasks || tasks.length === 0) {
        return { startDate: null, endDate: null };
    }
    
    const validTasks = tasks.filter(task => 
        task?.Action?.ScheduledAt || task.ScheduledStartTime
    );
    
    if (validTasks.length === 0) {
        return { startDate: null, endDate: null };
    }

    const startTask = validTasks[0];
    const endTask = validTasks[validTasks.length - 1];
    
    const startDate = formatDate(startTask.Action?.ScheduledAt || startTask.ScheduledStartTime);
    const endDate = formatDate(endTask.Action?.ScheduledAt || endTask.ScheduledStartTime);
    
    return { startDate, endDate };
}

function separateData(data) {
    const labels = Object.keys(data);
    const scheduled = labels.map((label) => data[label].scheduled);
    const completed = labels.map((label) => data[label].completed);
    return { labels, scheduled, completed };
}


