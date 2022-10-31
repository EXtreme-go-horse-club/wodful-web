import { Loader } from '@/components/Loader';
import ComponentModal from '@/components/modal';
import { CategoryProvider } from '@/contexts/category';
import { WorkoutProvider } from '@/contexts/workout';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

const ListWorkout = lazy(() => import('./components/list'));
const FormWorkout = lazy(() => import('./components/form'));

const Workout = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <CategoryProvider>
        <WorkoutProvider onClose={onClose}>
          <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
            <HStack w='100%' justifyContent='space-between'>
              <Text fontSize='2xl' as='b'>
                Lista de provas
              </Text>
              <Button colorScheme='teal' size='md' onClick={onOpen}>
                Adicionar prova
              </Button>
            </HStack>
            <ComponentModal modalHeader='Criar prova' size='lg' isOpen={isOpen} onClose={onClose}>
              <FormWorkout id={id as string} onClose={onClose} />
            </ComponentModal>
            <Box w='100%' marginTop={6}>
              <ListWorkout id={id as string} />
            </Box>
          </Box>
        </WorkoutProvider>
      </CategoryProvider>
    </Suspense>
  );
};

export default Workout;
