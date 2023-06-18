import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import { CategoryProviderMemo as CategoryProvider } from '@/contexts/category';
import { ICategory } from '@/data/interfaces/category';
import useCategoryData from '@/hooks/useCategoryData';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { Suspense, lazy, memo, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormCategory from './components/form';

const ListCategory = lazy(() => import('./components/list'));

const CategoryWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <CategoryProvider onClose={onClose}>
      <CategoryMemo />
    </CategoryProvider>
  );
};

const Category = () => {
  const [category, setCategory] = useState<ICategory>();
  const { categoriesPages } = useCategoryData();

  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openEdit = useCallback(
    (categoryObj: ICategory) => {
      setCategory(categoryObj);
      onOpen();
    },
    [onOpen],
  );

  const openCreate = useCallback(() => {
    resetCategory();
    onOpen();
  }, [onOpen]);

  const CloseModal = useCallback(() => {
    resetCategory();
    onClose();
  }, [onClose]);

  const resetCategory = () => {
    setCategory(undefined);
  };

  const hasElements: boolean = useMemo(() => categoriesPages.count !== 0, [categoriesPages]);

  console.log({ hasElements, category });

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
        <HStack w='100%' justifyContent='space-between'>
          {hasElements && (
            <>
              <Text fontSize='2xl' as='b'>
                Lista de categorias
              </Text>
              <Button colorScheme='teal' size='md' onClick={openCreate}>
                Adicionar categoria
              </Button>
            </>
          )}
        </HStack>

        {hasElements && (
          <Box w='100%' marginTop={6}>
            <ListCategory id={id as string} openEdit={openEdit} />
          </Box>
        )}

        {!hasElements && (
          <EmptyList
            text='Você não possui categorias ainda!'
            contentButton='Crie uma categoria'
            onClick={onOpen}
          />
        )}

        <ComponentModal
          modalHeader={category ? 'Editar categoria' : ' Criar categoria'}
          size='lg'
          isOpen={isOpen}
          onClose={CloseModal}
        >
          <FormCategory
            id={id as string}
            onClose={CloseModal}
            oldCategory={category}
            resetCategory={resetCategory}
          />
        </ComponentModal>
      </Box>
    </Suspense>
  );
};

const CategoryMemo = memo(Category);
const CategoryWithProviderMemo = memo(CategoryWithProvider);

export default CategoryWithProviderMemo;
