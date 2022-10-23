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

enum ResultTypeEnum {
  score = 'SCORE',
  ranking = 'RANKING',
}
interface IFormInpusts {
  name: string;
  startDate: Date;
  endDate: Date;
  accessCode: string;
  banner: File | null;
  resultType: ResultTypeEnum | null;
  address: string;
}

const FormChampionship = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInpusts>();

  const onSubmit: SubmitHandler<IFormInpusts> = (data) => {
    console.log(data);

    setTimeout(() => {
      reset();
    }, 5000);
  };

  return (
    <>
      <VStack pt={4} pb={4} align='start' spacing='24px'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack align='start' w='100%' flexDirection='column' gap='24px'>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel m={0}>Nome</FormLabel>
              <Input
                placeholder='Nome do campeonato'
                {...register('name', {
                  required: '* Campo obrigatório',
                  minLength: { value: 4, message: 'Nome muito curto' },
                  maxLength: { value: 40, message: 'Nome muito longo' },
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
                    required: '* Campo obrigatório',
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
                  required: '* Campo obrigatório',
                  minLength: { value: 4, message: 'Nome muito curto' },
                  maxLength: { value: 50, message: 'Nome muito longo' },
                })}
              />
              <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.accessCode}>
              <FormLabel m={0}>Código do campeonato</FormLabel>
              <Input
                placeholder='Código'
                {...register('accessCode', {
                  required: '* Campo obrigatório',
                  minLength: { value: 4, message: 'Nome muito curto' },
                  maxLength: { value: 20, message: 'Nome muito longo' },
                })}
              />
              <FormErrorMessage>{errors.accessCode && errors.accessCode.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.resultType}>
              <FormLabel m={0}>Tipo de resultado</FormLabel>
              <Select
                {...register('resultType', { required: '* Campo obrigatório' })}
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
                {...register('banner', { required: '* Campo obrigatório' })}
              />
            </FormControl>

            <ButtonGroup flexDirection='column' alignItems='end' gap='12px' w='100%'>
              <Button w='100%' isLoading={isSubmitting} colorScheme='teal' type='submit'>
                Adicionar
              </Button>
              <Button w='100%' variant='outline'>
                Fechar
              </Button>
            </ButtonGroup>
          </VStack>
        </form>
      </VStack>
    </>
  );
};

export default FormChampionship;
