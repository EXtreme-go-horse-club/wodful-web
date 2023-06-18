import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { Suspense, lazy, useCallback, useMemo, useState } from 'react';

import ComponentModal from '@/components/ComponentModal';
import { CategoryProviderMemo as CategoryProvider } from '@/contexts/category';
import { TicketProvider } from '@/contexts/ticket';

import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import useTicketData from '@/hooks/useTicketData';
import { ITicket } from '../../../data/interfaces/ticket/index';

const ListTicket = lazy(() => import('./components/list'));
const FormTicket = lazy(() => import('./components/form'));

const TicketWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <CategoryProvider>
      <TicketProvider onClose={onClose}>
        <Ticket />
      </TicketProvider>
    </CategoryProvider>
  );
};

const Ticket = () => {
  const { ticketsPages } = useTicketData();
  const [ticket, setTicket] = useState<ITicket>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const openEdit = useCallback(
    (ticketObj: ITicket) => {
      setTicket(ticketObj);
      onOpen();
    },
    [onOpen],
  );

  const openCreate = useCallback(() => {
    resetTicket();
    onOpen();
  }, [onOpen]);

  const resetTicket = () => {
    setTicket(undefined);
  };

  const hasElements: boolean = useMemo(() => ticketsPages.count !== 0, [ticketsPages]);

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
        <HStack w='100%' justifyContent='space-between'>
          {hasElements && (
            <>
              <Text fontSize='2xl' as='b'>
                Gestão de tickets
              </Text>
              <Button colorScheme='teal' size='md' onClick={openCreate}>
                Adicionar ticket
              </Button>
            </>
          )}
        </HStack>
        <ComponentModal
          modalHeader={ticket ? 'Editar ticket' : 'Adicionar ticket'}
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        >
          <FormTicket onClose={onClose} oldTicket={ticket} resetTicket={resetTicket} />
        </ComponentModal>

        {hasElements && (
          <Box w='100%' marginTop={6}>
            <ListTicket openEdit={openEdit} />
          </Box>
        )}

        {!hasElements && (
          <EmptyList
            text='Você não possui tickets ainda!'
            contentButton='Crie um ticket'
            onClick={onOpen}
          />
        )}
      </Box>
    </Suspense>
  );
};

export default TicketWithProvider;
