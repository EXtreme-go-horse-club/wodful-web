import { validationMessages } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface CreateModalProps {
  id: string;
  participantsNumber: number;
}

const FormSubscriptionParticipants = ({ id, participantsNumber }: CreateModalProps) => {
  const [indexes, setIndexes] = useState<number[]>([]);
  const [counter, setCounter] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    console.log(participantsNumber);
    for (let index = 1; index <= participantsNumber; index++) {
      setIndexes((indexes) => [...indexes, index]);
    }
  }, [participantsNumber]);

  function onSubmit(subscription: any) {
    console.log(subscription);
    // subscription.championshipId = id;
    // Create(subscription);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={6} flexDirection='column'>
        {indexes.length == 1 && <Text as='b'>Dados do participante</Text>}
        <FormControl isInvalid={!!errors.nickname}>
          <FormLabel htmlFor='nickname' m={0}>
            {indexes.length > 1 ? 'Apelido' : 'Nome do time'}
          </FormLabel>
          <Input
            as='input'
            id='nickname'
            placeholder='Nome do participante'
            {...register('nickname', {
              required: validationMessages['required'],
            })}
          />

          <FormErrorMessage></FormErrorMessage>
        </FormControl>
        {indexes.length > 1 && <Text as='b'>Dados dos participantes</Text>}
      </VStack>
      {indexes.map((index) => {
        const participants = `participants[${index}]`;
        return (
          <VStack key={index} align='start' w='100%' spacing={6} pb={6} flexDirection='column'>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor={`${participants}.name`} m={0}>
                {indexes.length > 1 ? `Atleta ${index}` : 'nome'}
              </FormLabel>
              <Input
                as='input'
                id={`${participants}.name`}
                placeholder='Nome do participante'
                {...register(`${participants}.name`, {
                  required: validationMessages['required'],
                })}
              />

              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <HStack>
              <FormControl isInvalid={!!errors.identificationCode} w='50%'>
                <FormLabel htmlFor={`${participants}.identificationCode`} m={0}>
                  Documento
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.identificationCode`}
                  placeholder='Informe o RG ou CPF'
                  {...register(`${participants}.identificationCode`, {
                    required: validationMessages['required'],
                  })}
                />

                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.tShirtSize} w='50%'>
                <FormLabel htmlFor={`${participants}.tShirtSize`} m={0}>
                  Camiseta
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.tShirtSize`}
                  placeholder='Tamanho'
                  {...register(`${participants}.tShirtSize`, {
                    required: validationMessages['required'],
                  })}
                />

                <FormErrorMessage></FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isInvalid={!!errors.city}>
                <FormLabel htmlFor={`${participants}.city`} m={0}>
                  Cidade
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.city`}
                  placeholder='Cidade do participante'
                  {...register(`${participants}.city`, {
                    required: validationMessages['required'],
                  })}
                />

                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.affiliation}>
                <FormLabel htmlFor={`${participants}.affiliation`} m={0}>
                  Box
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.affiliation`}
                  placeholder='Box do participante'
                  {...register(`${participants}.affiliation`, {
                    required: validationMessages['required'],
                  })}
                />

                <FormErrorMessage></FormErrorMessage>
              </FormControl>
            </HStack>
          </VStack>
        );
      })}
      <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
        <Button colorScheme='teal' w='100%' mt={4} type='submit' disabled={!isValid}>
          Próximo
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormSubscriptionParticipants;
