import { Box, Button, Center, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense, useMemo } from 'react';

import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import { ChampionshipProvider } from '@/contexts/championship';
import useChampionshipData from '@/hooks/useChampionshipData';

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

  const { isOpen, onOpen, onClose } = useDisclosure();

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

                  <Button size='lg' colorScheme='teal' onClick={onOpen}>
                    Criar campeonato
                  </Button>
                </>
              )}
            </Flex>
          </Box>

          <ComponentModal
            modalHeader='Criar Campeonato'
            size='lg'
            isOpen={isOpen}
            onClose={onClose}
          >
            <FormChampionship onClose={onClose} />
          </ComponentModal>

          {hasElements && <ListChampionship />}
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
