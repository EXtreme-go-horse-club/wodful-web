import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { ILeaderboard } from '@/data/interfaces/leaderboard';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ICreateResultRequestDTO } from '@/data/interfaces/result';
import { LeaderboardService } from '@/services/Leaderboard';
import { ResultService } from '@/services/Result';
import { resultMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

interface LeaderboardProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface LeaderboardContextData {
  leaderboardPages: IPageResponse<ILeaderboard>;
  isLoading: boolean;
  page: number;
  limit: number;
  ListPaginated: (id: string) => void;
  setLimit: (value: number) => void;
  setPage: (value: number) => void;
  Create: (data: ICreateResultRequestDTO) => void;
}

const LeaderboardContext = createContext({} as LeaderboardContextData);

const axios = new AxiosAdapter();

export const LeaderboardProvider = ({ children, onClose }: LeaderboardProps) => {
  const { id } = useParams();
  const toast = useToast();
  const [leaderboardPages, setLeaderboardsPages] = useState<IPageResponse<ILeaderboard>>(
    {} as IPageResponse<ILeaderboard>,
  );
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ListPaginated = useCallback(
    async (id: string) => {
      setIsLoading(true);
      await new LeaderboardService(axios)
        .list(id, '911644ff-cd7a-4b58-9010-31272cf60c3f', limit, page)
        .then((paginatedLeaderboards) => {
          setLeaderboardsPages(paginatedLeaderboards as IPageResponse<ILeaderboard>);
        })
        .finally(() => setIsLoading(false));
    },
    [limit, page],
  );

  const Create = useCallback(
    async ({ workoutId, subscriptionId, result }: ICreateResultRequestDTO) => {
      setIsLoading(true);
      await new ResultService(axios)
        .create({ workoutId, subscriptionId, result })
        .then(() => {
          toast({
            title: resultMessages['success'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(String(id));
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

  return (
    <LeaderboardContext.Provider
      value={{
        isLoading,
        Create,
        limit,
        page,
        leaderboardPages,
        ListPaginated,
        setLimit,
        setPage,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};

export default LeaderboardContext;
