

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