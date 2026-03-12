import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import { CategoryProvider } from '@/contexts/category';
import { WorkoutProvider } from '@/contexts/workout';
import useWorkoutData from '@/hooks/useWorkoutData';
import { IChampionship } from '@/data/interfaces/championship';
import { ChampionshipService } from '@/services/Championship';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense, useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const axios = new AxiosAdapter();
const championshipService = new ChampionshipService(axios);

const ListWorkout = lazy(() => import('./components/list'));
const FormWorkout = lazy(() => import('./components/form'));

const WorkoutWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <CategoryProvider>
      <WorkoutProvider onClose={onClose}>
        <Workout />
      </WorkoutProvider>
    </CategoryProvider>
  );
};

const Workout = () => {
  const { workoutsPages } = useWorkoutData();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [resultType, setResultType] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    championshipService
      .getById(id)
      .then((championship: IChampionship) => setResultType(championship.resultType))
      .catch(() => setResultType(null));
  }, [id]);

  const hasElements: boolean = useMemo(() => workoutsPages.count !== 0, [workoutsPages]);
  const isScoreType = resultType === 'SCORE';

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
        <HStack w='100%' justifyContent='space-between'>
          {hasElements && (
            <>
              <Text fontSize='2xl' as='b'>
                Lista de provas
              </Text>
              <Button colorScheme='teal' size='md' onClick={onOpen}>
                Adicionar prova
              </Button>
            </>
          )}
        </HStack>
        <ComponentModal modalHeader='Criar prova' size='lg' isOpen={isOpen} onClose={onClose}>
          <FormWorkout id={id as string} onClose={onClose} showHalfPointsOption={isScoreType} />
        </ComponentModal>

        {hasElements && (
          <Box w='100%' marginTop={6}>
            <ListWorkout id={id as string} showPontuacaoColumn={isScoreType} />
          </Box>
        )}

        {!hasElements && (
          <EmptyList
            text='Você não possui provas ainda!'
            contentButton='Crie uma prova'
            onClose={onOpen}
          />
        )}
      </Box>
    </Suspense>
  );
};

export default WorkoutWithProvider;
