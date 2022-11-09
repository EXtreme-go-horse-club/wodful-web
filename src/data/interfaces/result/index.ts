export interface IResult {
  result: string;
  points: string;
  classification: string;
  workout: {
    name: string;
  };
}

export interface ICreateResultRequestDTO {
  workoutId: string;
  subscriptionId: string;
  result: string;
}
