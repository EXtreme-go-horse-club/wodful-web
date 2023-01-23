import { IParticipantForm } from '@/data/interfaces/subscription';
import useSubscriptionData from '@/hooks/useSubscriptionData';
import { isValidDocument, regexOnlyNumber } from '@/utils/documentVerification';
import { validationMessages } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
  Divider,
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
  participantsNumber: number;
  onClose: () => void;
  resetStep: (step: number, participantsNumber: number) => void;
}

const FormSubscriptionParticipants = ({
  participantsNumber,
  onClose,
  resetStep,
}: CreateModalProps) => {
  const [formatDisplayCpf, setFormatDisplayCpf] = useState<string>('');
  const { Create } = useSubscriptionData();
  const [indexes, setIndexes] = useState<number[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IParticipantForm>({
    mode: 'onChange',
  });

  useEffect(() => {
    for (let index = 0; index < participantsNumber; index++) {
      setIndexes((indexes) => [...indexes, index]);
    }
  }, [participantsNumber]);

  function onSubmit(subscription: IParticipantForm) {
    Create(subscription);
    onClose();
    resetStep(0, 0);
  }

  const formatCpf = (cpfNumber: string) => {
    cpfNumber = regexOnlyNumber(cpfNumber);
    setFormatDisplayCpf(cpfNumber);
  };

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
        return (
          <VStack key={index} w='100%' spacing={6} pb={6} flexDirection='column'>
            <FormControl isInvalid={!!errors.participants && !!errors.participants![index]?.name}>
              <FormLabel htmlFor={`${participants}.name`} mb={2}>
                {indexes.length > 1 ? `Atleta ${index + 1}` : 'Nome'}
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
            <HStack width='100%' align='baseline' gap={4}>
              <FormControl
                isInvalid={
                  !!errors.participants && !!errors.participants![index]?.identificationCode
                }
              >
                <FormLabel htmlFor={`${participants}.identificationCode`} mb={2}>
                  Documento
                </FormLabel>
                <Input
                  as='input'
                  id={`${participants}.identificationCode`}
                  placeholder='Informe o CPF'
                  value={formatDisplayCpf}
                  {...register(`participants.${index}.identificationCode`, {
                    required: validationMessages['required'],
                    minLength: { value: 9, message: validationMessages['minLength'] },
                    maxLength: { value: 20, message: validationMessages['maxLengthSm'] },
                    onChange(event) {
                      formatCpf(event.target.value);
                    },
                    validate: (value) =>
                      isValidDocument(value) || validationMessages['invalidCode'],
                  })}
                />

                <FormErrorMessage>
                  {errors.participants &&
                    errors.participants![index]?.identificationCode &&
                    errors.participants[index]?.identificationCode?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.participants && !!errors.participants![index]?.tShirtSize}
                w='50%'
              >
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
                  {errors.participants &&
                    errors.participants![index]?.tShirtSize &&
                    errors.participants[index]?.tShirtSize?.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>
            <HStack width='100%' align='baseline' gap={4}>
              <FormControl isInvalid={!!errors.participants && !!errors.participants![index]?.city}>
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
                  {errors.participants &&
                    errors.participants![index]?.city &&
                    errors.participants[index]?.city?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.participants && !!errors.participants![index]?.affiliation}
              >
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
                  {errors.participants &&
                    errors.participants![index]?.affiliation &&
                    errors.participants[index]?.affiliation?.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>

            {index + 1 != indexes.length && <Divider />}
          </VStack>
        );
      })}
      <ButtonGroup
        backgroundColor={'white'}
        flexDirection='column'
        alignItems='end'
        gap={6}
        w='100%'
        position='sticky'
        bottom={0}
      >
        <Button colorScheme='teal' w='100%' mt={4} mb={4} type='submit' disabled={!isValid}>
          Adicionar
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default FormSubscriptionParticipants;
