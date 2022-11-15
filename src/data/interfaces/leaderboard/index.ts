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
