import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import { CategoryProvider } from '@/contexts/category';
import { ScheduleProvider } from '@/contexts/schedule';
import { WorkoutProvider } from '@/contexts/workout';
import useScheduleData from '@/hooks/useScheduleData';
import { Box, Button, Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleForm from './components/form';
import ListSchedule from './components/list';

const ScheduleWithProvider = () => {
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

  const { schedulePages } = useScheduleData();

  const hasElements: boolean = useMemo(() => schedulePages.count !== 0, [schedulePages]);

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
        {hasElements && (
          <>
            <HStack as='section' role='textbox' w='100%' justifyContent='space-between'>
              <Flex as='article' role='textbox' direction='column' gap='0.75rem'>
                <Text fontSize='2xl' as='b' role='heading'>
                  Cronograma
                </Text>
              </Flex>
              <Flex as='article' gap='1rem'>
                <Button minW='170px' w='100%' colorScheme='teal' size='md' onClick={onOpen}>
                  Adicionar atividade
                </Button>
              </Flex>
            </HStack>

            <Box as='section' w='100%' marginTop={6}>
              <ListSchedule championshipId={id as string} />
            </Box>
          </>
        )}

        <ComponentModal
          modalHeader='Adicionar atividade ao cronograma'
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        >
          <ScheduleForm onClose={onClose} />
        </ComponentModal>

        {!hasElements && (
          <EmptyList
            text='Você não possui um cronograma ainda!'
            contentButton='Crie um cronograma'
            onClose={onOpen}
          />
        )}
      </Box>
    </Suspense>
  );
};

export default ScheduleWithProvider;
