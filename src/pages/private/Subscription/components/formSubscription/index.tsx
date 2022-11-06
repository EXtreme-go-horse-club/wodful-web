import { ISubscriptionDTO } from '@/data/interfaces/subscription';
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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface SubscriptionProps {
  step?: number;
  participantsNumber?: number;
}
interface CreateModalProps {
  id: string;
  openFormParticipants: (step: number, participantsNumber: number) => void;
}

const FormSubscription = ({ id, openFormParticipants }: CreateModalProps) => {
  const { subscriptionData, setSubscriptionData } = useSubscriptionData();
  const { List, tickets } = useTicketData();
  const [participantsNumber, setParticipantsNumber] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISubscriptionDTO>({
    mode: 'onChange',
  });

  useEffect(() => {
    List(id);
  }, [List, id]);

  function onSubmit(subscription: ISubscriptionDTO) {
    console.log(tickets[subscription.ticketIndex as number].id);
    subscription.ticketId = tickets[subscription.ticketIndex as number].id;
    console.log(tickets[subscription.ticketIndex as number]);
    console.log(subscription);
    setSubscriptionData(subscription);
    // delete subscription.ticketIndex;

    openFormParticipants(1, tickets[subscription.ticketIndex as number].category?.members);
    // subscription.championshipId = id;
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
            as='input'
            id='responsiblePhone'
            placeholder='Telefone do responsável'
            {...register('responsiblePhone', {
              required: validationMessages['required'],
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
            onChange={(event) => {
              console.log(event.target.value);
              // setParticipantsNumber(Number(event.target.value));
            }}
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
