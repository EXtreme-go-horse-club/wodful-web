import { ChampionshipDTO, IChampionship } from '@/data/interfaces/championship';
import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';

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
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
      case HttpStatusCode.created:
        return body! as IChampionship;
      default:
        throw new Error();
    }
  }
}
