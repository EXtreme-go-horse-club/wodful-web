import ComponentModal from '@/components/ComponentModal';
import { Loader } from '@/components/Loader';
import { ParticipantProvider } from '@/contexts/participant';
import { IParticipant } from '@/data/interfaces/participant';
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, Suspense, lazy, useState } from 'react';
import { Search } from 'react-feather';
import FormParticipant from './components/form';
import FormMedal from './components/formMedal';

const ListParticipants = lazy(() => import('./components/list'));

const ParticipantWithProvider = () => {
  return (
    <ParticipantProvider>
      <Participants />
    </ParticipantProvider>
  );
};

const Participants = () => {
  const [participantName, setParticipantName] = useState<string>('');
  const [whichModal, setWhichModal] = useState<'EDIT' | 'MEDAL' | 'KIT'>('EDIT');
  const [participant, setParticipant] = useState<IParticipant>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.length;
    return name >= 3 ? setParticipantName(event.target.value) : setParticipantName('');
  };

  const openModal = (whichOne: 'EDIT' | 'MEDAL' | 'KIT', participantObj: IParticipant) => {
    setWhichModal(whichOne);
    setParticipant(participantObj);
    onOpen();
  };

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' p={6}>
        <HStack w='100%' justifyContent='space-between'>
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
            </HStack>
          </>
        </HStack>

        <ComponentModal
          modalHeader={
            whichModal == 'EDIT'
              ? 'Editar participante'
              : whichModal == 'MEDAL'
              ? 'Retirar medalha'
              : 'Retirar kit'
          }
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        >
          {whichModal === 'EDIT' && (
            <FormParticipant onClose={onClose} oldParticipant={participant} />
          )}
          {whichModal === 'MEDAL' && (
            <FormMedal onClose={onClose} idParticipant={participant!.id} />
          )}
        </ComponentModal>

        <Box w='100%' marginTop={6}>
          <ListParticipants participantName={participantName} openModal={openModal} />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ParticipantWithProvider;
