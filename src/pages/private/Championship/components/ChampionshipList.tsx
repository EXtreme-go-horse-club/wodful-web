import { ChampionshipModel } from '@/models/championshipModel';
import { Box, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { MapPin } from 'react-feather';

interface ChampionshipListProps {
  championships: ChampionshipModel[];
}

const resultType: { [key: string]: string } = {
  SCORE: 'Pontuação',
  RANKING: 'Colocação',
};

const ChampionshipList = ({ championships }: ChampionshipListProps) => {
  return (
    <>
      {championships.map((championship) => (
        <Box
          as='section'
          w='384px'
          borderWidth='1px'
          borderColor='gray.200'
          borderRadius='lg'
          key={championship.id}
        >
          <Stack h='100px' overflow='hidden'>
            <Image borderTopRadius='lg' src={championship.banner} />
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
    </>
  );
};

export default ChampionshipList;
