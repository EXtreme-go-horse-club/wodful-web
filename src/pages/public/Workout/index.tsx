import AnalyticsAdapter from '@/adapters/AnalyticsAdapter';
import { Loader } from '@/components/Loader';
import { CategoryProvider } from '@/contexts/category';
import { WorkoutProvider } from '@/contexts/workout';
import useApp from '@/hooks/useApp';
import useCategoryData from '@/hooks/useCategoryData';
import useWorkoutData from '@/hooks/useWorkoutData';
import { Box, Center, Flex, Select, Text } from '@chakra-ui/react';
import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { Server } from 'react-feather';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ValidateAccess } from '../Leaderboard/helper/ValidateAccess';

const ListPublicWorkouts = lazy(() => import('./components/'));

const PublicWorkouts = () => {
  return (
    <WorkoutProvider>
      <CategoryProvider>
        <Workouts />
      </CategoryProvider>
    </WorkoutProvider>
  );
};

const Workouts = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { setPublicChampionshipName } = useApp();

  const { PublicList, publicCategories } = useCategoryData();
  const { PublicListByCategory } = useWorkoutData();
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; value: string }>({
    name: 'Sem categoria',
    value: '0',
  });

  const hasSelectedCategory = useMemo(
    () => selectedCategory.name === 'Sem categoria',
    [selectedCategory],
  );

  const handleSelection = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value) {
        PublicListByCategory(event.target.value);
        const category = publicCategories.find((selected) => selected.id === event.target.value);
        setSelectedCategory({ name: category!.name, value: category!.id });

        AnalyticsAdapter.event({
          action: 'buscar_provas_categoria',
          category: 'Atleta',
          label: 'Buscar provas por categoria',
          value: `${category!.name}`,
        });
        return;
      }
      setSelectedCategory({
        name: 'Sem categoria',
        value: '0',
      });
    },
    [PublicListByCategory, publicCategories],
  );

  useEffect(() => {
    const name = ValidateAccess.verify(code as string, navigate);
    if (name) setPublicChampionshipName(name);
  }, [code, navigate, setPublicChampionshipName]);

  useEffect(() => {
    AnalyticsAdapter.pageview(location.pathname);
    if (code) PublicList(code);
  }, [PublicList, code, location.pathname]);

  useEffect(() => {
    ValidateAccess.verify(code as string, navigate);
  }, [code, navigate]);
  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Center as='main' role='main'>
        <Box
          w='100%'
          maxW='1280px'
          display='flex'
          flexDirection='column'
          alignItems='center'
          as='section'
          px={4}
          marginTop={'130px'}
        >
          <Flex
            as='section'
            role='textbox'
            w='100%'
            mt={4}
            justifyContent='space-between'
            direction={['column', 'row', 'row']}
          >
            <Flex as='article' role='textbox' direction='column' gap='0.75rem'>
              {!hasSelectedCategory && (
                <Text fontSize='2xl' as='b' role='heading'>
                  Provas
                </Text>
              )}
            </Flex>
            {!hasSelectedCategory && (
              <Flex as='article' gap='1rem' mt={[4, 0, 0]}>
                <Select
                  as='select'
                  id='category'
                  defaultValue={selectedCategory.value}
                  onChange={(event) => {
                    handleSelection(event);
                  }}
                >
                  {publicCategories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Flex>
            )}
          </Flex>
          <Box as='section' w='100%' maxW='1280px' p='1.5rem 0px'>
            {!hasSelectedCategory ? (
              <ListPublicWorkouts />
            ) : (
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                gap='8px'
                mt='20%'
              >
                <Server size={80} color='#1A202C' />
                <Text color='teal.500'>Selecione uma categoria</Text>
                <Flex as='article' gap='1rem' mt={[4, 0, 0]}>
                  <Select
                    as='select'
                    id='category'
                    placeholder='Categorias'
                    onChange={(event) => {
                      handleSelection(event);
                    }}
                  >
                    {publicCategories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </Box>
            )}
          </Box>
        </Box>
      </Center>
    </Suspense>
  );
};

export default PublicWorkouts;
