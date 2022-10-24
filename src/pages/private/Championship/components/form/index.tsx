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

interface CreateModalProps {
  onClose: () => void;
}

const FormChampionship = ({ onClose }: CreateModalProps) => {
  const { Create } = useChampionshipData();

  const getBanner = (e: any) => {
    const banner = e.target.files[0];
    console.log(banner);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ChampionshipDTO>();

  const onSubmit: SubmitHandler<ChampionshipDTO> = async (championship) => {
    console.log(championship, '1');

    await Create(championship);
    console.log(championship, '2');

    console.log(championship, '3');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack pt={4} pb={4} align='start' spacing='24px'>
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
                {...register('banner', { required: validationMessages['required'] })}
              />
              <FormErrorMessage>{errors.banner && errors.banner.message}</FormErrorMessage>
            </FormControl>

            <ButtonGroup flexDirection='column' alignItems='end' gap='12px' w='100%'>
              <Button w='100%' isLoading={isSubmitting} colorScheme='teal' type='submit'>
                Adicionar
              </Button>
              <Button w='100%' variant='outline' onClick={onClose}>
                Fechar
              </Button>
            </ButtonGroup>
          </VStack>
        </VStack>
      </form>
    </>
  );
};

export default FormChampionship;
