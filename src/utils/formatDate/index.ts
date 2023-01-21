import { addDays, format } from 'date-fns';

export const formatDate = (date: Date | string, mask = 'dd/MM/yyyy') => {
  return format(new Date(date), mask);
};

export const incrementAndFormatDate = (date: Date | string, mask = 'dd/MM/yyyy') => {
  const result = addDays(new Date(date), 1);
  return format(result, mask);
};

export const formatHour = (date: Date | string) => {
  return format(new Date(date), 'hh:mm');
};
