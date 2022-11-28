import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { ILeaderboard } from '@/data/interfaces/leaderboard';
import { IPageResponse } from '@/data/interfaces/pageResponse';

export class LeaderboardService {
  constructor(
    private readonly httpClient: HttpClient<IPageResponse<ILeaderboard>>,
    private readonly path = '/championships',
  ) {}

  async list(
    id: string,
    categoryId: string,
    limit: number,
    page: number,
  ): Promise<IPageResponse<ILeaderboard>> {
    let url = `${this.path}/${id}/leaderboards`;

    if (limit && page && categoryId)
      url = `${url}?limit=${limit}&page=${page}&category=${categoryId}`;

    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body!;
      default:
        throw new Error();
    }
  }
}
