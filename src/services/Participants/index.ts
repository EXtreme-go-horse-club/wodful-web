import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { IParticipants } from '@/data/interfaces/parcipants';

export class ParticipantsService {
  constructor(
    private readonly httpClient: HttpClient<IPageResponse<IParticipants> | IParticipants[]>,
    private readonly path = '/participants/',
  ) {}

  async listAll(
    id: string,
    limit?: number,
    page?: number,
    search?: string,
  ): Promise<IPageResponse<IParticipants> | IParticipants[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: `${this.path}/${id}${limit && page && `?limit=${limit}&page=${page}`}${
        search && `&name=${search}`
      }`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<IParticipants> | IParticipants[];
      default:
        throw new Error();
    }
  }
}
