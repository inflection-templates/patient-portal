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
  return data.map((item:any) => ({
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


 export function sampleDataByDate(data) {
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
  