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
  workoutType: string;
  categoryName: string;
}
