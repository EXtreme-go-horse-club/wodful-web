import {
  Box,
  Heading,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MapPin } from 'react-feather';

import useChampionships from '@/hooks/useChampionshipData';
import { formatDate } from '@/utils/formatDate';
import { useEffect } from 'react';
import { Link as ReactRouter } from 'react-router-dom';

const resultType: { [key: string]: string } = {
  SCORE: 'Pontuação',
  RANKING: 'Colocação',
};

const ListChampionship = () => {
  const { List, championships } = useChampionships();

  useEffect(() => {
    List();
  }, [List]);
  return (
    <>
      {championships?.map((championship) => (
        <LinkBox
          as='section'
          maxW='384px'
          borderWidth='1px'
          borderColor='gray.200'
          borderRadius='lg'
          key={championship.id}
          cursor='pointer'
        >
          <LinkOverlay as={ReactRouter} to={`${championship.id}/tickets`}>
            <Stack h='100px' overflow='hidden'>
              <Image
                borderTopRadius='lg'
                src={`${import.meta.env.VITE_BASE_SERVER_URL}/banner/${championship.banner}`}
              />
            </Stack>
            <Box p={6}>
              <VStack gap='8px' align='start'>
                <VStack align='start' spacing={1}>
                  <Heading color='black' as='h4' size='md'>
                    {championship.name}
                  </Heading>
                  <Text fontSize='14px'>
                    {formatDate(`${championship.startDate}`)} até{' '}
                    {formatDate(`${championship.endDate}`)}
                  </Text>
                </VStack>

                <HStack fontSize='14px' align='start' gap='24px'>
                  <VStack align='start' spacing={0}>
                    <Text as='b'>Código de acesso</Text>
                    <Text fontSize='sm'>{championship.accessCode}</Text>
                  </VStack>
                  <VStack align='start' spacing={0}>
                    <Text as='b'>Tipo de resultado</Text>
                    <Text>{resultType[championship.resultType]}</Text>
                  </VStack>
                </HStack>
                <HStack fontSize='14px'>
                  <MapPin size={16} />
                  <Text>{championship.address}</Text>
                </HStack>
              </VStack>
            </Box>
          </LinkOverlay>
        </LinkBox>
      ))}
    </>
  );
};

export default ListChampionship;
