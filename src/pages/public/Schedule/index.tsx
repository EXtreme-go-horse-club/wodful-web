import { Loader } from '@/components/Loader';
import { CategoryProvider } from '@/contexts/category';
import { ScheduleProvider } from '@/contexts/schedule';
import useScheduleData from '@/hooks/useScheduleData';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ValidateAccess } from '../Leaderboard/helper/ValidateAccess';
import ListCardPublicSchedule from './components/cardList';

const PublicSchedule = () => {
  return (
    <ScheduleProvider>
      <CategoryProvider>
        <PublicScheduleAccess />
      </CategoryProvider>
    </ScheduleProvider>
  );
};

const PublicScheduleAccess = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { PublicList } = useScheduleData();

  useEffect(() => {
    if (code) PublicList(code);
  }, [PublicList, code]);

  useEffect(() => {
    ValidateAccess.verify(code as string, navigate);
  }, [code, navigate]);
  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Center as='main' role='main'>
        <Box
          w='100%'
          maxW='1280px'
          display='flex'
          flexDirection='column'
          alignItems='center'
          as='section'
          px={10}
        >
          <Flex
            as='section'
            role='textbox'
            w='100%'
            mt={4}
            justifyContent='space-between'
            direction={['column', 'row', 'row']}
          >
            <Flex as='article' role='textbox' direction='column' gap='0.75rem'>
              <Text fontSize='2xl' as='b' role='heading'>
                Cronograma
              </Text>
            </Flex>
          </Flex>
          <Box as='section' w='100%' maxW='1280px' marginTop={6}>
            <ListCardPublicSchedule />
          </Box>
        </Box>
      </Center>
    </Suspense>
  );
};

export default PublicSchedule;
