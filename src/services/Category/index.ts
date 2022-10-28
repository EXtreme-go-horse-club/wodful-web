import { ICategory, ICategoryDTO } from '@/data/interfaces/category';
import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';

export class CategoryService {
  constructor(
    private readonly httpClient: HttpClient<IPageResponse<ICategory> | ICategory | ICategory[]>,
    private readonly path = '/categories',
  ) {}

  async create({ championshipId, name, description, members }: ICategoryDTO): Promise<ICategory> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: { championshipId, name, description, members },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as ICategory;
      default:
        throw new Error();
    }
  }

  async listAll(
    id: string,
    limit?: number,
    page?: number,
  ): Promise<IPageResponse<ICategory> | ICategory[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: `${this.path}/${id}${limit && page && `?limit=${limit}&page=${page}`}`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<ICategory> | ICategory[];
      default:
        throw new Error();
    }
  }
}
