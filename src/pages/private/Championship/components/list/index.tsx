import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'react-feather';
import { Link as ReactRouter } from 'react-router-dom';

import { IChampionship } from '@/data/interfaces/championship';
import useApp from '@/hooks/useApp';
import { default as useChampionshipData } from '@/hooks/useChampionshipData';
import { formatDate } from '@/utils/formatDate';

const resultType: { [key: string]: string } = {
  SCORE: 'Pontuação',
  RANKING: 'Colocação',
};

const ListChampionship = () => {
  const { ListPaginated, championshipsPages, page, limit, setPage, isLoading } =
    useChampionshipData();

  const { setCurrentChampionship } = useApp();

  useEffect(() => {
    ListPaginated();
  }, [ListPaginated]);

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };
  return (
    <>
      <SimpleGrid maxW='1200px' w='100%' color='gray.600' columns={[null, 1, 2, 3]} spacing='24px'>
        {championshipsPages.results?.map((championship) => (
          <LinkBox
            as='section'
            maxW='384px'
            borderWidth='1px'
            borderColor='gray.200'
            borderRadius='lg'
            key={championship.id}
            cursor='pointer'
          >
            <LinkOverlay
              as={ReactRouter}
              to={`${championship.id}/tickets`}
              onClick={() => {
                setCurrentChampionship(championship as IChampionship);
              }}
            >
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
      </SimpleGrid>

      {championshipsPages.count && (
        <Box mt='24px'>
          <HStack>
            <Tooltip label='Página anterior' placement='top' hasArrow>
              <Button
                disabled={!championshipsPages.previous || isLoading}
                variant='link'
                onClick={previousPage}
              >
                <ChevronLeft color={championshipsPages.previous ? 'black' : 'gray'} size={16} />
              </Button>
            </Tooltip>
            <Text>
              {page * limit - (limit - 1)} - {page * limit} de {championshipsPages.count}
            </Text>

            <Tooltip label='Próxima página' placement='top' hasArrow>
              <Button
                disabled={!championshipsPages.next || isLoading}
                variant='link'
                onClick={nextPage}
              >
                <ChevronRight color={championshipsPages.next ? 'black' : 'gray'} size={16} />
              </Button>
            </Tooltip>
          </HStack>
        </Box>
      )}
    </>
  );
};

export default ListChampionship;
