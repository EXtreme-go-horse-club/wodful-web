import { Box, Button, Center, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';

import { Loader } from '@/components/Loader';
import ComponentModal from '@/components/Modal';
import { ChampionshipProvider } from '@/contexts/championship';
import useChampionshipData from '@/hooks/useChampionshipData';
import { FolderPlus } from 'react-feather';

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

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Center>
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
              <Heading as='h4' size='md'>
                Lista de campeonatos
              </Heading>

              {championshipsPages.results?.length !== 0 && (
                <Button size='lg' colorScheme='teal' onClick={onOpen}>
                  Criar campeonato
                </Button>
              )}
            </Flex>
          </Box>

          <ComponentModal
            modalHeader='Criar Campeonato'
            size='lg'
            isOpen={isOpen}
            onClose={onClose}
          >
            <FormChampionship />
          </ComponentModal>

          {championshipsPages.results?.length !== 0 ? (
            <ListChampionship />
          ) : (
            <Box display='flex' flexDirection='column' alignItems='center' gap='8px'>
              <FolderPlus size={50} opacity='80%' />
              <Text>Você não possui um campeonato ainda.</Text>
              <Button width='100%' colorScheme='teal' onClick={onOpen}>
                Crie um campeonato
              </Button>
            </Box>
          )}
        </Box>
      </Center>
    </Suspense>
  );
};

export default ChampionshipWithProvider;
