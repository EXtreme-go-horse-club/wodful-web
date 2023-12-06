import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import {
  ChampionshipDTO,
  IChampionship,
  IChampionshipEditDTO,
} from '@/data/interfaces/championship';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ChampionshipService } from '@/services/Championship';
import { championshipMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';

interface ChampionshipProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface ChampionshipContextData {
  championships: IChampionship[];
  championshipsPages: IPageResponse<IChampionship>;
  isLoading: boolean;
  isError: boolean;
  page: number;
  limit: number;
  setPage: (value: number) => void;
  ListPaginated: () => void;
  Delete: (id: string) => Promise<void>;
  Activate: (id: string) => Promise<void>;
  Deactivate: (id: string) => Promise<void>;
  List: () => Promise<void>;
  Create({
    name,
    startDate,
    endDate,
    accessCode,
    banner,
    resultType,
    address,
    description,
  }: ChampionshipDTO): Promise<void>;
  Edit({
    championshipId,
    name,
    startDate,
    endDate,
    accessCode,
    address,
    description,
  }: IChampionshipEditDTO): Promise<void>;
}

const ChampionshipContext = createContext({} as ChampionshipContextData);

const axios = new AxiosAdapter();

export const ChampionshipProvider = ({ children, onClose }: ChampionshipProps) => {
  const toast = useToast();

  const [championshipsPages, setChampionshipsPages] = useState<IPageResponse<IChampionship>>(
    {} as IPageResponse<IChampionship>,
  );

  const [page, setPage] = useState<number>(1);
  const limit = 6;
  const [championships, setChampionships] = useState<IChampionship[]>([] as IChampionship[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const List = useCallback(async () => {
    setIsLoading(true);
    await new ChampionshipService(axios)
      .listAll()
      .then((allChampionships) => {
        setIsError(false);
        setChampionships(allChampionships as IChampionship[]);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const ListPaginated = useCallback(async () => {
    setIsLoading(true);
    await new ChampionshipService(axios)
      .listAll(limit, page)
      .then((paginatedChampiships) => {
        setChampionshipsPages(paginatedChampiships as IPageResponse<IChampionship>);
      })
      .finally(() => setIsLoading(false));
  }, [page]);

  const Create = useCallback(
    async ({
      name,
      startDate,
      endDate,
      accessCode,
      banner,
      resultType,
      address,
      description,
    }: ChampionshipDTO) => {
      setIsLoading(true);
      await new ChampionshipService(axios)
        .create({ name, startDate, endDate, accessCode, banner, resultType, address, description })
        .then(() => {
          toast({
            title: championshipMessages['success'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated();
          onClose!();
        })
        .catch(() => {
          toast({
            title: championshipMessages['error'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [onClose, toast, ListPaginated],
  );

  const Edit = useCallback(
    async ({
      championshipId,
      name,
      startDate,
      endDate,
      accessCode,
      address,
      description,
    }: IChampionshipEditDTO) => {
      setIsLoading(true);
      await new ChampionshipService(axios)
        .edit({ championshipId, name, startDate, endDate, accessCode, address, description })
        .then(() => {
          toast({
            title: championshipMessages['success_edit'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated();
          onClose!();
        })
        .catch(() => {
          toast({
            title: championshipMessages['error'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [onClose, toast, ListPaginated],
  );

  const Delete = useCallback(
    async (idChamp: string) => {
      setIsLoading(true);
      await new ChampionshipService(axios)
        .delete(idChamp)
        .then(() => {
          toast({
            title: championshipMessages['remove'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated();
        })
        .catch(() => {
          toast({
            title: championshipMessages['remove_err'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, toast],
  );

  const Activate = useCallback(
    async (idChamp: string) => {
      setIsLoading(true);
      await new ChampionshipService(axios)
        .activate(idChamp)
        .then(() => {
          toast({
            title: championshipMessages['success_activate'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated();
        })
        .catch(() => {
          toast({
            title: championshipMessages['error_activate'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, toast],
  );
  const Deactivate = useCallback(
    async (idChamp: string) => {
      setIsLoading(true);
      await new ChampionshipService(axios)
        .deactivate(idChamp)
        .then(() => {
          toast({
            title: championshipMessages['success_deactivate'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated();
        })
        .catch(() => {
          toast({
            title: championshipMessages['error_deactivate'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, toast],
  );

  return (
    <ChampionshipContext.Provider
      value={{
        championships,
        championshipsPages,
        isLoading,
        isError,
        limit,
        page,
        setPage,
        Create,
        Edit,
        Delete,
        List,
        ListPaginated,
        Activate,
        Deactivate,
      }}
    >
      {children}
    </ChampionshipContext.Provider>
  );
};

export default ChampionshipContext;
