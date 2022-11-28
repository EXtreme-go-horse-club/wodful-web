import { IResult } from '../result';

export interface ILeaderboard {
  ranking: number;
  nickname: string;
  generalScore: number;
  category: {
    name: string;
  };
  results: IResult[];
}

export interface IPublicLeaderboard {
  nickname: string;
  generalScore: number;
  category: {
    name: string;
  };
  ranking: number;
  results: Array<{
    result: string;
    points: number;
    classification: number;
    workout: {
      name: string;
    };
  }>;
}
