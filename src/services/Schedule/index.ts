import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ICreateScheduleRequestDTO, ISchedule } from '@/data/interfaces/schedule';

export class SheduleService {
  constructor(
    private readonly httpClient: HttpClient<IPageResponse<ISchedule> | ISchedule[] | ISchedule>,
    private readonly path = '/schedule',
  ) {}

  async create({
    date,
    hour,
    categoryId,
    workoutId,
    laneQuantity,
  }: ICreateScheduleRequestDTO): Promise<ISchedule> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: {
        date,
        hour,
        categoryId,
        workoutId,
        laneQuantity,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as ISchedule;
      default:
        throw new Error();
    }
  }

  async list(
    id: string,
    categoryId: string,
    limit: number,
    page: number,
  ): Promise<IPageResponse<ISchedule>> {
    let url = `${this.path}/${id}/schedule`;

    if (limit && page && categoryId)
      url = `${url}?limit=${limit}&page=${page}&category=${categoryId}`;

    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<ISchedule>;
      default:
        throw new Error();
    }
  }

  async delete(id: string): Promise<ISchedule> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'delete',
      url: `${this.path}/${id}`,
    });

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return body! as ISchedule;
      default:
        throw new Error();
    }
  }
}
