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
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface CreateModalProps {
  id: string;
  openFormParticipants: (passStep: number) => void;
}

const FormSubscription = ({ id, openFormParticipants }: CreateModalProps) => {
  const { subscriptionData, setSubscriptionData } = useSubscriptionData();
  const { List, tickets } = useTicketData();
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
    console.log(subscription);
    setSubscriptionData(subscription);
    console.log(subscriptionData);
    openFormParticipants(1);
    // subscription.championshipId = id;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pt={6} pb={6} flexDirection='column'>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor='name' m={0}>
            Nome
          </FormLabel>
          <Input
            as='input'
            id='name'
            placeholder='Nome do responsável'
            {...register('name', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
            })}
          />

          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor='email' m={0}>
            E-mail
          </FormLabel>
          <Input
            as='input'
            id='email'
            placeholder='E-mail do responsável'
            {...register('email', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
            })}
          />

          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone}>
          <FormLabel htmlFor='phone' m={0}>
            Telefone
          </FormLabel>
          <Input
            as='input'
            id='phone'
            placeholder='Telefone do responsável'
            {...register('phone', {
              required: validationMessages['required'],
            })}
          />

          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.ticketId}>
          <FormLabel>Ticket</FormLabel>
          <Select
            as='select'
            id='members'
            placeholder='Selecione o ticket da categoria'
            {...register('ticketId', {
              required: validationMessages['required'],
            })}
          >
            {tickets?.map((ticket) => (
              <option key={ticket.id} value={ticket.id}>
                {ticket.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.ticketId && errors.ticketId.message}</FormErrorMessage>
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
