import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ISubscription, ISubscriptionDTO } from '@/data/interfaces/subscription';

export class SubscriptionService {
  constructor(
    private readonly httpClient: HttpClient<
      IPageResponse<ISubscription> | ISubscription | ISubscription[]
    >,
    private readonly path = '/categories',
  ) {}

  async create({ championshipId, name }: ISubscriptionDTO): Promise<ISubscription> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: { championshipId, name },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as ISubscription;
      default:
        throw new Error();
    }
  }

  async listAll(
    id: string,
    limit?: number,
    page?: number,
  ): Promise<IPageResponse<ISubscription> | ISubscription[]> {
    let url = `${this.path}/${id}`;

    if (limit !== undefined && page !== undefined) url = `${url}?limit=${limit}&page=${page}`;

    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<ISubscription> | ISubscription[];
      default:
        throw new Error();
    }
  }
}
