import { ISimpleSubscription } from '../subscription';

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
