import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ICreateResultRequestDTO, IResultByCategory } from '@/data/interfaces/result';
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
  resultPages: IPageResponse<IResultByCategory>;
  isLoading: boolean;
  page: number;
  limit: number;
  ListPaginated: (categoryId: string) => void;
  setLimit: (value: number) => void;
  setPage: (value: number) => void;
  Delete: (id: string) => Promise<void>;
  Create: (data: ICreateResultRequestDTO) => void;
}

const ResultContext = createContext({} as ResultContextData);

const axios = new AxiosAdapter();

export const ResultProvider = ({ children, onClose }: ResultProps) => {
  const toast = useToast();
  const [resultPages, setResultPages] = useState<IPageResponse<IResultByCategory>>(
    {} as IPageResponse<IResultByCategory>,
  );
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams();

  const ListPaginated = useCallback(
    async (categoryId: string) => {
      setIsLoading(true);
      await new ResultService(axios)
        .listByCategory(categoryId, limit, page)
        .then((paginatedResults) => {
          setResultPages(paginatedResults as IPageResponse<IResultByCategory>);
        })
        .finally(() => setIsLoading(false));
    },
    [limit, page],
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
        setLimit,
        setPage,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export default ResultContext;
