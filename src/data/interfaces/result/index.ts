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

export interface ICreateResultRequestDTO {
  workoutId: string;
  subscriptionId: string;
  categoryId: string;
  result: string;
}
