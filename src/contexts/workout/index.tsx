import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IWorkout, IWorkoutDTO } from '@/data/interfaces/workout';
import { WorkoutService } from '@/services/Workout';
import { workoutMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';

interface WorkoutProviderProps {
  children: React.ReactNode;
  onClose: () => void;
}

export interface WorkoutContextData {
  workouts: IWorkout[];
  isLoading: boolean;
  List: (id: string) => Promise<void>;
  Create: ({
    name,
    description,
    workoutType,
    championshipId,
    categoryId,
  }: IWorkoutDTO) => Promise<void>;
}

const WorkoutContext = createContext({} as WorkoutContextData);

const axios = new AxiosAdapter();

export const WorkoutProvider = ({ children, onClose }: WorkoutProviderProps) => {
  const toast = useToast();
  const [workouts, setWorkouts] = useState<IWorkout[]>([] as IWorkout[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const Create = useCallback(
    async ({ name, description, workoutType, championshipId, categoryId }: IWorkoutDTO) => {
      setIsLoading(true);
      await new WorkoutService(axios)
        .create({ name, description, workoutType, championshipId, categoryId })
        .then((newWorkout: IWorkout) => {
          toast({
            title: workoutMessages['success'],
            status: 'success',
            isClosable: true,
          });
          setWorkouts((workouts) => [...workouts, newWorkout]);
          onClose();
        })
        .catch(() => {
          toast({
            title: workoutMessages['error'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [],
  );

  const List = useCallback(async (id: string) => {
    setIsLoading(true);
    await new WorkoutService(axios)
      .listAll(id)
      .then((allWorkouts) => {
        setWorkouts(allWorkouts);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <WorkoutContext.Provider value={{ workouts, isLoading, List, Create }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;
