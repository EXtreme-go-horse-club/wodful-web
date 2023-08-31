import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import {
  ICreateResultRequestDTO,
  IEditResultDTO,
  IResultByCategory,
  IResultData,
} from '@/data/interfaces/result';
import { ResultService } from '@/services/Result';
import { resultMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ResultProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface ResultContextData {
  resultPages: IResultByCategory[];
  result: IResultData;
  isLoading: boolean;
  page: number;
  limit: number;
  ListPaginated: (categoryId: string, name?: string) => void;
  ListPaginatedByWorkout: (categoryId: string, workoutId: string, name?: string) => void;
  setLimit: (value: number) => void;
  setPage: (value: number) => void;
  Delete: (id: string) => Promise<void>;
  Create: (data: ICreateResultRequestDTO) => void;
  Get: (id: string) => Promise<void>;
  Edit: (data: IEditResultDTO) => void;
}

const ResultContext = createContext({} as ResultContextData);

const axios = new AxiosAdapter();

export const ResultProvider = ({ children, onClose }: ResultProps) => {
  const toast = useToast();
  const [resultPages, setResultPages] = useState<IResultByCategory[]>([] as IResultByCategory[]);
  const [page, setPage] = useState<number>(1);
  const [result, setResult] = useState<IResultData>({} as IResultData);
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

  const Get = useCallback(async (id: string) => {
    setIsLoading(true);
    await new ResultService(axios)
      .get(id)
      .then((results) => {
        setResult(results as IResultData);
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

  const Edit = useCallback(
    async ({ id, result, categoryId }: IEditResultDTO) => {
      setIsLoading(true);
      await new ResultService(axios)
        .edit({ id, result })
        .then(() => {
          toast({
            title: resultMessages['success_edit'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(categoryId!);
          onClose!();
        })
        .catch(() => {
          toast({
            title: resultMessages['error_edit'],
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
        result,
        ListPaginated,
        ListPaginatedByWorkout,
        setLimit,
        Get,
        Edit,
        setPage,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export default ResultContext;
