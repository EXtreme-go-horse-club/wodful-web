import ComponentModal from '@/components/modal';
import { CategoryProvider } from '@/contexts/category';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy } from 'react';
import CreateCategory from './components/form';

const ListCategory = lazy(() => import('./components/list'));

const Category = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CategoryProvider onClose={onClose}>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
        <HStack w='100%' justifyContent='space-between'>
          <Text fontSize='2xl' as='b'>
            Lista de categorias
          </Text>
          <Button colorScheme='teal' size='md' onClick={onOpen}>
            Adicionar categoria
          </Button>
        </HStack>
        <ComponentModal modalHeader='Criar categoria' size='lg' isOpen={isOpen} onClose={onClose}>
          <CreateCategory onClose={onClose} />
        </ComponentModal>
        <Box w='100%' marginTop={6}>
          <ListCategory />
        </Box>
      </Box>
    </CategoryProvider>
  );
};

export default Category;
