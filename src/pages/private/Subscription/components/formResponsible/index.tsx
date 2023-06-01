import { UpdateSubscriptionDTO } from '@/data/interfaces/subscription';
import useSubscriptionData from '@/hooks/useSubscriptionData';
import { regexOnlyNumber } from '@/utils/documentVerification';
import { validationMessages } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface UpdateModalProps {
  subId: string;
  onClose: () => void;
}

const FormResponsible = ({ subId, onClose }: UpdateModalProps) => {
  const [formatDisplayPhone, setFormatDisplayPhone] = useState<string>('');
  const { Get, subscription, Update } = useSubscriptionData();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<UpdateSubscriptionDTO>({
    mode: 'onChange',
  });

  function onSubmit(responsibleData: UpdateSubscriptionDTO) {
    Update(subId, responsibleData).then(() => onClose());
  }

  const formatPhone = (phoneNumber: string) => {
    phoneNumber = regexOnlyNumber(phoneNumber);
    setValue('responsiblePhone', phoneNumber);
  };

  useEffect(() => {
    if (subId) {
      Get(subId).then(() => {
        setValue('nickname', subscription.nickname);
        setValue('responsibleEmail', subscription.responsibleEmail!);
        setValue('responsibleName', subscription.responsibleName);
        setValue('responsiblePhone', subscription.responsiblePhone!);
        setFormatDisplayPhone(subscription.responsiblePhone!);
      });
    }
  }, [
    Get,
    setValue,
    subId,
    subscription.nickname,
    subscription?.responsibleEmail,
    subscription.responsibleName,
    subscription.responsiblePhone,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={6} flexDirection='column'>
        <Text as='b'>Dados do responsável</Text>
        <FormControl isInvalid={!!errors.responsibleName}>
          <FormLabel htmlFor='responsibleName' m={0}>
            Nome
          </FormLabel>
          <Input
            as='input'
            id='responsibleName'
            placeholder='Nome do responsável'
            {...register('responsibleName', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
            })}
          />

          <FormErrorMessage>
            {errors.responsibleName && errors.responsibleName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.responsibleEmail}>
          <FormLabel htmlFor='email' m={0}>
            E-mail
          </FormLabel>
          <Input
            as='input'
            id='responsibleEmail'
            placeholder='E-mail do responsável'
            {...register('responsibleEmail', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: validationMessages['invalidField'],
              },
            })}
          />

          <FormErrorMessage>
            {errors.responsibleEmail && errors.responsibleEmail.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.responsiblePhone}>
          <FormLabel htmlFor='responsiblePhone' m={0}>
            Telefone
          </FormLabel>
          <Input
            id='responsiblePhone'
            placeholder='Telefone do responsável'
            {...register('responsiblePhone', {
              required: validationMessages['required'],
              minLength: { value: 10, message: validationMessages['minLength'] },
              maxLength: { value: 15, message: validationMessages['maxLengthSm'] },
              value: formatDisplayPhone,
              onChange(event) {
                formatPhone(event.target.value);
              },
            })}
          />

          <FormErrorMessage>
            {errors.responsiblePhone && errors.responsiblePhone.message}
          </FormErrorMessage>
        </FormControl>

        <Text as='b'>Dados do Atleta</Text>

        <FormControl isInvalid={!!errors.nickname}>
          <FormLabel htmlFor='nickname' mb={2}>
            {'Nome do time ou apelido'}
          </FormLabel>
          <Input
            as='input'
            id='nickname'
            placeholder={'Informe o nome do time ou apelido'}
            {...register('nickname', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
            })}
          />

          <FormErrorMessage>{errors.nickname && errors.nickname.message}</FormErrorMessage>
        </FormControl>
        <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
          <Button colorScheme='teal' w='100%' mt={4} type='submit' disabled={!isValid}>
            Editar
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default FormResponsible;
