import { ICreateScheduleRequestDTO } from '@/data/interfaces/schedule';
import useCategoryData from '@/hooks/useCategoryData';
import useScheduleData from '@/hooks/useScheduleData';
import useWorkoutData from '@/hooks/useWorkoutData';
import { incrementAndFormatDate } from '@/utils/formatDate';
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
    schedule.date = incrementAndFormatDate(schedule.date, 'yyyy-MM-dd');
    schedule.heat = Number(schedule.heat);
    schedule.laneQuantity = Number(schedule.laneQuantity);
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
            id='category'
            placeholder='Selecione a categoria'
            {...register('categoryId', {
              required: validationMessages['required'],
              onChange: () => {
                handleWorkout(getValues('categoryId'));
              },
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

        <FormControl isInvalid={!!errors.workoutId}>
          <FormLabel>Nome da Prova</FormLabel>
          <Select
            as='select'
            id='workout'
            placeholder='Selecione a prova'
            {...register('workoutId', { required: validationMessages['required'] })}
            disabled={!workouts.length}
          >
            {workouts?.map((workout) => (
              <option key={workout.id} value={workout.id}>
                {workout.name}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.workoutId && errors.workoutId.message}</FormErrorMessage>
        </FormControl>

        <HStack width='100%'>
          <FormControl isInvalid={!!errors.date}>
            <FormLabel>Data de início</FormLabel>
            <Input
              type='date'
              placeholder='DD/MM/AAAA'
              {...register('date', { required: validationMessages['required'] })}
            />
            <FormErrorMessage>{errors.date && errors.date.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.hour}>
            <FormLabel>Horário de início</FormLabel>
            <Input
              type='time'
              placeholder='HH:MM'
              {...register('hour', { required: validationMessages['required'] })}
            />
            <FormErrorMessage>{errors.hour && errors.hour.message}</FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl isInvalid={!!errors.heat}>
          <FormLabel>Bateria</FormLabel>
          <Select as='select' {...register('heat', { required: validationMessages['required'] })}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Select>
          <FormErrorMessage>{errors.heat && errors.heat.message}</FormErrorMessage>
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
          <FormErrorMessage>{errors.laneQuantity && errors.laneQuantity.message}</FormErrorMessage>
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
