import { IParticipantForm } from '@/data/interfaces/subscription';
import useSubscriptionData from '@/hooks/useSubscriptionData';
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
  const { subscriptionData, setSubscriptionData, Create, setParticipantsForm } =
    useSubscriptionData();
  const [indexes, setIndexes] = useState<number[]>([]);
  // const [counter, setCounter] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IParticipantForm>({
    mode: 'onChange',
  });

  function isValidCPF(value: string) {
    if (typeof value !== 'string') {
      return false;
    }

    value = value.replace(/[^\d]+/g, '');

    if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
      return false;
    }

    const values = value.split('').map((el) => +el);
    const rest = (count: any) =>
      ((values.slice(0, count - 12).reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
      10;

    return rest(10) === values[9] && rest(11) === values[10];
  }

  useEffect(() => {
    console.log(participantsNumber);
    for (let index = 0; index < participantsNumber; index++) {
      setIndexes((indexes) => [...indexes, index]);
    }
  }, [participantsNumber]);

  function onSubmit(subscription: any) {
    console.log(subscription);
    setParticipantsForm(subscription);
    // subscription.championshipId = id;
    Create();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={6} flexDirection='column'>
        {indexes.length == 1 && <Text as='b'>Dados do participante</Text>}
        <FormControl isInvalid={!!errors.nickname}>
          <FormLabel htmlFor='nickname' mb={2}>
            {indexes.length > 1 ? 'Nome do time' : 'Apelido'}
          </FormLabel>
          <Input
            as='input'
            id='nickname'
            placeholder={indexes.length > 1 ? 'Informe o nome do time' : 'Apelido do participante'}
            {...register('nickname', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
            })}
          />

          <FormErrorMessage>{errors.nickname && errors.nickname.message}</FormErrorMessage>
        </FormControl>
        {indexes.length > 1 && <Text as='b'>Dados dos participantes</Text>}
      </VStack>
      {indexes.map((index) => {
        const participants = `participants[${index}]`;
        console.log(errors);
        return (
          <VStack key={index} align='start' w='100%' spacing={6} pb={6} flexDirection='column'>
            <FormControl isInvalid={!!`${errors}.${participants}.name`}>
              <FormLabel htmlFor={`${participants}.name`} mb={2}>
                {indexes.length > 1 ? `Atleta ${index + 1}` : 'nome'}
              </FormLabel>
              <Input
                as='input'
                id={`${participants}.name`}
                placeholder='Nome do participante'
                {...register(`participants.${index}.name`, {
                  required: validationMessages['required'],
                  minLength: { value: 4, message: validationMessages['minLength'] },
                  maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
                })}
              />

              <FormErrorMessage>
                {errors.participants &&
                  errors.participants![index]?.name &&
                  errors.participants![index]?.name?.message}
              </FormErrorMessage>
            </FormControl>
            <HStack>
              <FormControl isInvalid={!!`${errors}.${participants}.identificationCode`}>
                <FormLabel htmlFor={`${participants}.identificationCode`} mb={2}>
                  Documento
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.identificationCode`}
                  placeholder='Informe o RG ou CPF'
                  {...register(`participants.${index}.identificationCode`, {
                    required: validationMessages['required'],
                    minLength: { value: 9, message: validationMessages['minLength'] },
                    maxLength: { value: 11, message: validationMessages['maxLengthSm'] },
                    validate: (value) => isValidCPF(value) || validationMessages['invalidCode'],
                  })}
                />

                <FormErrorMessage>
                  {errors.participants && errors.participants[index]?.identificationCode?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!`${errors}.${participants}.tShirtSize`} w='50%'>
                <FormLabel htmlFor={`${participants}.tShirtSize`} mb={2}>
                  Camiseta
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.tShirtSize`}
                  placeholder='Tamanho'
                  {...register(`participants.${index}.tShirtSize`, {
                    required: validationMessages['required'],
                    minLength: { value: 1, message: validationMessages['minLength'] },
                    maxLength: { value: 10, message: validationMessages['maxLengthSm'] },
                  })}
                />

                <FormErrorMessage>
                  {errors.participants && errors.participants[index]?.tShirtSize?.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack>
              <FormControl isInvalid={!!`${errors}.${participants}.city`}>
                <FormLabel htmlFor={`${participants}.city`} mb={2}>
                  Cidade
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.city`}
                  placeholder='Cidade do participante'
                  {...register(`participants.${index}.city`, {
                    required: validationMessages['required'],
                    minLength: { value: 4, message: validationMessages['minLength'] },
                    maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
                  })}
                />

                <FormErrorMessage>
                  {errors.participants && errors.participants[index]?.city?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!`${errors}.${participants}.affiliation`}>
                <FormLabel htmlFor={`${participants}.affiliation`} mb={2}>
                  Box
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.affiliation`}
                  placeholder='Box do participante'
                  {...register(`participants.${index}.affiliation`, {
                    required: validationMessages['required'],
                    minLength: { value: 3, message: validationMessages['minLength'] },
                    maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
                  })}
                />

                <FormErrorMessage>
                  {errors.participants && errors.participants[index]?.affiliation?.message}
                </FormErrorMessage>
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
