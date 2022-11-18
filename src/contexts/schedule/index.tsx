import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ICreateScheduleRequestDTO, ISchedule } from '@/data/interfaces/schedule';
import { SheduleService } from '@/services/Schedule';
import { resultMessages } from '@/utils/messages';

export interface ScheduleContextData {
  schedulePages: IPageResponse<ISchedule>;
  isLoading: boolean;
  page: number;
  limit: number;
  ListPaginated: (id: string, categoryId?: string) => void;
  setLimit: (value: number) => void;
  setPage: (value: number) => void;
  Create: ({ workoutId, categoryId, date, hour, laneQuantity }: ICreateScheduleRequestDTO) => void;
  Delete: (value: string) => void;
}

export const ScheduleContext = createContext({} as ScheduleContextData);

const axios = new AxiosAdapter();

interface ScheduleProviderProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const ScheduleProvider = ({ children, onClose }: ScheduleProviderProps) => {
  const toast = useToast();
  const [schedulePages, setSchedulePages] = useState<IPageResponse<ISchedule>>(
    {} as IPageResponse<ISchedule>,
  );
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [schedules, setSchedules] = useState<ISchedule[]>([] as ISchedule[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const ListPaginated = useCallback(
    async (champId: string, categoryId?: string) => {
      setIsLoading(true);
      await new SheduleService(axios)
        .list(champId, categoryId as string, limit, page)
        .then((paginatedSchedules) => {
          setSchedulePages(paginatedSchedules as IPageResponse<ISchedule>);
        })
        .finally(() => setIsLoading(false));
    },
    [limit, page],
  );

  const Create = useCallback(
    async ({ workoutId, categoryId, date, hour, laneQuantity }: ICreateScheduleRequestDTO) => {
      setIsLoading(true);
      await new SheduleService(axios)
        .create({ workoutId, categoryId, date, hour, laneQuantity })
        .then(() => {
          toast({
            title: resultMessages['success'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(id as string, categoryId);
          onClose!();
        })
        .catch(() => {
          toast({
            title: resultMessages['error'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, id, onClose, toast],
  );

  const Delete = useCallback(
    async (idCat: string) => {
      await new SheduleService(axios)
        .delete(idCat)
        .then(() => {
          toast({
            title: resultMessages['remove'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(id as string);
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, id, toast],
  );

  return (
    <ScheduleContext.Provider
      value={{
        schedulePages,
        isLoading,
        page,
        limit,
        ListPaginated,
        setLimit,
        setPage,
        Delete,
        Create,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;
