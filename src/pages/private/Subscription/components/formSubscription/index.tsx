import { ISubscriptionForm } from '@/data/interfaces/subscription';
import useSubscriptionData from '@/hooks/useSubscriptionData';
import useTicketData from '@/hooks/useTicketData';
import { validationMessages } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
interface CreateModalProps {
  id: string;
  openFormParticipants: (step: number, participantsNumber: number) => void;
}

const FormSubscription = ({ id, openFormParticipants }: CreateModalProps) => {
  const { setSubscriptionForm } = useSubscriptionData();
  const { List, tickets } = useTicketData();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISubscriptionForm>({
    mode: 'onChange',
  });

  useEffect(() => {
    List(id);
  }, [List, id]);

  function onSubmit(subscription: ISubscriptionForm) {
    subscription.ticketId = tickets[subscription.ticketIndex as number].id;
    setSubscriptionForm(subscription as ISubscriptionForm);
    openFormParticipants(1, tickets[subscription.ticketIndex as number].category?.members);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pt={6} pb={6} flexDirection='column'>
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
            })}
          />

          <FormErrorMessage>
            {errors.responsiblePhone && errors.responsiblePhone.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.ticketIndex}>
          <FormLabel>Ticket</FormLabel>
          <Select
            as='select'
            id='members'
            placeholder='Selecione o ticket da categoria'
            {...register('ticketIndex', {
              required: validationMessages['required'],
            })}
          >
            {tickets?.map((ticket, index) => (
              <option key={ticket.id} value={index}>
                {ticket.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.ticketIndex && errors.ticketIndex.message}</FormErrorMessage>
        </FormControl>
        <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
          <Button colorScheme='teal' w='100%' mt={4} type='submit' disabled={!isValid}>
            Próximo
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default FormSubscription;
