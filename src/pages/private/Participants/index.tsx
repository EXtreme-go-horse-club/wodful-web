import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import { ParticipantProvider } from '@/contexts/participant';
import { IParticipant } from '@/data/interfaces/parcipants';
import useParticipantData from '@/hooks/useParticipantData';
import { Box, Button, HStack, Input, InputGroup, InputLeftElement, Text, useDisclosure } from '@chakra-ui/react';
import { ChangeEvent, lazy, Suspense, useMemo, useState } from 'react';
import { Filter, Search } from 'react-feather';
import { useParams } from 'react-router-dom';
import FormParticipant from './components/form';

const ListParticipants = lazy(() => import('./components/list'));

const ParticipantWithProvider = () => {
  return (
    <ParticipantProvider>
      <Participants />
    </ParticipantProvider>
  );
};

const Participants = () => {
  const { id } = useParams();
  const { participantsPages } = useParticipantData();
  const [participantName, setParticipantName] = useState<string>('');
  const [participant, setParticipant] = useState<IParticipant>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hasElements: boolean = useMemo(() => participantsPages.count !== 0, [participantsPages]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.length;
    return name >= 3 ? setParticipantName(event.target.value) : setParticipantName('');
  };

  const openEdit = (participantObj: IParticipant) => {
    console.log(participantObj);
    setParticipant(participantObj);
    onOpen();
  };

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
        <HStack w='100%' justifyContent='space-between'>
          {hasElements && (
            <>
              <Text fontSize='2xl' as='b'>
                Lista de Participantes
              </Text>
              <HStack>
                <InputGroup>
                  <InputLeftElement>
                    <Search size={20} color='gray' />
                  </InputLeftElement>
                  <Input
                    onChange={handleOnChange}
                    as='input'
                    w='100%'
                    minW='320px'
                    placeholder='Buscar participante'
                  />
                </InputGroup>
                <Button
                  minW='84px'
                  leftIcon={<Filter size={14} />}
                  variant='outline'
                  colorScheme='gray'
                >
                  Filtrar
                </Button>
              </HStack>
            </>
          )}
        </HStack>

        <ComponentModal
            modalHeader={'Editar participante'}
            size='lg'
            isOpen={isOpen}
            onClose={onClose}
          >
            <FormParticipant
              onClose={onClose}
              oldParticipant={participant}
            />
        </ComponentModal>

        {hasElements && (
          <Box w='100%' marginTop={6}>
            <ListParticipants participantName={participantName} openEdit={openEdit} />
          </Box>
        )}

        {!hasElements && (
          <EmptyList
            linkTo={`/championships/${id}/subscriptions`}
            text='Você não possui participantes.'
            textLinkTo='Crie inscrições para ter participantes.'
          />
        )}
      </Box>
    </Suspense>
  );
};

export default ParticipantWithProvider;
