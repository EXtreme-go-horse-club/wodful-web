export interface IWorkoutDTO {
  name: string;
  description: string;
  workoutType: string;
  championshipId: string;
  categoryId: string;
}
export interface IWorkout {
  id: string;
  name: string;
  workoutType: 'AMRAP' | 'EMOM' | 'FORTIME' | 'PR';
  categoryName: string;
}

export interface IPublicWorkout {
  id: string;
  name: string;
  workoutType: 'AMRAP' | 'EMOM' | 'FORTIME' | 'PR';
  description: string;
}
