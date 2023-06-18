import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { ICreateResultRequestDTO, IResultByCategory } from '@/data/interfaces/result';
import { ResultService } from '@/services/Result';
import { resultMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ResultProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface ResultContextData {
  resultPages: IResultByCategory[];
  isLoading: boolean;
  page: number;
  limit: number;
  ListPaginated: (categoryId: string, name?: string) => void;
  ListPaginatedByWorkout: (categoryId: string, workoutId: string, name?: string) => void;
  setLimit: (value: number) => void;
  setPage: (value: number) => void;
  Delete: (id: string) => Promise<void>;
  Create: (data: ICreateResultRequestDTO) => void;
}

const ResultContext = createContext({} as ResultContextData);

const axios = new AxiosAdapter();

const ResultProvider = ({ children, onClose }: ResultProps) => {
  const toast = useToast();
  const [resultPages, setResultPages] = useState<IResultByCategory[]>([] as IResultByCategory[]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const ListPaginated = useCallback(async (categoryId: string, name?: string) => {
    setIsLoading(true);
    await new ResultService(axios)
      .listByCategory(categoryId, name)
      .then((results) => {
        setResultPages(results as IResultByCategory[]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const ListPaginatedByWorkout = useCallback(
    async (categoryId: string, workoutId: string, name?: string) => {
      setIsLoading(true);
      await new ResultService(axios)
        .listByCategoryAndWorkout(categoryId, workoutId, name)
        .then((results) => {
          setResultPages(results as IResultByCategory[]);
        })
        .finally(() => setIsLoading(false));
    },
    [],
  );

  const Create = useCallback(
    async ({ workoutId, subscriptionId, result, categoryId }: ICreateResultRequestDTO) => {
      setIsLoading(true);
      await new ResultService(axios)
        .create({ workoutId, subscriptionId, result, categoryId })
        .then(() => {
          toast({
            title: resultMessages['success'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(categoryId);
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
    [ListPaginated, onClose, toast],
  );

  const Delete = useCallback(
    async (idCat: string) => {
      setIsLoading(true);
      await new ResultService(axios)
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
    <ResultContext.Provider
      value={{
        isLoading,
        Create,
        Delete,
        limit,
        page,
        resultPages,
        ListPaginated,
        ListPaginatedByWorkout,
        setLimit,
        setPage,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const ResultProviderMemo = memo(ResultProvider);

export default ResultContext;
