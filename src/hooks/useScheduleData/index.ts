import ScheduleContext, { ScheduleContextData } from '@/contexts/schedule';
import { useContext } from 'react';

const useScheduleData = (): ScheduleContextData => {
  const context = useContext<ScheduleContextData>(ScheduleContext);

  return context;
};

export default useScheduleData;
