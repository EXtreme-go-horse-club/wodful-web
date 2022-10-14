import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { ChampionshipModel } from '@/models/championshipModel';

interface ChampionshipDTO {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  accessCode: string;
  banner: string;
  resultType: string;
  address: string;
}

export class ChampionshipService {
  constructor(
    private readonly httpClient: HttpClient<ChampionshipModel>,
    private readonly path = '/championships/',
  ) {}

  async listAllChampionships(): Promise<ChampionshipModel> {
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
}
