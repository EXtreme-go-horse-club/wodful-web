export interface ISchedule {
  id: string;
  date: Date;
  hour: string;
  heate: number;
  isLive: boolean;
  isOver: boolean;
  category: {
    name: string;
  };
  workout: {
    name: string;
  };
  subscriptions: {
    raking: number;
    nickname: string;
  };
}
export interface ICreateScheduleRequestDTO {
  date: string;
  hour: string;
  categoryId: string;
  workoutId: string;
  heat: number;
  laneQuantity: number;
}
