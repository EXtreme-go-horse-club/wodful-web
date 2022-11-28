import { IPublicCategory } from '@/data/interfaces/category';
import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';

export class PublicCategoryService {
  constructor(
    private readonly httpClient: HttpClient<IPublicCategory[]>,
    private readonly path = '/public',
  ) {}

  async list(code: string): Promise<IPublicCategory[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: `${this.path}/${code.toUpperCase()}/categories`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPublicCategory[];
      default:
        throw new Error();
    }
  }
}
