import moment from 'moment';

export function getColor(index: number) {
  const COLORS = ['#8783d1', '#aa9aba', '#bfa4a4', '#d1abad', '#e3b9bc'];
  return COLORS[index % COLORS.length];
}

export function getUsagePercentage(currentUsage: number, limit: number) {
  return Math.min(Math.floor((currentUsage / limit) * 100), 100);
}

export function getUsageProgressColor(currentUsage: number) {
  const usagePercentageWarningThreshold = 70;
  let barColor: 'primary' | 'warning' | 'error';
  if (currentUsage < usagePercentageWarningThreshold) {
    barColor = 'primary';
  } else if (currentUsage < 100) {
    barColor = 'warning';
  } else {
    barColor = 'error';
  }

  return barColor;
}

export const diffInDays = (endDate?: Date | null): number => {
  if (!endDate) {
    return 0;
  }

  return moment(endDate).diff(moment(new Date()), 'days', false) + 1;
};
