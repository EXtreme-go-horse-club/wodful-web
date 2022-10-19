import { IChampionship } from '@/data/interfaces/championship';
import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';

export interface ChampionshipDTO {
  name: string;
  startDate: Date;
  endDate: Date;
  accessCode: string;
  banner: File;
  resultType: string;
  address: string;
}
export class ChampionshipService {
  constructor(
    private readonly httpClient: HttpClient<IChampionship>,
    private readonly path = '/championships/',
  ) {}

  async listAllChampionships(): Promise<IChampionship> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: this.path,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body!;
      default:
        throw new Error();
    }
  }

  async createChampionship({
    name,
    startDate,
    endDate,
    accessCode,
    banner,
    resultType,
    address,
  }: ChampionshipDTO): Promise<ChampionshipDTO> {
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
        return body!;
      default:
        throw new Error();
    }
  }
}
