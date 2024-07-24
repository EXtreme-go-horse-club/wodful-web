import useCategoryData from '@/hooks/useCategoryData';
import useResultData from '@/hooks/useResultData';
import useWorkoutData from '@/hooks/useWorkoutData';
import { validationMessages } from '@/utils/messages';
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormResultProps {
  onClose: () => void;
}

export interface IReleaseResultsFormRequestDTO {
  workoutId: string;
  categoryId: string;
}

const ReleaseResultsForm = ({ onClose }: IFormResultProps) => {
  const { categories } = useCategoryData();
  const { workouts, ListByCategory } = useWorkoutData();
  const { GetIsReleasedResult, UpdateReleaseResult } = useResultData();

  const [alertMessage, setAlertMessage] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<IReleaseResultsFormRequestDTO>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IReleaseResultsFormRequestDTO> = async (resultData) => {
    const isRelease = alertMessage ? false : true;
    await UpdateReleaseResult({
      workoutId: resultData.workoutId,
      release: isRelease,
      categoryId: resultData.categoryId,
    });
    onClose();
  };

  const handleIsResultReleased = (event: any) => {
    GetIsReleasedResult(event.target.value)
      .catch(() => {
        setError('workoutId', { message: 'Resultados não encontrados!' }), setAlertMessage(false);
      })
      .then((data: any) => {
        if (data?.isReleased) {
          setAlertMessage(true);
          return;
        }
        setAlertMessage(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={4} flexDirection='column'>
        <>
          <FormControl isInvalid={!!errors.categoryId}>
            <FormLabel>Categoria</FormLabel>
            <Select
              as='select'
              id='categoryId'
              placeholder='Selecione a categoria'
              {...register('categoryId', {
                required: validationMessages['required'],
                onChange: (e) => {
                  ListByCategory(e.target.value);
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
            <FormLabel>Prova</FormLabel>
            <Select
              as='select'
              id='workoutId'
              disabled={!watch('categoryId')}
              placeholder='Selecione a prova'
              {...register('workoutId', {
                required: validationMessages['required'],
                onChange: (event) => handleIsResultReleased(event),
              })}
            >
              {workouts?.map((workout) => (
                <option key={workout.id} value={workout.id}>
                  {workout.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.workoutId && errors.workoutId.message}</FormErrorMessage>
          </FormControl>
        </>

        {alertMessage && (
          <Alert status='warning'>
            <AlertIcon />
            <p>
              Os resultados desta prova já estão disponíveis para os atletas, deseja
              <b> ocultar </b> novamente?
            </p>
          </Alert>
        )}

        <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
          <Button colorScheme='teal' w='100%' mt={4} type='submit' disabled={!isValid}>
            {!alertMessage ? 'Liberar' : 'Ocultar'}
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default ReleaseResultsForm;
