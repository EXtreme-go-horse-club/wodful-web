import { IWorkoutDTO } from '@/data/interfaces/workout';
import useCategoryData from '@/hooks/useCategoryData';
import useWorkoutData from '@/hooks/useWorkoutData';
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
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface CreateModalProps {
  onClose: () => void;
}

const FormWorkout = ({ onClose }: CreateModalProps) => {
  const { Create } = useWorkoutData();
  const { List, categories } = useCategoryData();
  useEffect(() => {
    List('47e3b328-de59-4725-a5d8-82b40b9b9a2a');
  }, [List]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IWorkoutDTO>({
    mode: 'onChange',
  });
  function onSubmit(workout: IWorkoutDTO) {
    workout.championshipId = '47e3b328-de59-4725-a5d8-82b40b9b9a2a';
    Create(workout);
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
            placeholder='Nome'
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
            placeholder='Descrição'
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
        <FormControl isInvalid={!!errors.categoryId}>
          <FormLabel>Categoria</FormLabel>
          <Select
            as='select'
            id='members'
            placeholder='Selecione a categoria'
            {...register('categoryId', {
              required: validationMessages['required'],
            })}
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.categoryId && errors.categoryId.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.workoutType}>
          <FormLabel>Tipo</FormLabel>
          <Select
            as='select'
            id='members'
            placeholder='Selecione o tipo'
            {...register('workoutType', {
              required: validationMessages['required'],
            })}
          >
            <option value='EMOM'>EMOM</option>
            <option value='FORTIME'>FORTIME</option>
            <option value='AMRAP'>AMRAP</option>
          </Select>
          <FormErrorMessage>{errors.workoutType && errors.workoutType.message}</FormErrorMessage>
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

export default FormWorkout;
