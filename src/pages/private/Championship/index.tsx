import { Box, Button, Center, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { Suspense, lazy, memo, useMemo, useState } from 'react';

import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import { ChampionshipProviderMemo as ChampionshipProvider } from '@/contexts/championship';
import { IChampionship } from '@/data/interfaces/championship';
import useChampionshipData from '@/hooks/useChampionshipData';

const ListChampionship = lazy(() => import('./components/list'));
const FormChampionship = lazy(() => import('./components/form'));

const ChampionshipWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <ChampionshipProvider onClose={onClose}>
      <ChampionshipMemo />
    </ChampionshipProvider>
  );
};

const Championship = () => {
  const { championshipsPages } = useChampionshipData();
  const [championship, setChampionship] = useState<IChampionship>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openEdit = (championshipObj: IChampionship) => {
    setChampionship(championshipObj);
    onOpen();
  };

  const openCreate = () => {
    resetChampionship();
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
                    Lista de campeonatos
                  </Heading>

                  <Button size='lg' colorScheme='teal' onClick={openCreate}>
                    Criar campeonato
                  </Button>
                </>
              )}
            </Flex>
          </Box>

          <ComponentModal
            modalHeader={championship ? 'Editar Campeonato' : ' Criar Campeonato'}
            size='lg'
            isOpen={isOpen}
            onClose={onClose}
          >
            <FormChampionship
              onClose={onClose}
              oldChampionship={championship}
              resetChampionship={resetChampionship}
            />
          </ComponentModal>

          {hasElements && <ListChampionship openEdit={openEdit} />}
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

const ChampionshipMemo = memo(Championship);

const ChampionshipWithProviderMemo = memo(ChampionshipWithProvider);

export default ChampionshipWithProviderMemo;
