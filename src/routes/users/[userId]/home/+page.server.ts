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
    // Filter for completed tasks only
    const completedItems = items.filter(item => item.Status === 'Completed');

    // Group data by date and category
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

    // Get sorted dates
    const sortedDates = Object.keys(categoryCountsByDate)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    // Get unique categories
    const categories = Array.from(new Set(completedItems.map(item => item.Category)));

    // Prepare datasets
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
    
    const response = await getUserTasks(sessionId, {
        userId: event.params.userId as string,
        status: 'completed',
    });

    if (response.Status === 'failure' || response.HttpCode !== 200) {
        throw error(response.HttpCode, response.Message || 'An error occurred');
    }

    const userTasks = response.Data.UserTasks;
    const chartData = processChartData(userTasks.Items);

    return {
        userTasks,
        sessionId,
        chartData
    };
};