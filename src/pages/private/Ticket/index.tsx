import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';

import ComponentModal from '@/components/Modal';
import { CategoryProvider } from '@/contexts/category';
import { TicketProvider } from '@/contexts/ticket';

import { Loader } from '@/components/Loader';

const ListTicket = lazy(() => import('./components/list'));
const FormTicket = lazy(() => import('./components/form'));

const Ticket = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <CategoryProvider>
        <TicketProvider onClose={onClose}>
          <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
            <HStack w='100%' justifyContent='space-between'>
              <Text fontSize='2xl' as='b'>
                Gestão de tickets
              </Text>
              <Button colorScheme='teal' size='md' onClick={onOpen}>
                Adicionar ticket
              </Button>
            </HStack>
            <ComponentModal
              modalHeader='Adicionar ticket'
              size='lg'
              isOpen={isOpen}
              onClose={onClose}
            >
              <FormTicket />
            </ComponentModal>
            <Box w='100%' marginTop={6}>
              <ListTicket />
            </Box>
          </Box>
        </TicketProvider>
      </CategoryProvider>
    </Suspense>
  );
};

export default Ticket;
