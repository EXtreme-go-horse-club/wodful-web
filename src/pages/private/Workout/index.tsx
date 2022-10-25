import ComponentModal from '@/components/modal';
import { CategoryProvider } from '@/contexts/category';
import { WorkoutProvider } from '@/contexts/workout';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy } from 'react';
import FormWorkout from './components/form';

const ListWorkout = lazy(() => import('./components/list'));

const Workout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
            <FormWorkout onClose={onClose} />
          </ComponentModal>
          <Box w='100%' marginTop={6}>
            <ListWorkout />
          </Box>
        </Box>
      </WorkoutProvider>
    </CategoryProvider>
  );
};

export default Workout;
