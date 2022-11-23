import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPublicSchedule } from '@/data/interfaces/schedule';

export class PublicScheduleService {
  constructor(
    private readonly httpClient: HttpClient<IPublicSchedule[]>,
    private readonly path = '/public',
  ) {}

  async list(id: string): Promise<IPublicSchedule[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: `${this.path}/schedules/${id}/activities`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPublicSchedule[];
      default:
        throw new Error();
    }
  }
}
