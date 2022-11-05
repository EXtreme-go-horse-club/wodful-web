import { ChampionshipDTO } from '@/data/interfaces/championship';
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

import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormChampionshipProps {
  onClose: () => void;
}

const FormChampionship = ({ onClose }: IFormChampionshipProps) => {
  const { Create } = useChampionshipData();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ChampionshipDTO>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ChampionshipDTO> = async (championship) => {
    const banner = championship.banner as FileList;
    championship.banner = banner[0];
    await Create(championship);
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align='start' pb={4} spacing='24px'>
          <VStack align='start' w='100%' flexDirection='column' gap='24px'>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel m={0}>Nome</FormLabel>
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

            <HStack>
              <FormControl alignItems='start' isInvalid={!!errors.startDate}>
                <FormLabel m={0}>Data de início</FormLabel>
                <Input
                  type='datetime-local'
                  placeholder='DD/MM/AAAA'
                  {...register('startDate', {
                    required: validationMessages['required'],
                  })}
                />
                <FormErrorMessage>{errors.startDate && errors.startDate.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.endDate}>
                <FormLabel m={0}>Data de encerramento</FormLabel>
                <Input
                  type='datetime-local'
                  placeholder='DD/MM/AAAA'
                  {...register('endDate', {
                    required: '* Campo obrigatório',
                  })}
                />
                <FormErrorMessage>{errors.endDate && errors.endDate.message}</FormErrorMessage>
              </FormControl>
            </HStack>

            <FormControl isInvalid={!!errors.address}>
              <FormLabel m={0}>Local</FormLabel>
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
              <FormLabel m={0}>Código do campeonato</FormLabel>
              <Input
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
              <FormLabel m={0}>Tipo de resultado</FormLabel>
              <Select
                {...register('resultType', { required: validationMessages['required'] })}
                placeholder='Selecione o tipo'
              >
                <option value='SCORE'>Pontuação</option>
                <option value='RANKING'>Colocação</option>
              </Select>
              <FormErrorMessage>{errors.resultType && errors.resultType.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.banner}>
              <FormLabel m={0}>Capa do campeonato</FormLabel>
              <Input
                p={1}
                type='file'
                multiple={false}
                {...register('banner', { required: validationMessages['required'] })}
              />
              <FormErrorMessage>{errors.banner && errors.banner.message}</FormErrorMessage>
            </FormControl>

            <ButtonGroup flexDirection='column' alignItems='end' gap='12px' w='100%'>
              <Button w='100%' isLoading={isSubmitting} colorScheme='teal' type='submit'>
                Adicionar
              </Button>
            </ButtonGroup>
          </VStack>
        </VStack>
      </form>
    </>
  );
};

export default FormChampionship;
