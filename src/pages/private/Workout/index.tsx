import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import { CategoryProviderMemo as CategoryProvider } from '@/contexts/category';
import { WorkoutProvider } from '@/contexts/workout';
import useWorkoutData from '@/hooks/useWorkoutData';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { Suspense, lazy, useMemo } from 'react';
import { useParams } from 'react-router-dom';

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

  const hasElements: boolean = useMemo(() => workoutsPages.count !== 0, [workoutsPages]);

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
          <FormWorkout id={id as string} onClose={onClose} />
        </ComponentModal>

        {hasElements && (
          <Box w='100%' marginTop={6}>
            <ListWorkout id={id as string} />
          </Box>
        )}

        {!hasElements && (
          <EmptyList
            text='Você não possui provas ainda!'
            contentButton='Crie uma prova'
            onClick={onOpen}
          />
        )}
      </Box>
    </Suspense>
  );
};

export default WorkoutWithProvider;
