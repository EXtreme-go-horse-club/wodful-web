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
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

interface ResultFormProps {
  category: string;
  workout: string;
  subscription: string;
  result: string;
}

const ResultForm = () => {
  const { id } = useParams();
  const { Create } = useWorkoutData();
  const { List: CategoryList, categories } = useCategoryData();
  const { workouts, ListByCategory } = useWorkoutData();

  useEffect(() => {
    if (id) CategoryList(id);
  }, [CategoryList, id]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResultFormProps>({
    mode: 'onChange',
  });

  const onSubmit = useCallback((formResult: ResultFormProps) => {
    console.log(formResult);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={4} flexDirection='column'>
        <FormControl isInvalid={!!errors.category}>
          <FormLabel>Categoria</FormLabel>
          <Select
            as='select'
            id='category'
            placeholder='Selecione a categoria'
            {...register('category', {
              required: validationMessages['required'],
              onChange: (e) => ListByCategory(e.target.value),
            })}
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.category && errors.category.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.workout}>
          <FormLabel>Prova</FormLabel>
          <Select
            as='select'
            id='workout'
            placeholder='Selecione a prova'
            {...register('workout', {
              required: validationMessages['required'],
            })}
          >
            {workouts?.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.category && errors.category.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.result}>
          <FormLabel htmlFor='result' m={0}>
            Resultado
          </FormLabel>
          <Input
            as='input'
            id='result'
            placeholder='Resultado'
            {...register('result', {
              required: validationMessages['required'],
            })}
          />
          <FormErrorMessage>{errors.result && errors.result.message}</FormErrorMessage>
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

export default ResultForm;
