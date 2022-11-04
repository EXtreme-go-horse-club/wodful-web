import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { IParticipants } from '@/data/interfaces/parcipants';

export class ParticipantsService {
  constructor(
    private readonly httpClient: HttpClient<IPageResponse<IParticipants> | IParticipants[]>,
    private readonly path = '/participants/',
  ) {}

  async listAll(
    id: string | null,
    limit?: number,
    page?: number,
    search?: string | null,
  ): Promise<IPageResponse<IParticipants> | IParticipants[]> {
    let url = `championships/${id}${this.path}${limit && page && `?limit=${limit}&page=${page}`}`;

    if (search !== null) url = `${url}&name=${search}`;

    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<IParticipants> | IParticipants[];
      default:
        throw new Error();
    }
  }
}
