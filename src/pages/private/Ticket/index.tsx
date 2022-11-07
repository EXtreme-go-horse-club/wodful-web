import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense, useMemo } from 'react';

import ComponentModal from '@/components/Modal';
import { CategoryProvider } from '@/contexts/category';
import { TicketProvider } from '@/contexts/ticket';

import { Loader } from '@/components/Loader';
import { NoHasElement } from '@/components/NoHasElement';
import useTicketData from '@/hooks/useTicketData';

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

  const { isOpen, onOpen, onClose } = useDisclosure();

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
              <Button colorScheme='teal' size='md' onClick={onOpen}>
                Adicionar ticket
              </Button>
            </>
          )}
        </HStack>
        <ComponentModal modalHeader='Adicionar ticket' size='lg' isOpen={isOpen} onClose={onClose}>
          <FormTicket onClose={onClose} />
        </ComponentModal>

        {hasElements && (
          <Box w='100%' marginTop={6}>
            <ListTicket />
          </Box>
        )}

        {!hasElements && (
          <NoHasElement
            text='Você não possui tickets ainda!'
            contentButton='Crie um ticket'
            onClose={onOpen}
          />
        )}
      </Box>
    </Suspense>
  );
};

export default TicketWithProvider;
