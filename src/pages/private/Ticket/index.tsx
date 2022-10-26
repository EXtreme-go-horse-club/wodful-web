import ComponentModal from '@/components/modal';
import { CategoryProvider } from '@/contexts/category';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy } from 'react';
import CreateCategory from '../Category/components/form';

const ListCategory = lazy(() => import('../Category/components/list'));

const Ticket = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CategoryProvider onClose={onClose}>
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
          <CreateCategory onClose={onClose} />
        </ComponentModal>
        <Box w='100%' marginTop={6}>
          <ListCategory />
        </Box>
      </Box>
    </CategoryProvider>
  );
};

export default Ticket;
