import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { ChampionshipModel } from '@/models/championshipModel';
import { ChampionshipService } from '@/services/Championship';
import { Box, Button, Center, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ChampionshipList from './components/ChampionshipList';

const Championship = () => {
  const axios = new AxiosAdapter();
  const [championships, setChampionships] = useState<ChampionshipModel[]>([]);

  useEffect(() => {
    getChampionships();
  }, []);

  const getChampionships = async () => {
    await new ChampionshipService(axios)
      .listAllChampionships()
      .then((championships: ChampionshipModel) => {
        setChampionships(championships as unknown as ChampionshipModel[]);
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
            <Button onClick={getChampionships} size='lg' colorScheme='teal'>
              Criar campeonato
            </Button>
          </Flex>
        </Box>

        <SimpleGrid maxW='1200px' gap='24px' color='gray.600' columns={3} spacing={2}>
          <ChampionshipList championships={championships} />
        </SimpleGrid>
      </Box>
    </Center>
  );
};

export default Championship;
