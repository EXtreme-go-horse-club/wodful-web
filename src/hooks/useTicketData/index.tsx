import TicketContext, { TicketContextData } from '@/contexts/ticket';
import { useContext } from 'react';

const useTicketData = (): TicketContextData => {
  const context = useContext<TicketContextData>(TicketContext);

  return context;
};

export default useTicketData;
