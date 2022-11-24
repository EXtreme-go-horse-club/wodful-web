import { Loader } from '@/components/Loader';
import { CategoryProvider } from '@/contexts/category';
import { ScheduleProvider } from '@/contexts/schedule';
import useScheduleData from '@/hooks/useScheduleData';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { RefreshCw } from 'react-feather';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIsAttList = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

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
            <Flex
              as='article'
              role='textbox'
              direction='row'
              justifyContent='space-between'
              align='baseline'
            >
              <Text fontSize='2xl' as='b' role='heading'>
                Cronograma
              </Text>
              <Button
                gap='10px'
                rightIcon={<RefreshCw size={16} />}
                isLoading={isLoading}
                loadingText='Atualizando'
                spinnerPlacement='end'
                color='teal.500'
                variant={'ghost'}
                onClick={() => {
                  PublicList(code!);
                  handleIsAttList();
                }}
              >
                Atualizar
              </Button>
            </Flex>
          </Flex>
          <Box as='section' w='100%' p='1.5rem 0px' maxW='1280px'>
            <ListCardPublicSchedule />
          </Box>
        </Box>
      </Center>
    </Suspense>
  );
};

export default PublicSchedule;
