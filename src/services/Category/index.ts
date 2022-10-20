import { ICategory, ICategoryDTO } from '@/data/interfaces/category';
import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';

export class CategoryService {
  constructor(
    private readonly httpClient: HttpClient<ICategory[] | ICategory>,
    private readonly path = '/categories/',
  ) {}

  async create({ championshipId, name, description, members }: ICategoryDTO): Promise<ICategory> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: { championshipId, name, description, members },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as ICategory;
      default:
        throw new Error();
    }
  }

  async listAll(id: string): Promise<ICategory[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: this.path + id,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as ICategory[];
      default:
        throw new Error();
    }
  }
}
