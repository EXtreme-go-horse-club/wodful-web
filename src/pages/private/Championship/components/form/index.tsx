import { ChampionshipDTO, IChampionship } from '@/data/interfaces/championship';
import useChampionshipData from '@/hooks/useChampionshipData';
import { validationMessages } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormChampionshipProps {
  onClose: () => void;
  oldChampionship?: IChampionship;
  resetChampionship: () => void;
}

const FormChampionship = ({
  onClose,
  oldChampionship,
  resetChampionship,
}: IFormChampionshipProps) => {
  const { Create, Edit } = useChampionshipData();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChampionshipDTO>({ mode: 'onChange' });

  useEffect(() => {
    const startDate = oldChampionship?.startDate + '';
    const endDate = oldChampionship?.endDate + '';
    if (oldChampionship?.startDate && oldChampionship?.endDate) {
      reset({
        startDate: startDate.substring(0, 10),
        endDate: endDate.substring(0, 10),
        accessCode: oldChampionship?.accessCode,
        name: oldChampionship?.name,
        address: oldChampionship?.address,
        resultType: oldChampionship?.resultType,
      });
    }
  }, [oldChampionship]);

  const onSubmit: SubmitHandler<ChampionshipDTO> = async (championship) => {
    if (oldChampionship) {
      const editedChampionship = {
        championshipId: oldChampionship.id,
        name: championship.name,
        startDate: championship.startDate,
        endDate: championship.endDate,
        accessCode: championship.accessCode,
        address: championship.address,
      };
      await Edit(editedChampionship);
      resetChampionship();
      onClose();
      return;
    }
    const banner = championship.banner as FileList;
    championship.banner = banner[0];
    championship.accessCode = championship.accessCode.toUpperCase();
    await Create(championship);
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align='start' pb={4} spacing='24px'>
          <VStack align='start' w='100%' flexDirection='column' gap='24px'>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel mb={2}>Nome</FormLabel>
              <Input
                placeholder='Nome do campeonato'
                {...register('name', {
                  required: validationMessages['required'],
                  minLength: { value: 4, message: validationMessages['minLength'] },
                  maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
                })}
              />
              <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
            </FormControl>

            <HStack width='100%'>
              <FormControl alignItems='start' isInvalid={!!errors.startDate}>
                <FormLabel mb={2}>Data de início</FormLabel>
                <Input
                  type='date'
                  placeholder='DD/MM/AAAA'
                  {...register('startDate', {
                    required: validationMessages['required'],
                  })}
                />
                <FormErrorMessage>{errors.startDate && errors.startDate.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.endDate}>
                <FormLabel mb={2}>Data de encerramento</FormLabel>
                <Input
                  type='date'
                  placeholder='DD/MM/AAAA'
                  {...register('endDate', {
                    required: '* Campo obrigatório',
                  })}
                />
                <FormErrorMessage>{errors.endDate && errors.endDate.message}</FormErrorMessage>
              </FormControl>
            </HStack>

            <FormControl isInvalid={!!errors.address}>
              <FormLabel mb={2}>Local</FormLabel>
              <Input
                placeholder='Endereço'
                {...register('address', {
                  required: validationMessages['required'],
                  minLength: { value: 4, message: validationMessages['minLength'] },
                  maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
                })}
              />
              <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.accessCode}>
              <FormLabel mb={2}>Código do campeonato</FormLabel>
              <Input
                textTransform='uppercase'
                placeholder='Código'
                {...register('accessCode', {
                  required: validationMessages['required'],
                  minLength: { value: 4, message: validationMessages['minLength'] },
                  maxLength: { value: 20, message: validationMessages['maxLengthSm'] },
                })}
              />
              <FormErrorMessage>{errors.accessCode && errors.accessCode.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.resultType}>
              <FormLabel mb={2}>Tipo de resultado</FormLabel>
              <Select
                {...register('resultType', { required: validationMessages['required'] })}
                placeholder='Selecione o tipo'
                disabled={!!oldChampionship?.resultType}
              >
                <option value='SCORE'>Pontuação</option>
                <option value='RANKING'>Colocação</option>
              </Select>
              <FormErrorMessage>{errors.resultType && errors.resultType.message}</FormErrorMessage>
            </FormControl>
            {!oldChampionship?.resultType && (
              <FormControl isInvalid={!!errors.banner}>
                <FormLabel mb={2}>Capa do campeonato</FormLabel>
                <Input
                  p={1}
                  type='file'
                  multiple={false}
                  {...register('banner', { required: validationMessages['required'] })}
                />
                <FormErrorMessage>{errors.banner && errors.banner.message}</FormErrorMessage>
              </FormControl>
            )}

            <ButtonGroup flexDirection='column' alignItems='end' gap='12px' w='100%'>
              <Button w='100%' isLoading={isSubmitting} colorScheme='teal' type='submit'>
                {!oldChampionship ? 'Adicionar' : 'Editar'}
              </Button>
            </ButtonGroup>
          </VStack>
        </VStack>
      </form>
    </>
  );
};

export default FormChampionship;
