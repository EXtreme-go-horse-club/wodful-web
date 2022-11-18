import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import {
  ICreateScheduleRequestDTO,
  ISchedule,
  IScheduleByCategory,
} from '@/data/interfaces/schedule';

export class SheduleService {
  constructor(private readonly httpClient: HttpClient<any>, private readonly path = '/schedule') {}

  async create({ workoutId, categoryId }: ICreateScheduleRequestDTO): Promise<ISchedule> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: {
        workoutId,
        categoryId,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as ISchedule;
      default:
        throw new Error();
    }
  }

  async listByCategory(
    categoryId: string,
    limit?: number,
    page?: number,
    search?: string | null,
  ): Promise<IPageResponse<IScheduleByCategory>> {
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
        return body! as IPageResponse<IScheduleByCategory>;
      default:
        throw new Error();
    }
  }

  async delete(id: string): Promise<IScheduleByCategory> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'delete',
      url: `${this.path}/${id}`,
    });

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return body! as IScheduleByCategory;
      default:
        throw new Error();
    }
  }
}
