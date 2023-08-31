export interface IResult {
  result: string;
  points: string;
  classification: string;
  workout: {
    name: string;
  };
}
export interface IResultByCategory {
  id: string;
  nickname: string;
  workout: {
    name: string;
  };
  result: string;
  classification: string;
  points: string;
}

export interface IResultData {
  id: string;
  result: string;
  Subscription?: {
    id: string;
    nickname: string;
  };
  Workout?: {
    id: string;
    name: string;
    workoutType: string;
    Category?: {
      id: string;
      name: string;
    };
  };
}

export interface ICreateResultRequestDTO {
  workoutId: string;
  subscriptionId: string;
  categoryId: string;
  result: string;
}

export interface IEditResultDTO {
  id: string;
  result: string;
  categoryId?: string;
}
