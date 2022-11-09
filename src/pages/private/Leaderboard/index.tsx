import { lazy, Suspense } from 'react';

import { Loader } from '@/components/Loader';
import ComponentModal from '@/components/Modal';
import { CategoryProvider } from '@/contexts/category';
import { LeaderboardProvider } from '@/contexts/leaderboard';
import { SubscriptionProvider } from '@/contexts/subscription';
import { WorkoutProvider } from '@/contexts/workout';
import { Box, Button, Flex, HStack, Select, Text, useDisclosure } from '@chakra-ui/react';

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
            >
              Categoria: Amador masculino
            </Text>
          </Flex>
          <Flex as='article' gap='1rem'>
            <Select minW='320px' variant='outline' placeholder='Outline' />
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
          <ResultForm />
        </ComponentModal>
        <Box as='section' w='100%' marginTop={6}>
          <ListLeaderboard />
        </Box>
      </Box>
    </Suspense>
  );
};

export default PrivateLeaderboardWithProvider;
