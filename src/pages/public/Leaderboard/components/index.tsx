import useLeaderboardData from '@/hooks/useLeaderboardData';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  HStack,
  LinkBox,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';

const ListPublicLeaderboard = () => {
  const { publicLeaderboards } = useLeaderboardData();
  // const [currentTotal, setCurrentTotal] = useState<number>(0);
  // const { ListPaginated, championshipsPages, page, limit, setPage, isLoading, Delete } =
  //   useChampionshipData();

  // const { setCurrentChampionship } = useApp();

  // useEffect(() => {
  //   ListPaginated();
  //   setCurrentTotal(championshipsPages.results?.length);
  // }, [ListPaginated, championshipsPages.results?.length]);

  return (
    <>
      <SimpleGrid maxW='1200px' w='100%' color='gray.600' columns={[null, 1, 2, 3]} spacing='24px'>
        {publicLeaderboards?.map((leaderboard, index) => (
          <LinkBox
            as='section'
            maxW='384px'
            borderWidth='1px'
            borderColor='gray.200'
            borderRadius='lg'
            key={index}
            cursor='pointer'
          >
            <Box p={6}>
              <VStack gap='8px' align='start'>
                <VStack align='start' spacing={1} w='100%'>
                  <HStack justify='space-between' w='100%'>
                    <Heading color='black' as='h4' size='md'>
                      {index + 1}º Lugar geral
                    </Heading>
                    <Spacer />
                    <Text fontSize='14px'>{leaderboard.generalScore} pontos</Text>
                  </HStack>

                  {/* <Text fontSize='14px'>data</Text> */}
                </VStack>

                <HStack fontSize='14px' align='start' gap='24px'>
                  <VStack align='start' spacing={0}>
                    <Text as='b'>{leaderboard.nickname}</Text>
                    <Text fontSize='sm'>{leaderboard.category.name}</Text>
                  </VStack>
                  {/* <VStack align='start' spacing={0}>
                    <Text as='b'>Tipo de resultado</Text>
                    <Text>outro</Text>
                  </VStack> */}
                </HStack>
                <HStack fontSize='14px' width='100%'>
                  <Accordion allowToggle width='100%'>
                    <AccordionItem borderBottom='none'>
                      <AccordionButton>
                        <HStack justify='center' w='100%'>
                          <Box textAlign='left'>Mostrar mais</Box>
                          <AccordionIcon />
                        </HStack>
                      </AccordionButton>
                      <AccordionPanel p={0}>
                        {leaderboard.results?.map((content, index) => (
                          <HStack justify='space-between' w='100%' key={index + 'result'}>
                            <Text fontSize='16px' as='b' color='black' size='sm'>
                              {content.workout.name} ({content.classification} lugar)
                            </Text>
                            <Spacer />
                            <Text fontSize='14px'>{content.points} pontos</Text>
                          </HStack>
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </HStack>
              </VStack>
            </Box>
          </LinkBox>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ListPublicLeaderboard;
