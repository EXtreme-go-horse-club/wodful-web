export interface ISchedule {
  category: {
    name: string;
  };
  workout: {
    name: string;
  };
  startDate: Date;
  itsHappening: boolean | null;
}

export interface IScheduleByCategory {
  id: string;
  workout: {
    name: string;
  };
  category: {
    name: string;
  };
  startDate: Date;
}

export interface ICreateScheduleRequestDTO {
  workoutId: string;
  categoryId: string;
  startDate: Date;
  laneQuantity: number;
}
