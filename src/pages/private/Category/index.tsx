import { Loader } from '@/components/Loader';
import ComponentModal from '@/components/modal';
import { CategoryProvider } from '@/contexts/category';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import FormCategory from './components/form';

const ListCategory = lazy(() => import('./components/list'));

const Category = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
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
            <FormCategory id={id as string} />
          </ComponentModal>
          <Box w='100%' marginTop={6}>
            <ListCategory id={id as string} />
          </Box>
        </Box>
      </CategoryProvider>
    </Suspense>
  );
};

export default Category;
