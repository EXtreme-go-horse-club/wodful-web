import { ITicket, TicketDTO } from '@/data/interfaces/ticket';
import useCategoryData from '@/hooks/useCategoryData';
import useTicketData from '@/hooks/useTicketData';
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
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface IFormChampionshipProps {
  onClose: () => void;
  oldTicket?: ITicket;
  resetTicket: () => void;
}

const FormTicket = ({ onClose, oldTicket, resetTicket }: IFormChampionshipProps) => {
  const { List, categories } = useCategoryData();
  const { Create, Edit } = useTicketData();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TicketDTO>({
    mode: 'onChange',
    defaultValues: {
      name: oldTicket?.name,
      description: oldTicket?.description,
      paymentLink: oldTicket?.paymentLink,
      price: oldTicket?.price,
      quantity: oldTicket?.quantity,
      endDate: oldTicket?.endDate?.toString().substring(0, 10),
      startDate: oldTicket?.startDate?.toString().substring(0, 10),
    },
  });

  const onSubmit: SubmitHandler<TicketDTO> = async (ticket) => {
    ticket.price = Number(ticket.price);
    ticket.quantity = Number(ticket.quantity);

    if (oldTicket) {
      const editedTicket = {
        id: oldTicket?.id,
        name: ticket.name,
        description: ticket.description,
        price: ticket.price,
        quantity: ticket.quantity,
        endDate: ticket.endDate,
        startDate: ticket.startDate,
        categoryId: ticket.categoryId,
        paymentLink: ticket.paymentLink,
      };
      await Edit(editedTicket);
      resetTicket();
      onClose();
      return;
    }

    await Create(ticket);
    onClose();
  };

  useEffect(() => {
    List(id as string);
    if (oldTicket?.category.id) {
      reset({
        categoryId: oldTicket?.category.id,
      });
    }
  }, [List, id, oldTicket?.category.id, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={6} flexDirection='column'>
        <FormControl isInvalid={!!errors.categoryId}>
          <FormLabel>Categoria</FormLabel>
          <Select
            placeholder='Selecione a categoria'
            disabled={!!oldTicket?.category.id}
            {...register('categoryId', { required: validationMessages['required'] })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.categoryId && errors.categoryId.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Nome</FormLabel>
          <Input
            placeholder='Nome do ticket'
            {...register('name', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 50, message: validationMessages['maxLengthSm'] },
            })}
          />
          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            placeholder='Descrição do ticket'
            {...register('description', {
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 250, message: validationMessages['maxLengthSm'] },
            })}
          />
          <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.paymentLink}>
          <FormLabel>Link de pagamento</FormLabel>
          <Input placeholder='https://mpago.la/seu_link' {...register('paymentLink')} />
          <FormErrorMessage>{errors.paymentLink && errors.paymentLink.message}</FormErrorMessage>
        </FormControl>

        <HStack width='100%'>
          <FormControl isInvalid={!!errors.price}>
            <FormLabel>Valor</FormLabel>
            <Input
              as='input'
              type='number'
              placeholder='Valor do ticket'
              {...register('price', {
                required: validationMessages['required'],
                minLength: { value: 1, message: validationMessages['minLength'] },
                maxLength: { value: 15, message: validationMessages['maxLengthSm'] },
              })}
            />
            <FormErrorMessage>{errors.price && errors.price.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.quantity}>
            <FormLabel>Quantidade máxima</FormLabel>
            <Input
              type='number'
              placeholder='Quantidade de tickets'
              {...register('quantity', {
                required: validationMessages['required'],
                minLength: { value: 1, message: validationMessages['minLength'] },
                maxLength: { value: 5, message: validationMessages['maxLengthSm'] },
              })}
            />
            <FormErrorMessage>{errors.quantity && errors.quantity.message}</FormErrorMessage>
          </FormControl>
        </HStack>

        <HStack width='100%'>
          <FormControl isInvalid={!!errors.startDate}>
            <FormLabel>Data de início</FormLabel>
            <Input
              type='date'
              placeholder='DD/MM/AAAA'
              {...register('startDate', {
                required: validationMessages['required'],
              })}
            />
            <FormErrorMessage>{errors.startDate && errors.startDate.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.endDate}>
            <FormLabel>Data de encerramento</FormLabel>
            <Input
              type='date'
              placeholder='DD/MM/AAAA'
              {...register('endDate', {
                required: validationMessages['required'],
              })}
            />
            <FormErrorMessage>{errors.endDate && errors.endDate.message}</FormErrorMessage>
          </FormControl>
        </HStack>

        <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
          <Button colorScheme='teal' w='100%' mt={4} type='submit' disabled={!isValid}>
            {oldTicket ? 'Editar' : 'Criar'}
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default FormTicket;
