import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IPublicSchedule } from '@/data/interfaces/schedule';
import { PublicScheduleService } from '@/services/Public/Schedule';
import { createContext, useCallback, useState } from 'react';

interface ScheduleProviderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface ScheduleContextData {
  isLoading: boolean;
  schedules: IPublicSchedule[];
  PublicList: (code: string) => Promise<void>;
}

const ScheduleContext = createContext({} as ScheduleContextData);

const axios = new AxiosAdapter();

export const ScheduleProvider = ({ children, onClose }: ScheduleProviderProps) => {
  const [schedules, setSchedules] = useState<IPublicSchedule[]>([] as IPublicSchedule[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const PublicList = useCallback(async (code: string) => {
    setIsLoading(true);
    await new PublicScheduleService(axios)
      .list(code)
      .then((schedules) => {
        setSchedules(schedules as IPublicSchedule[]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        isLoading,
        PublicList,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;
