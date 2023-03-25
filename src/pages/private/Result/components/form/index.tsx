import useCategoryData from '@/hooks/useCategoryData';
import useResultData from '@/hooks/useResultData';
import useSubscriptionData from '@/hooks/useSubscriptionData';
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
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ResultFormProps {
  category: string;
  workout: string;
  subscription: string;
  result: string;
}

interface IFormResultProps {
  onClose: () => void;
}

const ResultForm = ({ onClose }: IFormResultProps) => {
  const { categories } = useCategoryData();
  const { ListAllByCategory, subscriptions } = useSubscriptionData();
  const { workouts, ListByCategory } = useWorkoutData();
  const [isTeam, setIsTeam] = useState(false);
  const [workoutType, setWorkoutType] = useState('AMRAP');
  const { Create } = useResultData();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResultFormProps>({
    mode: 'onChange',
  });

  const onSubmit = useCallback(
    ({
      subscription: subscriptionId,
      workout: workoutId,
      result,
      category: categoryId,
    }: ResultFormProps) => {
      Create({ subscriptionId, workoutId, result, categoryId });
      onClose();
    },
    [Create, onClose],
  );

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
              onChange: (e) => {
                setIsTeam(
                  categories.find((selected) => selected.id === e.target.value)?.isTeam || false,
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
              onChange: (event) => {
                setWorkoutType(
                  workouts.find((selected) => selected.id === event.target.value)?.workoutType ||
                    'AMRAP',
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
          <FormErrorMessage>{errors.workout && errors.workout.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.subscription}>
          <FormLabel>{isTeam ? 'Equipe' : 'Atleta'}</FormLabel>
          <Select
            as='select'
            id='subscription'
            placeholder={isTeam ? 'Selecione uma equipe' : 'Selecione um atleta'}
            {...register('subscription', {
              required: validationMessages['required'],
            })}
          >
            {subscriptions?.map((subscription) => (
              <option key={subscription.id} value={subscription.id}>
                {subscription.nickname}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.subscription && errors.subscription.message}</FormErrorMessage>
        </FormControl>
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
            Adicionar
          </Button>
        </ButtonGroup>
      </VStack>
    </form>
  );
};

export default ResultForm;
