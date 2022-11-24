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
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';

const ListPublicLeaderboard = () => {
  const { publicLeaderboards } = useLeaderboardData();
  return (
    <>
      <SimpleGrid color='gray.600' columns={[null, 1, 2, 3]} spacing='24px' justifyItems='center'>
        {publicLeaderboards?.map((leaderboard, index) => (
          <Box
            p={6}
            pb={2}
            w='100%'
            maxW='384px'
            minW='300px'
            borderWidth='1px'
            borderColor='gray.200'
            borderRadius='lg'
            key={index}
          >
            <VStack gap='8px' align='start'>
              <VStack align='start' spacing={1} w='100%'>
                <HStack justify='space-between' w='100%'>
                  <Heading color='black' as='h4' size='md'>
                    {index + 1}º Lugar geral
                  </Heading>
                  <Spacer />
                  <Text fontSize='14px'>{leaderboard.generalScore} pontos</Text>
                </HStack>
              </VStack>

              <HStack fontSize='14px' align='start' gap='24px'>
                <VStack align='start' spacing={0}>
                  <Text as='b' color='gray.700' textTransform='capitalize'>
                    {leaderboard.nickname}
                  </Text>
                  <Text fontSize='sm'>{leaderboard.category.name}</Text>
                </VStack>
              </HStack>
              <HStack fontSize='14px' width='100%'>
                <Accordion allowToggle width='100%'>
                  <AccordionItem borderBottom='none'>
                    <AccordionButton>
                      <HStack justify='center' w='100%'>
                        <Box textAlign='left' as='b'>
                          Mostrar mais
                        </Box>
                        <AccordionIcon />
                      </HStack>
                    </AccordionButton>
                    <AccordionPanel p={3}>
                      {!leaderboard.results.length && (
                        <Text fontSize='0.8rem' as='b' color='gray.600' size='sm'>
                          Sem resultados
                        </Text>
                      )}
                      {leaderboard.results?.map((content, index) => (
                        <HStack justify='space-between' w='100%' key={index + 'result'}>
                          <Text fontSize='0.8rem' as='b' color='gray.600' size='sm'>
                            {content.workout.name} ({content.classification} lugar)
                          </Text>
                          <Spacer />
                          <Text fontSize='12px' minW='50px'>
                            {content.points} pontos
                          </Text>
                        </HStack>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ListPublicLeaderboard;
