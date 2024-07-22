import AnalyticsAdapter from '@/adapters/AnalyticsAdapter';
import { Loader } from '@/components/Loader';
import { CategoryProvider } from '@/contexts/category';
import { ScheduleProvider } from '@/contexts/schedule';
import useScheduleData from '@/hooks/useScheduleData';
import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { RefreshCw } from 'react-feather';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ValidateAccess } from '../Leaderboard/helper/ValidateAccess';

const ListCardPublicSchedule = lazy(() => import('./components/cardList'));

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
  const location = useLocation();

  const { PublicList } = useScheduleData();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIsAttList = useCallback(() => {
    AnalyticsAdapter.event({
      action: 'buscar_cronograma_atualizado',
      category: 'Atleta',
      label: 'Atualizar cronograma',
      value: `${code}`,
    });

    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (code) PublicList(code);
  }, [PublicList, code]);

  useEffect(() => {
    AnalyticsAdapter.pageview(location.pathname);
  }, [location.pathname]);

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
          px={4}
          marginTop={'130px'}
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
