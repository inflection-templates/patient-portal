

// for 12 jan 2022 like date
export function formatDateMonth(utcDate: string): string {
        const date = new Date(utcDate);
        return new Intl.DateTimeFormat('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }).format(date);
      }

// for january-2025 lke date
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
  return data.map((item:any) => ({
    value: item[valueKey],
    date: formatDateMonth(item.RecordDate),
    unit: item.Unit
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

// data sampling handling the multiple records on same day
export function handleVitals(vitalData, vitalType) {
    // Group data by date
    const groupedData = {};
    vitalData.forEach((record) => {
      if (!groupedData[record.date]) {
        groupedData[record.date] = [];
      }
      groupedData[record.date].push(record);
    });
  
    // Apply sampling technique (e.g., Simple Random Sampling)
    const sampledData = {};
    Object.keys(groupedData).forEach((date) => {
      const records = groupedData[date];
      const randomIndex = Math.floor(Math.random() * records.length);
      sampledData[date] = records[randomIndex];
    });
  
    // Return sampled data
    return Object.values(sampledData);
  }

 export function sampleDataByDate(data) {
    // Group data by date
    const groupedData = {};
    data.forEach((record) => {
      if (!groupedData[record.date]) {
        groupedData[record.date] = [];
      }
      groupedData[record.date].push(record);
    });
  
    // Select the record with the highest value for each date
    const sampledData = Object.keys(groupedData).map((date) => {
      const records = groupedData[date];
      return records.reduce((maxRecord, record) =>
        record.value > maxRecord.value ? record : maxRecord
      );
    });
  
    return sampledData;
  }
  