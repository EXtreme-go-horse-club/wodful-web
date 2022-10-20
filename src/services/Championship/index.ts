import { IChampionship } from '@/data/interfaces/championship';
import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';

export interface ChampionshipDTO {
  name: string;
  startDate: string;
  endDate: string;
  accessCode: string;
  banner: any;
  resultType: string;
  address: string;
}
export class ChampionshipService {
  constructor(
    private readonly httpClient: HttpClient<IChampionship | IChampionship[]>,
    private readonly path = '/championships/',
  ) {}

  async listAll(): Promise<IChampionship[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: this.path,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IChampionship[];
      default:
        throw new Error();
    }
  }

  async create({
    name,
    startDate,
    endDate,
    accessCode,
    banner,
    resultType,
    address,
  }: ChampionshipDTO): Promise<IChampionship> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: {
        name,
        startDate,
        endDate,
        accessCode,
        banner,
        resultType,
        address,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IChampionship;
      default:
        throw new Error();
    }
  }
}
