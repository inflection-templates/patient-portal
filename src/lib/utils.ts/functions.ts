export function formatDateMonth(utcDate: string): string {
	const date = new Date(utcDate);
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	}).format(date);
}

export function formatMonthLabel(utcDate: string): string {
	const date = new Date(utcDate);
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric'
	}).format(date);
}

export function formatDate(utcDate: string): string {
	const date = new Date(utcDate);
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	}).format(date);
}

export function formatData(data: any, valueKey: any) {
	if (!data || !Array.isArray(data) || data.length === 0) {
		return [];
	}

	return data.map((item: any) => ({
		value: item[valueKey] || null,
		date: formatDateMonth(item.RecordDate) || 'Unknown Date',
		unit: item.Unit || '' //
	}));
}

export function formatBloodPressureData(data: any, valueKey1: any, valueKey2: any) {
	return data.map((item: any) => ({
		value: item[valueKey1],
		value1: item[valueKey2],
		date: formatDateMonth(item.RecordDate),
		unit: item.Unit
	}));
}

export function handleVitals(vitalData: any[], vitalType: string) {
	if (!vitalData || vitalData.length === 0) {
		return [];
	}
	const groupedData: Record<string, any[]> = {};
	vitalData.forEach((record) => {
		if (!groupedData[record.date]) {
			groupedData[record.date] = [];
		}
		groupedData[record.date].push(record);
	});
	const sampledData: Record<string, any> = {};
	Object.keys(groupedData).forEach((date) => {
		const records = groupedData[date];
		const randomIndex = Math.floor(Math.random() * records.length);
		sampledData[date] = records[randomIndex];
	});
	return Object.values(sampledData);
}

export function sampleDataByDate(data: any) {
	const groupedData = {};
	data.forEach((record) => {
		if (!groupedData[record.date]) {
			groupedData[record.date] = [];
		}
		groupedData[record.date].push(record);
	});
	const sampledData = Object.keys(groupedData).map((date) => {
		const records = groupedData[date];
		return records.reduce((maxRecord, record) =>
			record.value > maxRecord.value ? record : maxRecord
		);
	});

	return sampledData;
}

export function getInitials(name: any) {
	return name
		.split(' ')
		.map((word) => word[0].toUpperCase())
		.join('');
}
export function separatePhoneNumber(phoneNumber: string | null) {
	if (!phoneNumber) {
		return { countryCode: null, mobileNumber: null };
	}

	const regex = /^\+(\d+)-(\d+)$/;
	const match = phoneNumber.match(regex);

	if (match) {
		const countryCode = `+${match[1]}`;
		const mobileNumber = match[2];
		return { countryCode, mobileNumber };
	} else {
		return { countryCode: null, mobileNumber: null };
	}
}

export function isValidEmail(emailval) {
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return regex.test(emailval);
}
export function formatBirthdate(isoDateString) {
	if (!isoDateString) {
		return 'No birthdate provided';
	}

	const date = new Date(isoDateString);

	if (isNaN(date.getTime())) {
		return 'Invalid date format';
	}

	const day = String(date.getUTCDate()).padStart(2, '0');
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const year = date.getUTCFullYear();

	return `${day}-${month}-${year}`;
}

interface Action {
	Frequency: number;
}

interface Task {
	Status: string;
	Action?: Action;
}

interface GroupedData {
	[key: number]: {
		scheduled: number;
		completed: number;
	};
}

export function getDayWiseData(tasks: Task[]): GroupedData {
	const dayWiseData: GroupedData = {};

	tasks.forEach((task) => {
		const frequency: number | undefined = task?.Action?.Frequency;
		if (frequency !== undefined) {
			const dayKey = `Day ${frequency}`;
			if (!dayWiseData[dayKey]) {
				dayWiseData[dayKey] = { scheduled: 0, completed: 0 };
			}
			dayWiseData[dayKey].scheduled++;
			if (task.Status === 'Completed') {
				dayWiseData[dayKey].completed++;
			}
		}
	});

	return dayWiseData;
}

export function getWeekWiseData(tasks: Task[]): GroupedData {
	const weekWiseData: GroupedData = {};
	tasks.forEach((task) => {
		const frequency: number | undefined = task?.Action?.Frequency;
		if (frequency !== undefined) {
			const weekNumber: number = Math.ceil(frequency / 7);
			const weekKey = `Week ${weekNumber}`;
			if (!weekWiseData[weekKey]) {
				weekWiseData[weekKey] = { scheduled: 0, completed: 0 };
			}
			weekWiseData[weekKey].scheduled++;
			if (task.Status === 'Completed') {
				weekWiseData[weekKey].completed++;
			}
		}
	});

	return weekWiseData;
}
