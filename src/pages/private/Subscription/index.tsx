import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';

import { SubscriptionProvider } from '@/contexts/subscription';
import { TicketProvider } from '@/contexts/ticket';
import useSubscriptionData from '@/hooks/useSubscriptionData';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSubscriptionParticipants from './components/formParticipants';
import FormSubscription from './components/formSubscription';

const ListSubscription = lazy(() => import('./components/list'));

const SubscriptionWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <TicketProvider onClose={onClose}>
      <SubscriptionProvider onClose={onClose}>
        <Subscription />
      </SubscriptionProvider>
    </TicketProvider>
  );
};

const Subscription = () => {
  const { id } = useParams();
  const { subscriptionsPages } = useSubscriptionData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [participantsNumber, setParticipantsNumber] = useState<number>(0);

  function handleSubscriptionInfo(step: number, participantsNumber: number) {
    setParticipantsNumber(participantsNumber);
    setCurrentStep(step);
  }

  const hasElements: boolean = useMemo(() => subscriptionsPages.count !== 0, [subscriptionsPages]);

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
        {hasElements && (
          <>
            <HStack w='100%' justifyContent='space-between'>
              <Text fontSize='2xl' as='b'>
                Gestão de inscrições
              </Text>
              <Button colorScheme='teal' size='md' onClick={onOpen}>
                Adicionar inscrição
              </Button>
            </HStack>
            <Box w='100%' marginTop={6}>
              <ListSubscription id={id as string} />
            </Box>
          </>
        )}

        {!hasElements && (
          <EmptyList
            text='Você não possui inscrições ainda!'
            contentButton='Crie uma inscrição'
            onClose={onOpen}
          />
        )}

        <ComponentModal
          modalHeader='Adicionar inscrição'
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        >
          {currentStep == 0 ? (
            <FormSubscription id={id as string} openFormParticipants={handleSubscriptionInfo} />
          ) : (
            <FormSubscriptionParticipants
              participantsNumber={participantsNumber as number}
              onClose={onClose}
              resetStep={handleSubscriptionInfo}
            />
          )}
        </ComponentModal>
      </Box>
    </Suspense>
  );
};

export default SubscriptionWithProvider;
