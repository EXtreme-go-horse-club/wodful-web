import { format } from 'date-fns';

export const formatDate = (date: Date | string, mask = 'dd/MM/yyyy') => {
  return format(new Date(date), mask);
};

export const formatHour = (date: Date | string) => {
  return format(new Date(date), 'hh:mm');
};
