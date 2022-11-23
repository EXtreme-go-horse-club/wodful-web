import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import {
  ICreateScheduleRequestDTO,
  IIsLiveDTO,
  IIsOverDTO,
  ISchedule,
} from '@/data/interfaces/schedule';
import { SheduleService } from '@/services/Schedule';
import { activitMessages, resultMessages } from '@/utils/messages';

export interface ScheduleContextData {
  schedulePages: IPageResponse<ISchedule>;
  isLoading: boolean;
  page: number;
  limit: number;
  ListPaginated: (championshipId: string) => void;
  isLive: ({ championshipId, activityId, isLive }: IIsLiveDTO) => void;
  isOver: ({ championshipId, activityId, isOver }: IIsOverDTO) => void;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const ListPaginated = useCallback(
    async (championshipId: string) => {
      setIsLoading(true);
      await new SheduleService(axios)
        .list(championshipId, limit, page)
        .then((paginatedSchedules) => {
          setSchedulePages(paginatedSchedules as IPageResponse<ISchedule>);
        })
        .finally(() => setIsLoading(false));
    },
    [limit, page],
  );

  const Create = useCallback(
    async ({
      date,
      hour,
      categoryId,
      workoutId,
      heat,
      laneQuantity,
    }: ICreateScheduleRequestDTO) => {
      setIsLoading(true);
      await new SheduleService(axios)
        .create({ date, hour, categoryId, workoutId, heat, laneQuantity })
        .then(() => {
          toast({
            title: activitMessages['success'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(id as string);
          onClose!();
        })
        .catch(() => {
          toast({
            title: activitMessages['error'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, id, onClose, toast],
  );

  const isLive = useCallback(
    async ({ championshipId, activityId, isLive }: IIsLiveDTO) => {
      setIsLoading(true);
      await new SheduleService(axios)
        .isLive(championshipId, activityId, isLive)
        .then(() => {
          toast({
            title: isLive ? activitMessages['start'] : activitMessages['stop'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(id as string);
          onClose!();
        })
        .catch(() => {
          toast({
            title: activitMessages['errorStatus'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, id, onClose, toast],
  );

  const isOver = useCallback(
    async ({ championshipId, activityId, isOver }: IIsOverDTO) => {
      setIsLoading(true);
      await new SheduleService(axios)
        .isLive(championshipId, activityId, isOver)
        .then(() => {
          toast({
            title: activitMessages['finishg'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(id as string);
          onClose!();
        })
        .catch(() => {
          toast({
            title: activitMessages['errorStatus'],
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
        isLive,
        isOver,
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
