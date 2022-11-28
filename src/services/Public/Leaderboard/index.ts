import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPublicLeaderboard } from '@/data/interfaces/leaderboard';

export class PublicLeaderboardService {
  constructor(
    private readonly httpClient: HttpClient<IPublicLeaderboard[]>,
    private readonly path = '/public',
  ) {}

  async list(id: string): Promise<IPublicLeaderboard[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: `${this.path}/categories/${id}/leaderboards`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPublicLeaderboard[];
      default:
        throw new Error();
    }
  }
}
