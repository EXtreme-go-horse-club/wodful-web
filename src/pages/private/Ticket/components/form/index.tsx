import { TicketDTO } from '@/data/interfaces/ticket';
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
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const FormTicket = () => {
  const { List, categories } = useCategoryData();
  const { Create } = useTicketData();
  const { id } = useParams();

  useEffect(() => {
    List(id as string);
  }, [List, id]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TicketDTO>({ mode: 'onChange' });
  function onSubmit(ticket: TicketDTO) {
    ticket.price = Number(ticket.price);
    ticket.quantity = Number(ticket.quantity);
    Create(ticket);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={6} flexDirection='column'>
        <FormControl isInvalid={!!errors.categoryId}>
          <FormLabel>Categoria</FormLabel>
          <Select
            placeholder='Selecione a categoria'
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
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 250, message: validationMessages['maxLengthSm'] },
            })}
          />
          <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
        </FormControl>

        <HStack>
          <FormControl isInvalid={!!errors.price}>
            <FormLabel>Valor</FormLabel>
            <Input
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

        <HStack>
          <FormControl isInvalid={!!errors.startDate}>
            <FormLabel>Data de início</FormLabel>
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
            <FormLabel>Data de encerramento</FormLabel>
            <Input
              type='datetime-local'
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
            Adicionar
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default FormTicket;
