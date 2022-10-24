import { Box, Button, Center, Flex, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { lazy, Suspense } from 'react';

import ComponentModal from '@/components/modal';
import { ChampionshipProvider } from '@/contexts/championship';

const ListChampionship = lazy(() => import('./components/list'));
const FormChampionship = lazy(() => import('./components/form'));

const Championship = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Suspense fallback={<>loading</>}>
      <ChampionshipProvider onClose={onClose}>
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
                <Button size='lg' colorScheme='teal' onClick={onOpen}>
                  Criar campeonato
                </Button>
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

            <SimpleGrid
              maxW='1200px'
              w='100%'
              color='gray.600'
              columns={[null, 1, 2, 3]}
              spacing='24px'
            >
              <ListChampionship />
            </SimpleGrid>
          </Box>
        </Center>
      </ChampionshipProvider>
    </Suspense>
  );
};

export default Championship;
