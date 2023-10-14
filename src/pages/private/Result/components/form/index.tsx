import { ICreateResultRequestDTO } from '@/data/interfaces/result';
import useCategoryData from '@/hooks/useCategoryData';
import useResultData from '@/hooks/useResultData';
import useSubscriptionData from '@/hooks/useSubscriptionData';
import useWorkoutData from '@/hooks/useWorkoutData';
import { validationMessages } from '@/utils/messages';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormResultProps {
  onClose: () => void;
  oldResultId?: string;
}

const ResultForm = ({ onClose, oldResultId }: IFormResultProps) => {
  const { categories } = useCategoryData();
  const { ListAllByCategory, subscriptions } = useSubscriptionData();
  const { workouts, ListByCategory } = useWorkoutData();
  const [isTeam, setIsTeam] = useState(false);
  const [workoutType, setWorkoutType] = useState('AMRAP');
  const { Create, Get, result, Edit } = useResultData();
  const [alreadyCallOldResult, setAlreadyCallOldResult] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ICreateResultRequestDTO>({
    mode: 'onChange',
  });
  useEffect(() => {
    if (oldResultId && !alreadyCallOldResult) {
      Get(oldResultId);
      setAlreadyCallOldResult(true);
    }
  }, [Get, alreadyCallOldResult, oldResultId, result]);

  useEffect(() => {
    if (oldResultId) {
      reset({
        categoryId: result.Workout?.Category?.id,
        result: result.result,
        workoutId: result.Workout?.id,
        subscriptionId: result.Subscription?.id,
      });
      setWorkoutType(result.Workout?.workoutType || 'AMRAP');
    }
  }, [result, reset, oldResultId]);

  const onSubmit: SubmitHandler<ICreateResultRequestDTO> = async (resultData) => {
    if (oldResultId) {
      await Edit({
        id: oldResultId,
        result: resultData.result,
        categoryId: resultData.categoryId,
      });
      onClose();
      return;
    }
    await Create(resultData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='start' w='100%' spacing={6} pb={4} flexDirection='column'>
        {oldResultId && (
          <>
            <Box>
              <Text as='b'>Categoria</Text>
              <Text mt='8px'>{result.Workout?.Category?.name}</Text>
            </Box>
            <Box>
              <Text as='b'>Prova</Text>
              <Text mt='8px'>{result.Workout?.name}</Text>
            </Box>
            <Box>
              <Text as='b'>{!isTeam ? 'Apelido' : 'Time'}</Text>
              <Text mt='8px'>{result.Subscription?.nickname}</Text>
            </Box>
          </>
        )}
        {!oldResultId && (
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
                    setIsTeam(
                      categories.find((selected) => selected.id === e.target.value)?.isTeam ||
                        false,
                    );
                    ListAllByCategory(e.target.value);
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
                placeholder='Selecione a prova'
                {...register('workoutId', {
                  required: validationMessages['required'],
                  onChange: (event) => {
                    setWorkoutType(
                      workouts.find((selected) => selected.id === event.target.value)
                        ?.workoutType || 'AMRAP',
                    );
                  },
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
            <FormControl isInvalid={!!errors.subscriptionId}>
              <FormLabel>{isTeam ? 'Equipe' : 'Atleta'}</FormLabel>
              <Select
                as='select'
                id='subscriptionId'
                placeholder={isTeam ? 'Selecione uma equipe' : 'Selecione um atleta'}
                {...register('subscriptionId', {
                  required: validationMessages['required'],
                })}
              >
                {subscriptions?.map((subscription) => (
                  <option key={subscription.id} value={subscription.id}>
                    {subscription.nickname}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors.subscriptionId && errors.subscriptionId.message}
              </FormErrorMessage>
            </FormControl>
          </>
        )}
        <FormControl isInvalid={!!errors.result}>
          <FormLabel htmlFor='result' m={0}>
            Resultado
          </FormLabel>
          <Input
            as='input'
            id='result'
            type={`${workoutType !== 'FORTIME' ? 'number' : 'time'}`}
            placeholder='Resultado'
            {...register('result', {
              required: validationMessages['required'],
            })}
          />
          <FormErrorMessage>{errors.result && errors.result.message}</FormErrorMessage>
        </FormControl>

        <ButtonGroup flexDirection='column' alignItems='end' gap={6} w='100%'>
          <Button colorScheme='teal' w='100%' mt={4} type='submit' disabled={!isValid}>
            {oldResultId ? 'Editar' : 'Adicionar'}
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default ResultForm;
