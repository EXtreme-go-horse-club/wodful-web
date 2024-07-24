import useLeaderboardData from '@/hooks/useLeaderboardData';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { Info } from 'react-feather';

const ListPublicLeaderboard = () => {
  const { publicLeaderboards } = useLeaderboardData();

  const isScore = useCallback((value: string) => value.includes(':'), []);
  return (
    <>
      <SimpleGrid color='gray.600' columns={[null, 1, 2, 3]} spacing='24px' justifyItems='center'>
        {publicLeaderboards?.map((leaderboard, index) => (
          <Box
            p={4}
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
                    {leaderboard.ranking === 0 ? (
                      'Sem resultados'
                    ) : (
                      <Flex gap={'2'}>
                        <Text
                          as={'h3'}
                          color={'blue.500'}
                          fontSize={'medium'}
                          background={'#31979517'}
                          p={'0.125rem 0.25rem'}
                          borderRadius={'0.25rem'}
                        >
                          {leaderboard.ranking}º{' '}
                        </Text>
                        <Text>Lugar geral</Text>
                      </Flex>
                    )}
                  </Heading>
                  <Spacer />
                  <Text fontSize='14px'>
                    {leaderboard.generalScore}
                    {leaderboard.generalScore === 1 ? ' ponto' : ' pontos'}
                  </Text>
                </HStack>
              </VStack>

              <HStack fontSize='14px' align='start' gap='24px' w='100%'>
                <VStack align='start' spacing={0} w='100%'>
                  <Accordion allowToggle width='100%'>
                    <AccordionItem border='none'>
                      {({ isExpanded }) => (
                        <>
                          <AccordionButton p={'0'}>
                            <HStack justify='flex-start' w='100%'>
                              <Text
                                as='b'
                                color='gray.700'
                                textTransform='capitalize'
                                textOverflow={'ellipsis'}
                                whiteSpace={'nowrap'}
                                overflow={'hidden'}
                              >
                                {leaderboard.nickname}
                              </Text>
                              <Box textAlign='left'>
                                {isExpanded ? (
                                  <Info size={'14px'} />
                                ) : (
                                  <Info color='#2b6cb0' size={'14px'} />
                                )}
                              </Box>
                            </HStack>
                          </AccordionButton>
                          <AccordionPanel py={0.5} px={0}>
                            <VStack align='start' spacing={0}>
                              <Text as='small' textTransform='capitalize'>
                                {leaderboard.participants
                                  .map((participant) => {
                                    const splitName = participant.name.split(' ');
                                    return splitName.length > 1
                                      ? `${splitName[0]} ${splitName[splitName.length - 1]}`
                                      : splitName[0];
                                  })
                                  .join(' - ')}
                              </Text>
                              <Text as='small' textTransform='capitalize'>
                                {leaderboard.participants
                                  .map((participant) => participant.affiliation)
                                  .join(' - ')}
                              </Text>
                            </VStack>
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  </Accordion>

                  <Text fontSize='sm'>{leaderboard.category.name}</Text>
                </VStack>
              </HStack>
              <HStack fontSize='14px' width='100%'>
                <Accordion allowToggle width='100%'>
                  <AccordionItem borderBottom='none'>
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton>
                          <HStack justify='center' w='100%'>
                            <Box textAlign='left' as='b'>
                              {isExpanded ? 'Esconder' : 'Mostrar'} resultados
                            </Box>
                            <AccordionIcon />
                          </HStack>
                        </AccordionButton>
                        <AccordionPanel py={3} px={0}>
                          {!leaderboard.results.length && (
                            <Text fontSize='0.8rem' as='b' color='gray.600' size='sm'>
                              Sem resultados
                            </Text>
                          )}
                          {leaderboard.results?.map((content, index) => (
                            <Flex
                              direction='column'
                              mb='10px'
                              align='center'
                              key={index + 'result'}
                            >
                              <HStack justify='space-between' w='100%'>
                                <Text fontSize='0.8rem' as='b' color='gray.600' size='sm'>
                                  {content.workout.name}
                                </Text>
                                <Spacer />
                                <Text fontSize='12px' minW='50px'>
                                  {content.points} {content.points === 1 ? ' ponto' : ' pontos'}
                                </Text>
                              </HStack>
                              <HStack w='100%'>
                                <Text fontSize='12px' minW='50px'>
                                  {content.classification} lugar - {content.result}
                                  {isScore(content.result) ? ' min' : ' reps'}
                                </Text>
                                <Spacer />
                              </HStack>
                            </Flex>
                          ))}
                        </AccordionPanel>
                      </>
                    )}
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
