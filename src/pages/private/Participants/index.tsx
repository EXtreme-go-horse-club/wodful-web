import AnalyticsAdapter from '@/adapters/AnalyticsAdapter';
import ComponentModal from '@/components/ComponentModal';
import { Loader } from '@/components/Loader';
import { ParticipantProvider } from '@/contexts/participant';
import { IParticipant } from '@/data/interfaces/participant';
import useApp from '@/hooks/useApp';
import useParticipantData from '@/hooks/useParticipantData';
import { participantMessages } from '@/utils/messages';
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, Suspense, lazy, useState } from 'react';
import { Search } from 'react-feather';
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
  const [participantName, setParticipantName] = useState<string>('');
  const [participant, setParticipant] = useState<IParticipant>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { ExportToCSV } = useParticipantData();
  const { currentChampionship } = useApp();
  const toast = useToast();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.length;
    return name >= 3 ? setParticipantName(event.target.value) : setParticipantName('');
  };

  const openEdit = (participantObj: IParticipant) => {
    setParticipant(participantObj);
    onOpen();
  };

  const exportToCsv = () => {
    AnalyticsAdapter.event({
      action: 'exportar_camisetas_participantes',
      category: 'ADM',
      label: 'Exportar camisetas',
      value: `camisetas`,
    });

    ExportToCSV(currentChampionship.id);

    toast({
      title: participantMessages['success_export'],
      status: 'success',
      isClosable: true,
    });
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
              <Tooltip label='Relação de camisetas entre os participantes' hasArrow>
                <Button onClick={exportToCsv} colorScheme='teal' w='100%' type='button'>
                  Baixar Relatório
                </Button>
              </Tooltip>
            </HStack>
          </>
        </HStack>

        <ComponentModal
          modalHeader={'Editar participante'}
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        >
          <FormParticipant onClose={onClose} oldParticipant={participant} />
        </ComponentModal>

        <Box w='100%' marginTop={6}>
          <ListParticipants participantName={participantName} openEdit={openEdit} />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ParticipantWithProvider;
