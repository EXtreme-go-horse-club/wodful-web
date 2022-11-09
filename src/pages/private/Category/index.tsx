import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import ComponentModal from '@/components/modal';
import { CategoryProvider } from '@/contexts/category';
import useCategoryData from '@/hooks/useCategoryData';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FormCategory from './components/form';

const ListCategory = lazy(() => import('./components/list'));

const CategoryWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <CategoryProvider onClose={onClose}>
      <Category />
    </CategoryProvider>
  );
};

const Category = () => {
  const { categoriesPages } = useCategoryData();

  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hasElements: boolean = useMemo(() => categoriesPages.count !== 0, [categoriesPages]);

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
        <HStack w='100%' justifyContent='space-between'>
          {hasElements && (
            <>
              <Text fontSize='2xl' as='b'>
                Lista de categorias
              </Text>
              <Button colorScheme='teal' size='md' onClick={onOpen}>
                Adicionar categoria
              </Button>
            </>
          )}
        </HStack>

        <ComponentModal modalHeader='Criar categoria' size='lg' isOpen={isOpen} onClose={onClose}>
          <FormCategory id={id as string} onClose={onClose} />
        </ComponentModal>

        {hasElements && (
          <Box w='100%' marginTop={6}>
            <ListCategory id={id as string} />
          </Box>
        )}

        {!hasElements && (
          <EmptyList
            text='Você não possui categorias ainda!'
            contentButton='Crie uma categoria'
            onClose={onOpen}
          />
        )}
      </Box>
    </Suspense>
  );
};

export default CategoryWithProvider;
