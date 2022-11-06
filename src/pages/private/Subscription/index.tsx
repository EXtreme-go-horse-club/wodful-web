import { Loader } from '@/components/Loader';
import ComponentModal from '@/components/modal';

import { SubscriptionProvider } from '@/contexts/subscription';
import { TicketProvider } from '@/contexts/ticket';
import { Box, Button, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSubscriptionParticipants from './components/formParticipants';
import FormSubscription from './components/formSubscription';

const ListSubscription = lazy(() => import('./components/list'));

const Subscription = () => {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [participantsNumber, setParticipantsNumber] = useState<number>(0);

  function handleSubscriptionInfo(step: number, participantsNumber: number) {
    setParticipantsNumber(participantsNumber);
    setCurrentStep(step);
  }

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <TicketProvider onClose={onClose}>
        <SubscriptionProvider onClose={onClose}>
          <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
            <HStack w='100%' justifyContent='space-between'>
              <Text fontSize='2xl' as='b'>
                Gestão de inscrições
              </Text>
              <Button colorScheme='teal' size='md' onClick={onOpen}>
                Adicionar inscrição
              </Button>
            </HStack>
            <ComponentModal
              modalHeader='Criar categoria'
              size='lg'
              isOpen={isOpen}
              onClose={onClose}
            >
              {currentStep == 0 ? (
                <FormSubscription id={id as string} openFormParticipants={handleSubscriptionInfo} />
              ) : (
                <FormSubscriptionParticipants
                  id={id as string}
                  participantsNumber={participantsNumber as number}
                />
              )}
            </ComponentModal>
            <Box w='100%' marginTop={6}>
              <ListSubscription id={id as string} />
            </Box>
          </Box>
        </SubscriptionProvider>
      </TicketProvider>
    </Suspense>
  );
};

export default Subscription;
