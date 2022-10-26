import ComponentModal from '@/components/modal';
import { TicketProvider } from '@/contexts/ticket';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import FormTicket from './components/form';
import ListTicket from './components/list';

const Ticket = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
        <ComponentModal modalHeader='Adicionar ticket' size='lg' isOpen={isOpen} onClose={onClose}>
          <FormTicket onClose={onClose} />
        </ComponentModal>
        <Box w='100%' marginTop={6}>
          <ListTicket />
        </Box>
      </Box>
    </TicketProvider>
  );
};

export default Ticket;
