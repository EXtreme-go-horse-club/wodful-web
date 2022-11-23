import { Loader } from '@/components/Loader';
import ComponentModal from '@/components/Modal';
import { CategoryProvider } from '@/contexts/category';
import { ScheduleProvider } from '@/contexts/schedule';
import { WorkoutProvider } from '@/contexts/workout';
import { Box, Button, Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleForm from './components/form';
import Listchedule from './components/list';

const ScheduletWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <ScheduleProvider onClose={onClose}>
      <CategoryProvider>
        <WorkoutProvider>
          <Schedule />
        </WorkoutProvider>
      </CategoryProvider>
    </ScheduleProvider>
  );
};

const Schedule = () => {
  const { id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

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
              Cronograma
            </Text>
          </Flex>
          <Flex as='article' gap='1rem'>
            <Button minW='170px' w='100%' colorScheme='teal' size='md' onClick={onOpen}>
              Adicionar no cronograma
            </Button>
          </Flex>
        </HStack>

        <ComponentModal
          modalHeader='Adicionar no cronograma'
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        >
          <ScheduleForm onClose={onClose} />
        </ComponentModal>

        <Box as='section' w='100%' marginTop={6}>
          <Listchedule championshipId={id as string} />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ScheduletWithProvider;
