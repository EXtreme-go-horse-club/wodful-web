import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ISubscription, ISubscriptionDTO } from '@/data/interfaces/subscription';

export class SubscriptionService {
  constructor(
    private readonly httpClient: HttpClient<
      IPageResponse<ISubscription> | ISubscription | ISubscription[]
    >,
    private readonly path = '/subscriptions',
  ) {}

  async create(subscription: ISubscriptionDTO): Promise<ISubscription> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: subscription,
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
    categoryId?: string,
  ): Promise<IPageResponse<ISubscription> | ISubscription[]> {
    let url = `championships/${id}${this.path}`;

    if (limit !== undefined && page !== undefined) url = `${url}?limit=${limit}&page=${page}`;
    if (categoryId) url = `${url}&category=${categoryId}`;

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

  async delete(id: string): Promise<ISubscription> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'delete',
      url: `${this.path}/${id}`,
    });

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return body! as ISubscription;
      default:
        throw new Error();
    }
  }

  async updateStatus(id: string, status: string): Promise<ISubscription> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'put',
      url: `${this.path}/${id}/${status}`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as ISubscription;
      default:
        throw new Error();
    }
  }

  async listAllByCategory(
    id: string,
    categoryId: string,
  ): Promise<IPageResponse<ISubscription> | ISubscription[]> {
    const url = `championships/${id}${this.path}?category=${categoryId}`;

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
