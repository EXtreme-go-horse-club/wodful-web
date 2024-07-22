import ComponentModal from '@/components/ComponentModal';
import { EmptyList } from '@/components/EmptyList';
import { Loader } from '@/components/Loader';
import { CategoryProvider } from '@/contexts/category';
import { ChampionshipProvider } from '@/contexts/championship';
import { ScheduleProvider } from '@/contexts/schedule';
import { WorkoutProvider } from '@/contexts/workout';
import { IConfiguration } from '@/data/interfaces/configuration';
import useChampionshipData from '@/hooks/useChampionshipData';
import useScheduleData from '@/hooks/useScheduleData';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { Circle, Menu as MenuIcon } from 'react-feather';
import { useParams } from 'react-router-dom';
import ScheduleForm from './components/form';
import ListSchedule from './components/list';

const ScheduleWithProvider = () => {
  const { onClose } = useDisclosure();

  return (
    <ScheduleProvider onClose={onClose}>
      <ChampionshipProvider onClose={onClose}>
        <CategoryProvider>
          <WorkoutProvider>
            <Schedule />
          </WorkoutProvider>
        </CategoryProvider>
      </ChampionshipProvider>
    </ScheduleProvider>
  );
};

const Schedule = () => {
  const { id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [isAuto, setIsAuto] = useState('false');

  const { schedulePages } = useScheduleData();
  const { GetConfiguration, PatchIsAutoSchedule } = useChampionshipData();

  const hasElements: boolean = useMemo(() => schedulePages.count !== 0, [schedulePages]);

  const handleToggleIsAutomatic = useCallback(
    (value: string) => {
      let key = 'true';
      if (value === 'true') key = 'false';
      if (id) {
        PatchIsAutoSchedule(id, key).then(() => {
          setIsAuto(key);
          setIsOpenOption(false);
        });
      }
    },
    [PatchIsAutoSchedule, id],
  );

  useEffect(() => {
    if (id) {
      GetConfiguration(id).then((conf) => {
        const config = conf as IConfiguration;
        setIsAuto(config.configuration.isAutoSchedule);
      });
    }
  }, [GetConfiguration, id]);

  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Box
        as='main'
        role='main'
        w='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        p={6}
      >
        {hasElements && (
          <>
            <HStack as='section' role='textbox' w='100%' justifyContent='space-between'>
              <Flex as='article' role='textbox' direction='column' gap='0.75rem'>
                <Text fontSize='2xl' as='b' role='heading'>
                  Cronograma
                </Text>
              </Flex>
              <Flex as='article' gap='1rem'>
                <Menu>
                  <MenuButton
                    w={'100%'}
                    color={'white'}
                    textColor={'#2D3748'}
                    variant='outline'
                    as={Button}
                    leftIcon={<MenuIcon size={20} />}
                  >
                    Opções
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      display={'flex'}
                      alignItems={'center'}
                      gap={'8px'}
                      onClick={() => setIsOpenOption(true)}
                    >
                      {isAuto === 'true' ? (
                        <Tooltip label='Ativada' placement='top' hasArrow>
                          <Circle fill='#E53E3E' size={12} color='#E53E3E' />
                        </Tooltip>
                      ) : null}
                      Ordenação automática
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Button minW='170px' w='100%' colorScheme='teal' size='md' onClick={onOpen}>
                  Adicionar atividade
                </Button>
              </Flex>
            </HStack>

            <Box as='section' w='100%' marginTop={6}>
              <ListSchedule championshipId={id as string} />
            </Box>
          </>
        )}

        <ComponentModal
          modalHeader={`${isAuto === 'false' ? 'Ativar' : 'Desativar'} ordenação automática`}
          size='sm'
          isOpen={isOpenOption}
          onClose={() => setIsOpenOption(false)}
        >
          <VStack align='start' w='100%' spacing={6} pb={4} flexDirection='column'>
            <HStack w='100%'>
              <Text fontSize='14px'>
                {`Tem certeza que deseja ${
                  isAuto === 'false' ? 'ativar' : 'desativar'
                } a ordenação automática do cronograma?`}
              </Text>
            </HStack>
            <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
              <Button
                colorScheme='teal'
                w='100%'
                mt={4}
                onClick={() => handleToggleIsAutomatic(isAuto)}
              >
                {`${isAuto === 'false' ? 'Ativar' : 'Desativar'}`}
              </Button>
            </ButtonGroup>
          </VStack>
        </ComponentModal>

        <ComponentModal
          modalHeader='Adicionar atividade ao cronograma'
          size='lg'
          isOpen={isOpen}
          onClose={onClose}
        >
          <ScheduleForm onClose={onClose} />
        </ComponentModal>

        {!hasElements && (
          <EmptyList
            text='Você não possui um cronograma ainda!'
            contentButton='Crie um cronograma'
            onClose={onOpen}
          />
        )}
      </Box>
    </Suspense>
  );
};

export default ScheduleWithProvider;
