import useAuth from '@/hooks/useAuth';
import { Box, Button, Flex, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { MapPin } from 'react-feather';
import { exeChampionships } from './exempleChampionships';

const resultType: { [key: string]: string } = {
  SCORE: 'Pontuação',
  RANKING: 'Colocação',
};

const Championship = () => {
  const { Logout } = useAuth();
  const allChampionships = exeChampionships;

  async function handleLogout() {
    Logout();
  }

  // py={6} px={10}
  return (
    <>
      <Box as='section' px={10}>
        <Box py={6}>
          <Flex
            direction={['column', 'row']}
            gap={['16px', '0px']}
            align='center'
            justifyContent='space-between'
          >
            <Heading as='h4' size='md'>
              Lista de campeonatos
            </Heading>
            <Button size='lg' colorScheme='teal'>
              Criar campeonato
            </Button>
          </Flex>
        </Box>

        <Box color='gray.600' as='section'>
          {allChampionships.map((championship) => (
            <Box
              as='section'
              maxW='384px'
              borderWidth='1px'
              borderColor='gray.200'
              borderRadius='lg'
              key={championship.name}
            >
              <Stack h='100px' overflow='hidden'>
                <Image borderTopRadius='lg' src={allChampionships[0].banner} />
              </Stack>
              <Box p={6}>
                <VStack gap='16px' align='start'>
                  <VStack align='start' spacing={1}>
                    <Heading color='black' as='h4' size='md'>
                      {championship.name}
                    </Heading>
                    <Text>
                      {championship.startDate} até {championship.startDate}
                    </Text>
                  </VStack>

                  <HStack align='start' gap='24px'>
                    <VStack align='start' spacing={0}>
                      <Text as='b'>Código de acesso</Text>
                      <Text fontSize='sm'>{championship.accessCode}</Text>
                    </VStack>
                    <VStack align='start' spacing={0}>
                      <Text as='b'>Tipo de resultado</Text>
                      <Text>{resultType[championship.resultType]}</Text>
                    </VStack>
                  </HStack>
                  <HStack>
                    <MapPin size={16} />
                    <Text>{championship.address}</Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Championship;
