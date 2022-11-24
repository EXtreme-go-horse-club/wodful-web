import ComponentModal from '@/components/Modal';
import { IPublicSchedule } from '@/data/interfaces/schedule';
import useScheduleData from '@/hooks/useScheduleData';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Tag,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import '../lists.css';

const ListCardPublicSchedule = () => {
  const { schedules } = useScheduleData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isMobile } = useWindowDimensions();
  const [activity, setActivity] = useState<IPublicSchedule>({} as IPublicSchedule);

  const handleModalEvent = useCallback(
    (schedule: IPublicSchedule) => {
      if (!isMobile) {
        onOpen();
        setActivity(schedule);
      }
    },
    [isMobile, onOpen],
  );

  return (
    <>
      <SimpleGrid color='gray.600' columns={[null, 1, 2, 3]} spacing='24px' justifyItems='center'>
        {schedules?.map((schedule, index) => (
          <Box
            as='article'
            className={schedule.isLive ? 'live' : 'off'}
            p={6}
            pb={2}
            w='100%'
            maxW='384px'
            minW='300px'
            key={`${index}_${schedule.id}`}
          >
            <VStack gap='8px' align='start'>
              <VStack align='start' spacing={1} w='100%'>
                <HStack justify='space-between' w='100%'>
                  <Heading color='black' as='h4' size='md'>
                    {schedule.hour}
                  </Heading>
                  {schedule.isLive && (
                    <Text p='0px 5px' as='b' fontSize='12px' color='red.500'>
                      L I V E
                    </Text>
                  )}

                  <Spacer />
                  <Tag
                    size='sm'
                    textTransform='capitalize'
                    key='sm'
                    variant='solid'
                    colorScheme='teal'
                  >
                    {schedule.category.name}
                  </Tag>
                </HStack>
              </VStack>

              <HStack as='article' fontSize='14px' mt='0px' align='start'>
                <VStack align='start'>
                  <Text fontSize='sm' textTransform='capitalize'>
                    {schedule.workout.name}
                  </Text>
                </VStack>
              </HStack>
              <HStack fontSize='14px' width='100%'>
                <Accordion allowToggle width='100%'>
                  <AccordionItem borderBottom='none'>
                    <AccordionButton onClick={() => handleModalEvent(schedule)}>
                      <HStack justify='center' w='100%'>
                        <Box textAlign='left' as='b'>
                          Mostrar participantes
                        </Box>
                        {isMobile && <AccordionIcon />}
                      </HStack>
                    </AccordionButton>
                    {isMobile && (
                      <AccordionPanel p={3}>
                        {schedule.subscriptions?.map((subscription, index) => (
                          <Box key={`${Math.random() * 1000}_${index}_${subscription.nickname}`}>
                            <HStack
                              justify='space-between'
                              w='100%'
                              key={`${index * subscription.ranking}_${subscription.nickname}`}
                            >
                              <Text
                                overflow={'hidden'}
                                whiteSpace='nowrap'
                                textOverflow='ellipsis'
                                maxW='165px'
                                fontSize='0.8rem'
                                as='b'
                                color='gray.600'
                                size='sm'
                              >
                                {index + 1}. {subscription.nickname}
                              </Text>
                              <Text fontSize='12px' color='gray.500' size='xs' minW='50px'>
                                {`${subscription.ranking}`}° Lugar
                              </Text>
                            </HStack>
                            <Divider />
                          </Box>
                        ))}
                      </AccordionPanel>
                    )}
                  </AccordionItem>
                </Accordion>
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
      <ComponentModal modalHeader='Detalhes' size='md' isOpen={isOpen} onClose={onClose}>
        <VStack align='start' spacing={1} w='100%'>
          <HStack justify='space-between' w='100%'>
            <Heading color='black' as='h4' size='md'>
              {activity.hour}
            </Heading>
            {activity.isLive && (
              <Text p='0px 5px' as='b' fontSize='12px' color='red.300'>
                L I V E
              </Text>
            )}

            <Spacer />
            <Tag size='sm' key='sm' variant='solid' colorScheme='teal'>
              {activity.category?.name}
            </Tag>
          </HStack>
          <Text textTransform='capitalize' fontSize='16px' p='1rem 0px' color='gray.700' size='sm'>
            {activity.workout?.name}
          </Text>
        </VStack>
        <Divider />
        {activity.subscriptions?.map((team, index) => (
          <Box key={`${Math.random() * 1000}_${index}_${team.nickname}`}>
            <HStack justify='space-between' w='100%' p='5px'>
              <Text
                overflow={'hidden'}
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                maxW='165px'
                fontSize='0.8rem'
                as='b'
                color='gray.600'
                size='sm'
              >
                {index + 1}. {team.nickname}
              </Text>
              <Text fontSize='12px' color='gray.500' size='xs' minW='50px'>
                {`${team.ranking}`}° Lugar
              </Text>
            </HStack>
            <Divider />
          </Box>
        ))}
      </ComponentModal>
    </>
  );
};

export default ListCardPublicSchedule;
