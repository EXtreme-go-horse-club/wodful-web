import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ICreateResultRequestDTO, IResult, IResultByCategory } from '@/data/interfaces/result';

export class ResultService {
  constructor(
    private readonly httpClient: HttpClient<IPageResponse<IResult> | IResult[] | IResult>,
    private readonly path = '/results',
  ) {}

  async create({ workoutId, subscriptionId, result }: ICreateResultRequestDTO): Promise<IResult> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: {
        workoutId,
        subscriptionId,
        result,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as IResult;
      default:
        throw new Error();
    }
  }

  async listByCategory(
    categoryId: string,
    limit?: number,
    page?: number,
    search?: string | null,
  ): Promise<IPageResponse<IResultByCategory>> {
    let url = `categories/${categoryId}${this.path}${
      limit && page && `?limit=${limit}&page=${page}`
    }`;

    if (search !== null) url = `${url}&name=${search}`;

    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url,
      body: {
        categoryId,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<IResultByCategory>;
      default:
        throw new Error();
    }
  }

  async delete(id: string): Promise<IResultByCategory> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'delete',
      url: `${this.path}/${id}`,
    });

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return body! as IResultByCategory;
      default:
        throw new Error();
    }
  }
}
