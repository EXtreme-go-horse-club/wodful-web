import { ICategoryDTO } from '@/data/interfaces/category';
import useCategoryData from '@/hooks/useCategoryData';
import { errorMessages } from '@/utils/errorMessages';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface CreateModalProps {
  onClose: () => void;
}

const CreateCategory = ({ onClose }: CreateModalProps) => {
  const { Create } = useCategoryData();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICategoryDTO>({
    mode: 'onBlur',
  });
  function onSubmit(category: ICategoryDTO) {
    category.championshipId = '47e3b328-de59-4725-a5d8-82b40b9b9a2a';
    category.members = parseInt(category.members, 10);
    console.log(category);
    Create(category);
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
            placeholder='Nome da categoria'
            {...register('name', {
              required: errorMessages['required'],
              minLength: { value: 4, message: errorMessages['minLength'] },
              maxLength: { value: 50, message: errorMessages['maxLengthSm'] },
            })}
          />

          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            placeholder='Descrição da categoria'
            as='textarea'
            id='description'
            {...register('description', {
              required: errorMessages['required'],
              minLength: { value: 4, message: errorMessages['minLength'] },
              maxLength: { value: 250, message: errorMessages['maxLengthLg'] },
            })}
          />
          <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.members}>
          <FormLabel>Membros</FormLabel>
          <Select
            as='select'
            id='members'
            placeholder='Selecione o número de membros'
            {...register('members', {
              required: 'Favor preencher o campo',
            })}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Select>
          {!!errors.members && (
            <FormErrorMessage>{errors.members && errors.members.message}</FormErrorMessage>
          )}
        </FormControl>
        <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
          <Button colorScheme='teal' w='100%' mt={4} type='submit' disabled={!isValid}>
            Adicionar
          </Button>
          <Button variant='outline' w='100%' onClick={onClose}>
            Fechar
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default CreateCategory;
