import WorkoutContext, { WorkoutContextData } from '@/contexts/workout';
import { useContext } from 'react';

const useWorkoutData = (): WorkoutContextData => {
  const context = useContext<WorkoutContextData>(WorkoutContext);

  return context;
};

export default useWorkoutData;
