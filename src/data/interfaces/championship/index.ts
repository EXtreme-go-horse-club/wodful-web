export interface IChampionship {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  accessCode: string;
  banner: string;
  resultType: string;
  address: string;
}

export interface ChampionshipDTO {
  name: string;
  startDate: Date;
  endDate: Date;
  accessCode: string;
  banner: string;
  resultType: string;
  address: string;
}
