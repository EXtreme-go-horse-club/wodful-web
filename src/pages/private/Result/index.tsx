import { lazy, Suspense, useEffect, useState } from 'react';

import { Loader } from '@/components/Loader';
import ComponentModal from '@/components/Modal';
import { CategoryProvider } from '@/contexts/category';
import { ResultProvider } from '@/contexts/result';
import { SubscriptionProvider } from '@/contexts/subscription';
import { WorkoutProvider } from '@/contexts/workout';
import useCategoryData from '@/hooks/useCategoryData';
import useResultData from '@/hooks/useResultData';
import { Box, Button, Flex, HStack, Select, Text, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const ResultForm = lazy(() => import('./components/form'));
const ListResults = lazy(() => import('./components/list'));

const ResultWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <ResultProvider onClose={onClose}>
      <CategoryProvider>
        <WorkoutProvider>
          <SubscriptionProvider>
            <Result />
          </SubscriptionProvider>
        </WorkoutProvider>
      </CategoryProvider>
    </ResultProvider>
  );
};

const Result = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { List: CategoryList, categories } = useCategoryData();
  const [selectedCategory, setSelectedCategory] = useState<string>('Sem categoria');
  const [categoryId, setCategoryId] = useState<string>('');
  const { ListPaginated } = useResultData();

  useEffect(() => {
    if (id) CategoryList(id);
  }, [CategoryList, id]);

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box
        as='main'
        role='main'
        w='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        p={6}
      >
        <HStack as='section' role='textbox' w='100%' justifyContent='space-between'>
          <Flex as='article' role='textbox' direction='column' gap='0.75rem'>
            <Text fontSize='2xl' as='b' role='heading'>
              Resultados
            </Text>
            <Text
              as='b'
              role='textbox'
              fontSize='0.75rem'
              color='gray.500'
              border='1px'
              borderColor='gray.500'
              borderRadius='4px'
              padding='2px 8px'
              textTransform='capitalize'
            >
              Categoria: {selectedCategory}
            </Text>
          </Flex>
          <Flex as='article' gap='1rem'>
            <Select
              as='select'
              id='category'
              placeholder='Selecione a categoria'
              onChange={(event) => {
                if (event.target.value) {
                  ListPaginated(event.target.value);
                  setCategoryId(event.target.value);
                  setSelectedCategory(
                    categories.find((selected) => selected.id === event.target.value)!.name,
                  );
                }
              }}
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Button minW='170px' colorScheme='teal' size='md' onClick={onOpen}>
              Adicionar resultado
            </Button>
          </Flex>
        </HStack>
        <ComponentModal
          modalHeader='Adicionar resultado'
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        >
          <ResultForm onClose={onClose} />
        </ComponentModal>
        <Box as='section' w='100%' marginTop={6}>
          <ListResults id={categoryId as string} />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ResultWithProvider;
