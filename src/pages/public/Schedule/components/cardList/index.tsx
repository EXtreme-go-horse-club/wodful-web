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
        {schedules?.map((schedule) => (
          <Box
            className={schedule.isLive ? 'live' : 'off'}
            p={6}
            pb={2}
            w='100%'
            maxW='384px'
            minW='300px'
            key={schedule.id}
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
                        <AccordionIcon />
                      </HStack>
                    </AccordionButton>
                    {isMobile && (
                      <AccordionPanel p={0}>
                        {schedule.subscriptions?.map((subscription, index) => (
                          <HStack justify='space-between' w='100%' key={index}>
                            <Text fontSize='16px' as='b' color='gray.600' size='sm'>
                              {subscription.nickname}
                            </Text>
                          </HStack>
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
          <Text fontSize='16px' as='b' p='8px 0px' color='gray.700' size='sm'>
            {activity.workout?.name}
          </Text>
        </VStack>
        <Divider />
        {activity.subscriptions?.map((team, index) => (
          <HStack justify='space-between' w='100%' p='10px' key={index}>
            <Text fontSize='16px' as='b' p='4px 0px' color='gray.600' size='sm'>
              {team.nickname}
            </Text>
          </HStack>
        ))}
      </ComponentModal>
    </>
  );
};

export default ListCardPublicSchedule;
