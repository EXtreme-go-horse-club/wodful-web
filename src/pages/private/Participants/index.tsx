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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, Suspense, lazy, useState } from 'react';
import { Menu as MenuIcon, Search } from 'react-feather';
import FormParticipant from './components/form';
import FormKit from './components/formKit';
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
  const [searchBy, setSearchBy] = useState<string>('');
  const [whichModal, setWhichModal] = useState<'EDIT' | 'MEDAL' | 'KIT'>('EDIT');
  const [participant, setParticipant] = useState<IParticipant>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { ExportToCSV, ExportContactsToCSV } = useParticipantData();
  const { currentChampionship } = useApp();
  const toast = useToast();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.length;
    return name >= 3 ? setSearchBy(event.target.value) : setSearchBy('');
  };

  const openModal = (whichOne: 'EDIT' | 'MEDAL' | 'KIT', participantObj: IParticipant) => {
    setWhichModal(whichOne);
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

  const exportContactsToCsv = () => {
    AnalyticsAdapter.event({
      action: 'exportar_contatos_inscricoes',
      category: 'ADM',
      label: 'Exportar contatos',
      value: `contatos`,
    });

    ExportContactsToCSV(currentChampionship.id);

    toast({
      title: participantMessages['success_export_contacts'],
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
                  w='73%'
                  minW='320px'
                  placeholder='Buscar participante ou time'
                />
              </InputGroup>
              <Menu>
                <Tooltip label='Opções de exportação de relatórios' hasArrow>
                  <MenuButton
                    as={Button}
                    w={'100%'}
                    color={'white'}
                    textColor={'#2D3748'}
                    variant='outline'
                    leftIcon={<MenuIcon size={18} />}
                    type='button'
                  >
                    Opções
                  </MenuButton>
                </Tooltip>
                <MenuList>
                  <MenuItem onClick={exportToCsv}>Exportar camisas</MenuItem>
                  <MenuItem onClick={exportContactsToCsv}>Exportar contatos</MenuItem>
                </MenuList>
              </Menu>
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
          {whichModal === 'KIT' && <FormKit onClose={onClose} idParticipant={participant!.id} />}
        </ComponentModal>

        <Box w='100%' marginTop={6}>
          <ListParticipants participantOrTeamName={searchBy} openModal={openModal} />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ParticipantWithProvider;
