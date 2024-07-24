import ShirtSizeManager from '@/components/Tag/ShirtSizeManager';
import { IConfiguration } from '@/data/interfaces/configuration';
import useChampionshipData from '@/hooks/useChampionshipData';
import { validationMessages } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Info } from 'react-feather';

import { SubmitHandler, useForm } from 'react-hook-form';

export interface IConfigurationForm {
  hasTshirt: string;
  hasNameInTshirt: string;
  tShirtSizes: string[];
  isAutoSchedule: string;
}

interface IFormChampionshipProps {
  onClose: () => void;
  champId: string;
}

const FormConfiguration = ({ onClose, champId }: IFormChampionshipProps) => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IConfigurationForm>({ mode: 'all' });
  const [sizes, setSizes] = useState<string[]>([] as string[]);
  const { GetConfiguration, CreateConfiguration } = useChampionshipData();

  useEffect(() => {
    GetConfiguration(champId).then((conf) => {
      const config = conf as IConfiguration;
      if (config.configuration.id) {
        reset({
          hasNameInTshirt: String(config.configuration.tShirtFlags.hasNameInTshirt),
          hasTshirt: String(config.configuration.tShirtFlags.hasTshirt),
          isAutoSchedule: String(config.configuration.isAutoSchedule),
        });
        setSizes(config.configuration.tShirtFlags.tShirtSizes);
      }
    });
  }, [GetConfiguration, champId, reset]);

  const onSubmit: SubmitHandler<IConfigurationForm> = async (data) => {
    const config = {
      ...data,
      tShirtSizes: sizes,
    };
    CreateConfiguration(champId, config);
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs variant='enclosed'>
          <TabList>
            <Tab>Camisetas</Tab>
            <Tab>Cronograma</Tab>
          </TabList>
          <TabPanels>
            <TabPanel pl='0' pr='0'>
              <VStack align='start' spacing='24px'>
                <VStack align='start' w='100%' flexDirection='column' gap='1rem'>
                  <FormControl isInvalid={!!errors.hasTshirt}>
                    <FormLabel mb={2} display={'flex'} alignItems={'center'} gap={'1.5'}>
                      Camiseta para atletas?
                      <Tooltip
                        label='Disponibiliza ou bloqueia a listagem e seleção de camiseta no formulário de inscrição do evento.'
                        placement='top'
                        hasArrow
                      >
                        <Info color='#2b6cb0' size={'14px'} />
                      </Tooltip>
                    </FormLabel>
                    <Select
                      placeholder='Selecione um valor'
                      {...register('hasTshirt', {
                        required: validationMessages['required'],
                      })}
                    >
                      <option value='true'>Sim</option>
                      <option value='false'>Não</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.hasTshirt && errors.hasTshirt.message}
                    </FormErrorMessage>
                  </FormControl>

                  {watch('hasTshirt') === 'true' && (
                    <>
                      <HStack width='100%'>
                        <FormControl alignItems='start' isInvalid={!!errors.hasNameInTshirt}>
                          <FormLabel mb={2} display={'flex'} alignItems={'center'} gap={'1.5'}>
                            Nome na camiseta?
                            <Tooltip
                              label='Disponibiliza ou bloqueia o campo para personalização de nome na camiseta no formulário de inscrição do evento.'
                              placement='top'
                              hasArrow
                            >
                              <Info color='#2b6cb0' size={'14px'} />
                            </Tooltip>
                          </FormLabel>
                          <Select
                            disabled={!!errors.hasTshirt}
                            placeholder='Selecione um valor'
                            {...register('hasNameInTshirt', {
                              required: validationMessages['required'],
                            })}
                          >
                            <option value='true'>Sim</option>
                            <option value='false'>Não</option>
                          </Select>
                          <FormErrorMessage>
                            {errors.hasNameInTshirt && errors.hasNameInTshirt.message}
                          </FormErrorMessage>
                        </FormControl>
                      </HStack>
                      <HStack width='100%'>
                        <ShirtSizeManager sizes={sizes} setSizes={setSizes} />
                      </HStack>
                    </>
                  )}
                </VStack>
              </VStack>
            </TabPanel>
            <TabPanel pl='0' pr='0'>
              <VStack align='start' w='100%' flexDirection='column' gap='1rem'>
                <FormControl isInvalid={!!errors.isAutoSchedule}>
                  <FormLabel mb={2} display={'flex'} alignItems={'center'} gap={'1.5'}>
                    Ordenação automática?
                    <Tooltip
                      label='Ativa ou desativa a funcionalidade de ordenação automática de atletas nas baias de cada bateria do cronograma com base em sua classificação. Seguindo a ordem do ultimo para o primeiro colocado.'
                      placement='top'
                      hasArrow
                    >
                      <Info color='#2b6cb0' size={'14px'} />
                    </Tooltip>
                  </FormLabel>
                  <Select
                    placeholder='Selecione um valor'
                    {...register('isAutoSchedule', {
                      required: validationMessages['required'],
                    })}
                  >
                    <option value='true'>Sim</option>
                    <option value='false'>Não</option>
                  </Select>
                  <FormErrorMessage>
                    {errors.isAutoSchedule && errors.isAutoSchedule.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <VStack align='start' w='100%' mt={4} mb={4} flexDirection='column' gap='1rem'>
          <ButtonGroup flexDirection='column' alignItems='end' gap='12px' w='100%'>
            <Button
              w='100%'
              isLoading={isSubmitting}
              disabled={!!errors.hasNameInTshirt || !!errors.hasTshirt || !!errors.isAutoSchedule}
              colorScheme='teal'
              type='submit'
            >
              Salvar
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </>
  );
};

export default FormConfiguration;
