export interface ISchedule {
  id: string;
  category: {
    name: string;
  };
  workout: {
    name: string;
  };
  date: Date;
  hour: string;
  isLive: boolean | null;
}
export interface ICreateScheduleRequestDTO {
  date: Date;
  hour: string;
  categoryId: string;
  workoutId: string;
  laneQuantity: number;
}
