import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { ITicket, TicketChampionshipDTO } from '@/data/interfaces/ticket';
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
  isLoading: boolean;
  isError: boolean;
  List: (id: string) => Promise<void>;
  Create: ({
    name,
    description,
    startDate,
    endDate,
    price,
    quantity,
    categoryId,
  }: TicketChampionshipDTO) => Promise<void>;
}

const TicketContext = createContext({} as TicketContextData);

const axios = new AxiosAdapter();

export const TicketProvider = ({ children, onClose }: TicketProviderProps) => {
  const toast = useToast();
  const [tickets, setTickets] = useState<ITicket[]>([] as ITicket[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const Create = useCallback(
    async ({
      name,
      description,
      startDate,
      endDate,
      price,
      quantity,
      categoryId,
    }: TicketChampionshipDTO) => {
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
        setTickets(allTickets);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <TicketContext.Provider value={{ tickets, isLoading, isError, Create, List }}>
      {children}
    </TicketContext.Provider>
  );
};

export default TicketContext;
