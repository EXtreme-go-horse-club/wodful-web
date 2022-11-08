import { ICategoryDTO } from '@/data/interfaces/category';
import useCategoryData from '@/hooks/useCategoryData';
import { validationMessages } from '@/utils/messages';
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

interface IFormChampionshipProps {
  id: string;
  onClose: () => void;
}

const FormCategory = ({ id, onClose }: IFormChampionshipProps) => {
  const { Create } = useCategoryData();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICategoryDTO>({
    mode: 'onChange',
  });
  function onSubmit(category: ICategoryDTO) {
    category.championshipId = id;
    category.members = Number(category.members);
    Create(category);
    onClose();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={4} flexDirection='column'>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor='name' m={0}>
            Nome
          </FormLabel>
          <Input
            as='input'
            id='name'
            placeholder='Nome da categoria'
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
            placeholder='Descrição da categoria'
            as='textarea'
            id='description'
            {...register('description', {
              required: validationMessages['required'],
              minLength: { value: 4, message: validationMessages['minLength'] },
              maxLength: { value: 250, message: validationMessages['maxLengthLg'] },
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
              required: validationMessages['required'],
            })}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Select>
          <FormErrorMessage>{errors.members && errors.members.message}</FormErrorMessage>
        </FormControl>
        <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
          <Button colorScheme='teal' w='100%' mt={4} type='submit' disabled={!isValid}>
            Adicionar
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default FormCategory;
