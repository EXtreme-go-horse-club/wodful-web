export interface ISchedule {
  id: string;
  date: Date;
  hour: string;
  heat: number;
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

export interface IIsLiveDTO {
  championshipId: string;
  activityId: string;
  isLive: boolean;
}
export interface IIsOverDTO {
  championshipId: string;
  activityId: string;
  isOver: boolean;
}
