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
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

export interface IConfigurationForm {
  hasTshirt: string;
  hasNameInTshirt: string;
  tShirtSizes: string[];
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
        <VStack align='start' pb={4} spacing='24px'>
          <VStack align='start' w='100%' flexDirection='column' gap='24px'>
            <FormControl isInvalid={!!errors.hasTshirt}>
              <FormLabel mb={2}>Camisa para atletas?</FormLabel>
              <Select
                placeholder='Selecione um valor'
                {...register('hasTshirt', {
                  required: validationMessages['required'],
                })}
              >
                <option value='true'>Sim</option>
                <option value='false'>Não</option>
              </Select>
              <FormErrorMessage>{errors.hasTshirt && errors.hasTshirt.message}</FormErrorMessage>
            </FormControl>

            {watch('hasTshirt') === 'true' && (
              <>
                <HStack width='100%'>
                  <FormControl alignItems='start' isInvalid={!!errors.hasNameInTshirt}>
                    <FormLabel mb={2}>Nome na camisa?</FormLabel>
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

            <ButtonGroup flexDirection='column' alignItems='end' gap='12px' w='100%'>
              <Button
                w='100%'
                isLoading={isSubmitting}
                disabled={!!errors.hasNameInTshirt || !!errors.hasTshirt}
                colorScheme='teal'
                type='submit'
              >
                Salvar
              </Button>
            </ButtonGroup>
          </VStack>
        </VStack>
      </form>
    </>
  );
};

export default FormConfiguration;
