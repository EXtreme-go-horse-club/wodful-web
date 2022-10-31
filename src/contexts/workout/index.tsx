import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { IPageResponse } from '@/data/interfaces/pageResponse';
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
  workoutsPages: IPageResponse<IWorkout>;
  isLoading: boolean;
  limit: number;
  setLimit: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  List: (id: string) => Promise<void>;
  ListPaginated: (id: string) => Promise<void>;
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
  const [workoutsPages, setWorkoutsPages] = useState<IPageResponse<IWorkout>>(
    {} as IPageResponse<IWorkout>,
  );
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [workouts, setWorkouts] = useState<IWorkout[]>([] as IWorkout[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const List = useCallback(async (id: string) => {
    setIsLoading(true);
    await new WorkoutService(axios)
      .listByChampionship(id)
      .then((allWorkouts) => {
        setWorkouts(allWorkouts as IWorkout[]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const ListPaginated = useCallback(
    async (id: string) => {
      setIsLoading(true);
      await new WorkoutService(axios)
        .listByChampionship(id, limit, page)
        .then((paginatedCategories) => {
          setWorkoutsPages(paginatedCategories as IPageResponse<IWorkout>);
        })
        .finally(() => setIsLoading(false));
    },
    [limit, page],
  );

  const Create = useCallback(
    async ({ name, description, workoutType, championshipId, categoryId }: IWorkoutDTO) => {
      setIsLoading(true);
      await new WorkoutService(axios)
        .create({ name, description, workoutType, championshipId, categoryId })
        .then(() => {
          toast({
            title: workoutMessages['success'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(championshipId);
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
    [ListPaginated, onClose, toast],
  );

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        workoutsPages,
        isLoading,
        limit,
        page,
        setLimit,
        setPage,
        Create,
        List,
        ListPaginated,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;
