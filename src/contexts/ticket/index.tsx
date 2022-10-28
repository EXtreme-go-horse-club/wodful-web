import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ITicket, TicketDTO } from '@/data/interfaces/ticket';
import { TicketService } from '@/services/Ticket';
import { ticketMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';

interface TicketProviderProps {
  children: React.ReactNode;
  onClose: () => void;
}

export interface TicketContextData {
  tickets: ITicket[];
  ticketsPages: IPageResponse<ITicket>;
  isLoading: boolean;
  isError: boolean;
  limit: number;
  setLimit: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  ListPaginated: (id: string) => Promise<void>;
  List: (id: string) => Promise<void>;
  Create: ({
    name,
    description,
    startDate,
    endDate,
    price,
    quantity,
    categoryId,
  }: TicketDTO) => Promise<void>;
}

const TicketContext = createContext({} as TicketContextData);

const axios = new AxiosAdapter();

export const TicketProvider = ({ children, onClose }: TicketProviderProps) => {
  const toast = useToast();
  const [ticketsPages, setTicketsPages] = useState<IPageResponse<ITicket>>(
    {} as IPageResponse<ITicket>,
  );
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [tickets, setTickets] = useState<ITicket[]>([] as ITicket[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const Create = useCallback(
    async ({ name, description, startDate, endDate, price, quantity, categoryId }: TicketDTO) => {
      setIsLoading(true);
      await new TicketService(axios)
        .create({
          name,
          description,
          startDate,
          endDate,
          price,
          quantity,
          categoryId,
        })
        .then((newTicket: ITicket) => {
          toast({
            title: ticketMessages['success'],
            status: 'success',
            isClosable: true,
          });
          setTickets((tickets) => [...tickets, newTicket]);
          onClose();
        })
        .catch(() => {
          toast({
            title: ticketMessages['error'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [],
  );

  const List = useCallback(async (id: string) => {
    setIsLoading(true);
    await new TicketService(axios)
      .listAll(id)
      .then((allTickets) => {
        setTickets(allTickets as ITicket[]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const ListPaginated = useCallback(
    async (id: string) => {
      setIsLoading(true);
      await new TicketService(axios)
        .listAll(id, limit, page)
        .then((paginatedTickets) => {
          setTicketsPages(paginatedTickets as IPageResponse<ITicket>);
        })
        .finally(() => setIsLoading(false));
    },
    [limit, page],
  );

  return (
    <TicketContext.Provider
      value={{
        tickets,
        ticketsPages,
        isLoading,
        isError,
        limit,
        page,
        setLimit,
        setPage,
        Create,
        List,
        ListPaginated,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export default TicketContext;
