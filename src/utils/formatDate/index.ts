import { format } from 'date-fns';

export const formatDate = (date: Date | string) => {
  return format(new Date(date), 'dd/MM/yyyy');
};

export const formatHour = (date: Date | string) => {
  return format(new Date(date), 'hh:mm');
};
