import { ICreateScheduleRequestDTO } from '@/data/interfaces/schedule';
import useCategoryData from '@/hooks/useCategoryData';
import useScheduleData from '@/hooks/useScheduleData';
import useWorkoutData from '@/hooks/useWorkoutData';
import { formatDate, formatHour } from '@/utils/formatDate';
import { validationMessages } from '@/utils/messages';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
interface IFormScheduleProps {
  onClose: () => void;
}

const ScheduleForm = ({ onClose }: IFormScheduleProps) => {
  const { List, categories } = useCategoryData();
  const { ListByCategory, workouts } = useWorkoutData();

  const { Create } = useScheduleData();
  const { id } = useParams();

  useEffect(() => {
    List(id as string);
  }, [List, id]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<ICreateScheduleRequestDTO>({
    mode: 'onChange',
  });

  function onSubmit(schedule: ICreateScheduleRequestDTO) {
    schedule.date = formatDate(schedule.date);
    schedule.hour = formatHour(schedule.date);
    Create(schedule);
    onClose();
  }

  const handleWorkout = (categoryId: string): any => {
    ListByCategory(categoryId as string);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={6} flexDirection='column'>
        <FormControl isInvalid={!!errors.categoryId}>
          <FormLabel>Categoria</FormLabel>
          <Select
            as='select'
            {...register('categoryId', { required: validationMessages['required'] })}
          >
            {categories?.map((category) => (
              <option
                key={category.id}
                value={category.id}
                onChange={handleWorkout(getValues('categoryId'))}
              >
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isInvalid={!!errors.workoutId}>
          <FormLabel>Nome da Prova</FormLabel>
          <Select
            as='select'
            {...register('workoutId', { required: validationMessages['required'] })}
          >
            {workouts?.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isInvalid={!!errors.date}>
          <FormLabel>Data e horário de início</FormLabel>
          <Input
            type='datetime-local'
            placeholder='DD/MM/AAAA HH:MM'
            {...register('date', { required: validationMessages['required'] })}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.heat}>
          <FormLabel>Bateria</FormLabel>
          <Select as='select' {...register('heat', { required: validationMessages['required'] })}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Select>
        </FormControl>

        <FormControl isInvalid={!!errors.laneQuantity}>
          <FormLabel>Número de baias</FormLabel>
          <Select
            as='select'
            {...register('laneQuantity', { required: validationMessages['required'] })}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Select>
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

export default ScheduleForm;
