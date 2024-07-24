import { Box, Button, Center, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { Suspense, lazy, useMemo, useState } from 'react';

import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import { ChampionshipProvider } from '@/contexts/championship';
import { IChampionship } from '@/data/interfaces/championship';
import useChampionshipData from '@/hooks/useChampionshipData';
import FormConfiguration from '../Configuration/form';

const ListChampionship = lazy(() => import('./components/list'));
const FormChampionship = lazy(() => import('./components/form'));

const ChampionshipWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <ChampionshipProvider onClose={onClose}>
      <Championship />
    </ChampionshipProvider>
  );
};

const Championship = () => {
  const { championshipsPages } = useChampionshipData();
  const [championship, setChampionship] = useState<IChampionship>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modalType, setModalType] = useState<'EDIT' | 'CREATE' | 'CONFIG'>('CREATE');

  const openEdit = (championshipObj: IChampionship) => {
    setChampionship(championshipObj);
    setModalType('EDIT');
    onOpen();
  };

  const openConfig = (championshipObj: IChampionship) => {
    setChampionship(championshipObj);
    setModalType('CONFIG');
    onOpen();
  };

  const openCreate = () => {
    resetChampionship();
    setModalType('CREATE');
    onOpen();
  };

  const resetChampionship = () => {
    setChampionship(undefined);
  };

  const hasElements: boolean = useMemo(() => championshipsPages.count !== 0, [championshipsPages]);

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Center as='main' role='main'>
        <Box
          w='100%'
          display='flex'
          flexDirection='column'
          alignItems='center'
          as='section'
          px={10}
        >
          <Box w='100%' justifyContent='space-between' py={6} maxW='1200px'>
            <Flex
              direction={['column', 'row']}
              gap={['16px', '0px']}
              align='center'
              justifyContent='space-between'
            >
              {hasElements && (
                <>
                  <Heading as='h4' size='md'>
                    Seus eventos
                  </Heading>

                  <Button size='lg' colorScheme='teal' onClick={openCreate}>
                    Criar Evento
                  </Button>
                </>
              )}
            </Flex>
          </Box>

          {(modalType === 'EDIT' || modalType === 'CREATE') && (
            <ComponentModal
              modalHeader={championship ? 'Editar Evento' : 'Novo Evento'}
              size='xl'
              isOpen={isOpen}
              onClose={onClose}
            >
              <FormChampionship
                onClose={onClose}
                oldChampionship={championship}
                resetChampionship={resetChampionship}
              />
            </ComponentModal>
          )}

          {modalType === 'CONFIG' && (
            <ComponentModal
              modalHeader='Configurações do evento'
              size='xl'
              isOpen={isOpen}
              onClose={onClose}
            >
              <FormConfiguration onClose={onClose} champId={championship?.id as string} />
            </ComponentModal>
          )}

          {hasElements && <ListChampionship openEdit={openEdit} openConfig={openConfig} />}
          {!hasElements && (
            <EmptyList
              text='Você não possui um campeonato ainda!'
              contentButton=' Crie um campeonato'
              onClose={onOpen}
            />
          )}
        </Box>
      </Center>
    </Suspense>
  );
};

export default ChampionshipWithProvider;
