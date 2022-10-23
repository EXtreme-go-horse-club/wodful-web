export interface ICategoryDTO {
  name: string;
  description: string;
  members: number;
  championshipId: string;
}
export interface ICategory {
  id: string;
  name: string;
  description: string;
  isTeam: boolean;
  members: number;
  championshipId: string;
}
