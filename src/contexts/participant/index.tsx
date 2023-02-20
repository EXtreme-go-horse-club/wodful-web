import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { IParticipant, IParticipants } from '@/data/interfaces/participant';
import { ParticipantsService } from '@/services/Participants';
import { participantMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';

interface TicketProviderProps {
  children: React.ReactNode;
}

export interface ParticipantContextData {
  participantsPages: IPageResponse<IParticipants>;
  isLoading: boolean;
  isError: boolean;
  limit: number;
  setLimit: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  ListPaginated: (id: string | null, name?: string) => Promise<void>;
  Edit(
    { id, affiliation, city, identificationCode, name, tShirtSize }: IParticipant,
    idChampionship: string,
  ): Promise<void>;
}

const ParticipantContext = createContext({} as ParticipantContextData);

const axios = new AxiosAdapter();

export const ParticipantProvider = ({ children }: TicketProviderProps) => {
  const toast = useToast();
  const [participantsPages, setParticipantsPages] = useState<IPageResponse<IParticipants>>(
    {} as IPageResponse<IParticipants>,
  );
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError] = useState<boolean>(false);

  const ListPaginated = useCallback(
    async (id: string | null, name?: string) => {
      setIsLoading(true);
      await new ParticipantsService(axios)
        .listAll(id, limit, page, name)
        .then((paginatedParticipants) => {
          setParticipantsPages(paginatedParticipants as IPageResponse<IParticipants>);
        })
        .finally(() => setIsLoading(false));
    },
    [limit, page],
  );

  const Edit = useCallback(
    async (
      { id, affiliation, city, identificationCode, name, tShirtSize }: IParticipant,
      idChampionship: string,
    ) => {
      setIsLoading(true);
      await new ParticipantsService(axios)
        .edit({ id, affiliation, city, identificationCode, name, tShirtSize })
        .then(() => {
          toast({
            title: participantMessages['success_edit'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(idChampionship);
        })
        .catch(() => {
          toast({
            title: participantMessages['errorEdit'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [toast, ListPaginated],
  );

  return (
    <ParticipantContext.Provider
      value={{
        participantsPages,
        isLoading,
        isError,
        limit,
        page,
        setLimit,
        setPage,
        Edit,
        ListPaginated,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};

export default ParticipantContext;
