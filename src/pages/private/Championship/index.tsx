import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IChampionship } from '@/data/interfaces/championship';
import { ChampionshipService } from '@/services/Championship';
import { Box, Button, Center, Flex, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CreateChampionship from './components/CreateChampionship';
import ListChampionship from './components/ListChampionship';

const Championship = () => {
  const axios = new AxiosAdapter();
  const [championships, setChampionships] = useState<IChampionship[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getChampionships();
  }, []);

  const getChampionships = async () => {
    await new ChampionshipService(axios)
      .listAllChampionships()
      .then((championships: IChampionship) => {
        setChampionships(championships as unknown as IChampionship[]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Center>
      <Box w='100%' display='flex' flexDirection='column' alignItems='center' as='section' px={10}>
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

        <CreateChampionship isOpen={isOpen} onClose={onClose} />

        <SimpleGrid maxW='1200px' gap='24px' color='gray.600' columns={3} spacing={2}>
          <ListChampionship championships={championships} />
        </SimpleGrid>
      </Box>
    </Center>
  );
};

export default Championship;
