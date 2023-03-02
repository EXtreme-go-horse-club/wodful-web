import { ChangeEvent, lazy, Suspense, useCallback, useEffect, useState } from 'react';

import ComponentModal from '@/components/ComponentModal';
import { Loader } from '@/components/Loader';
import { CategoryProvider } from '@/contexts/category';
import { ResultProvider } from '@/contexts/result';
import { SubscriptionProvider } from '@/contexts/subscription';
import { WorkoutProvider } from '@/contexts/workout';
import useCategoryData from '@/hooks/useCategoryData';
import useResultData from '@/hooks/useResultData';
import useWorkoutData from '@/hooks/useWorkoutData';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Search } from 'react-feather';
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
  const [selectedCategory, setSelectedCategory] = useState<string>('Sem categoria');
  const [categoryId, setCategoryId] = useState<string>('');
  const [workoutId, setWorkoutId] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { List: CategoryList, categories } = useCategoryData();
  const { ListPaginated: ListResultsData, ListPaginatedByWorkout } = useResultData();
  const { workouts, ListByCategory: ListWorkouts } = useWorkoutData();

  useEffect(() => {
    if (id) {
      CategoryList(id);
    }
  }, [CategoryList, id]);

  const resetSelectData= () =>{
    setSelectedCategory("Todos");
    setWorkoutId("");
    setCategoryId('');
  }

  const openCreate = () => {
    resetSelectData();
    ListResultsData(id as string);
    onOpen();
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    const nameLength = event.target.value.length;

    if (nameLength < 3) {
      return;
    }

    if (nameLength >= 3 && workoutId) {
      ListPaginatedByWorkout(categoryId, workoutId, name);
      return;
    }

    if (nameLength >= 3 && categoryId) {
      ListResultsData(categoryId, name);
      return;
    }
  };

  const handleChangeCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value) {
        ListResultsData(event.target.value);
        setCategoryId(event.target.value);
        setSelectedCategory(
          categories.find((selected) => selected.id === event.target.value)!.name,
        );
        ListWorkouts(event.target.value);
        return;
      }
      setCategoryId('');
    },
    [ListResultsData, ListWorkouts, categories],
  );

  const handleChangeWorkout = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const workoutId = event.target.value;
      if (categoryId) {
        setWorkoutId(workoutId);
        ListPaginatedByWorkout(categoryId, event.target.value);
      }
    },
    [ListPaginatedByWorkout, categoryId],
  );

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
            <InputGroup>
              <InputLeftElement>
                <Search size={20} color='gray' />
              </InputLeftElement>
              <Input
                onChange={handleOnChange}
                disabled={!categories.length || !categoryId}
                as='input'
                w='100%'
                minW='320px'
                placeholder='Buscar participantes'
              />
            </InputGroup>
            <Select
              as='select'
              disabled={!categories.length || !categoryId}
              id='workout'
              value={workoutId}
              placeholder='Selecione uma prova'
              onChange={(event) => handleChangeWorkout(event)}
            >
              {workouts?.map((workout) => (
                <option key={workout.id} value={workout.id}>
                  {workout.name}
                </option>
              ))}
            </Select>
            <Select
              as='select'
              id='category'
              placeholder='Selecione a categoria'
              value={categoryId}
              onChange={(event) => handleChangeCategory(event)}
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Button minW='170px' colorScheme='teal' size='md' onClick={openCreate}>
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
          <ListResults />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ResultWithProvider;
