import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { CategoryModel } from '@/models/categoryMode';

export class CategoryService {
  constructor(
    private readonly httpClient: HttpClient<CategoryModel>,
    private readonly path = '/categories/',
  ) {}

  async listAllCategories(): Promise<CategoryModel[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: this.path + '47e3b328-de59-4725-a5d8-82b40b9b9a2a',
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body!;
      default:
        throw new Error();
    }
  }
}
