import useWorkoutData from '@/hooks/useWorkoutData';
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
  Text,
  VStack,
} from '@chakra-ui/react';

const ListPublicWorkouts = () => {
  const { publicWorkouts } = useWorkoutData();

  return (
    <>
      <SimpleGrid color='gray.600' columns={[null, 1, 2, 3]} spacing='24px' justifyItems='center'>
        {publicWorkouts?.map((workout) => (
          <Box
            p={4}
            pb={2}
            w='100%'
            maxW='384px'
            minW='300px'
            borderWidth='1px'
            borderColor='gray.200'
            borderRadius='lg'
            key={workout.id}
          >
            <VStack gap='8px' align='start'>
              <Heading color='black' as='h3' size='sm' width={'100%'}>
                <Flex gap={'2'} justify={'space-between'}>
                  <Text>{workout.name}</Text>
                  <Text
                    as={'h4'}
                    color={'blue.500'}
                    fontSize={'medium'}
                    background={'#31979517'}
                    p={'0.125rem 0.25rem'}
                    borderRadius={'0.25rem'}
                    height={'fit-content'}
                  >
                    {workout.workoutType}
                  </Text>
                </Flex>
              </Heading>

              <HStack fontSize='14px' width='100%'>
                <Accordion allowToggle width='100%'>
                  <AccordionItem borderBottom='none'>
                    {({ isExpanded }) => (
                      <>
                        <AccordionButton>
                          <HStack justify='center' w='100%'>
                            <Box textAlign='left' as='b'>
                              {isExpanded ? 'Esconder' : 'Mostrar'}
                            </Box>
                            <AccordionIcon />
                          </HStack>
                        </AccordionButton>
                        <AccordionPanel py={3} px={0}>
                          <Flex direction='column' key={workout.id}>
                            <HStack justify='center' w='100%'>
                              <Text
                                as={'h3'}
                                fontSize='0.8rem'
                                fontWeight={'600'}
                                whiteSpace={'pre-wrap'}
                                color='gray.600'
                                textAlign={'center'}
                                size='sm'
                              >
                                {workout.description}
                              </Text>
                            </HStack>
                          </Flex>
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

export default ListPublicWorkouts;
