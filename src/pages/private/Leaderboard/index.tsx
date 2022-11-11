import { lazy, Suspense, useEffect, useState } from 'react';

import { Loader } from '@/components/Loader';
import ComponentModal from '@/components/Modal';
import { CategoryProvider } from '@/contexts/category';
import { LeaderboardProvider } from '@/contexts/leaderboard';
import { SubscriptionProvider } from '@/contexts/subscription';
import { WorkoutProvider } from '@/contexts/workout';
import useCategoryData from '@/hooks/useCategoryData';
import useLeaderboardData from '@/hooks/useLeaderboardData';
import { Box, Button, Flex, HStack, Select, Text, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const ResultForm = lazy(() => import('./components/result/form'));
const ListLeaderboard = lazy(() => import('./components/list'));

const PrivateLeaderboardWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <LeaderboardProvider onClose={onClose}>
      <CategoryProvider>
        <WorkoutProvider>
          <SubscriptionProvider>
            <Leaderboard />
          </SubscriptionProvider>
        </WorkoutProvider>
      </CategoryProvider>
    </LeaderboardProvider>
  );
};

const Leaderboard = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { List: CategoryList, categories } = useCategoryData();
  const [selectedCategory, setSelectedCategory] = useState<string>('Sem categoria');
  const { ListPaginated } = useLeaderboardData();

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
              Leaderboard
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
                  ListPaginated(String(id), event.target.value);
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
          <ListLeaderboard />
        </Box>
      </Box>
    </Suspense>
  );
};

export default PrivateLeaderboardWithProvider;
