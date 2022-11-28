import { ISimpleSubscription } from '../subscription';

export interface ISchedule {
  id: string;
  schedule: string;
  laneQuantity: number;
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

export interface IPublicSchedule {
  id: string;
  schedule: string;
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
  subscriptions: ISimpleSubscription[];
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
