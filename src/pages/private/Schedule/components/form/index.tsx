import { ICreateScheduleRequestDTO } from '@/data/interfaces/schedule';
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
import { useForm } from 'react-hook-form';

interface ResultFormProps {
  category: string;
  workout: string;
  subscription: string;
  result: string;
}

interface IFormScheduleProps {
  onClose: () => void;
}

const ScheduleForm = ({ onClose }: IFormScheduleProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateScheduleRequestDTO>({
    mode: 'onChange',
  });

  function onSubmit(Schedule: ICreateScheduleRequestDTO) {
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={6} flexDirection='column'>
        <FormControl isInvalid={!!errors.categoryId}>
          <FormLabel>Categoria</FormLabel>
          <Select
            as='select'
            {...register('categoryId', { required: validationMessages['required'] })}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </Select>
        </FormControl>

        <FormControl isInvalid={!!errors.workoutId}>
          <FormLabel>Nome da Prova</FormLabel>
          <Select
            as='select'
            {...register('workoutId', { required: validationMessages['required'] })}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </Select>
        </FormControl>

        <FormControl isInvalid={!!errors.startDate}>
          <FormLabel>Data e horário de início</FormLabel>
          <Input
            type='datetime-local'
            placeholder='DD/MM/AAAA HH:MM'
            {...register('startDate', { required: validationMessages['required'] })}
          />
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
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
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
