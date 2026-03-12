import { IWorkoutDTO } from '@/data/interfaces/workout';
import useCategoryData from '@/hooks/useCategoryData';
import useWorkoutData from '@/hooks/useWorkoutData';
import { validationMessages } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface IFormChampionshipProps {
  id: string;
  onClose: () => void;
  showHalfPointsOption?: boolean;
}

const FormWorkout = ({ id, onClose, showHalfPointsOption = false }: IFormChampionshipProps) => {
  const { Create } = useWorkoutData();
  const { List, categories } = useCategoryData();
  useEffect(() => {
    List(id);
  }, [List, id]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IWorkoutDTO>({
    mode: 'onChange',
    defaultValues: { worthHalfPoints: false },
  });
  function onSubmit(workout: IWorkoutDTO) {
    workout.championshipId = id;
    if (!showHalfPointsOption) workout.worthHalfPoints = false;
    else workout.worthHalfPoints = !!workout.worthHalfPoints;
    Create(workout);
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
              maxLength: { value: 1400, message: validationMessages['maxLengthSm'] },
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
            <option value='PR'>PR</option>
          </Select>
          <FormErrorMessage>{errors.workoutType && errors.workoutType.message}</FormErrorMessage>
        </FormControl>
        {showHalfPointsOption && (
          <FormControl>
            <Checkbox id='worthHalfPoints' {...register('worthHalfPoints')}>
              Vale metade da pontuação (50 pts)
            </Checkbox>
            <FormHelperText>
              Aplica-se apenas no padrão de pontuação (SCORE). Quando marcado, a prova vale 50 pontos.
            </FormHelperText>
          </FormControl>
        )}
        <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
          <Button colorScheme='teal' w='100%' mt={4} type='submit' disabled={!isValid}>
            Adicionar
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default FormWorkout;
