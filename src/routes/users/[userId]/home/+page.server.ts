import type { ServerLoadEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUserTasks } from '$routes/api/services/user.task';
import { format } from 'date-fns';
import type { ProcessedChartData } from '$lib/utils.ts/chart.config';

////////////////////////////////////////////////////////////////////////////////////////////////////
interface UserTask {
    Status: string;
    FinishedAt: string;
    Category: string;
}

function processChartData(items: UserTask[]): ProcessedChartData {
    const completedItems = items.filter(item => item.Status === 'Completed');
    const categoryCountsByDate = completedItems.reduce((acc, item) => {
        const date = new Date(item.FinishedAt);
        const dateStr = format(date, 'yyyy-MM-dd');
        
        if (!acc[dateStr]) {
            acc[dateStr] = {};
        }
        
        const category = item.Category;
        if (!acc[dateStr][category]) {
            acc[dateStr][category] = 1;
        } else {
            acc[dateStr][category]++;
        }
        
        return acc;
    }, {} as Record<string, Record<string, number>>);

    const sortedDates = Object.keys(categoryCountsByDate)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const categories = Array.from(new Set(completedItems.map(item => item.Category)));

    const datasets = categories.map(category => {
        const data = sortedDates
            .map(date => ({
                x: date,
                y: categoryCountsByDate[date][category] || 0
            }))
            .filter(point => point.y > 0);

        return {
            label: category,
            data
        };
    });

    return { datasets };
}

export const load: PageServerLoad = async (event: ServerLoadEvent) => {
    const sessionId = event.cookies.get('sessionId') as string;
    
    let itemsPerPage = 500;
    let response;
    const searchParams = {
        userId: event.params.userId as string,
        status: 'completed',
        itemsPerPage: itemsPerPage 
    }
    
    response = await getUserTasks(sessionId, searchParams);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message || 'An error occurred');
    }

    const userTasks = response.Data.UserTasks;
    console.log(userTasks);

    if (userTasks.TotalCount > itemsPerPage) {
        itemsPerPage = userTasks.TotalCount;
        response = await getUserTasks(sessionId, searchParams);
    }

    const chartData = processChartData(userTasks.Items);

    return {
        userTasks,
        sessionId,
        chartData
    };
};