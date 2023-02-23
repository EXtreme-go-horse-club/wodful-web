import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { IParticipant, IParticipants } from '@/data/interfaces/participant';

export class ParticipantsService {
  constructor(
    private readonly httpClient: HttpClient<
      IPageResponse<IParticipants> | IParticipants[] | IParticipant
    >,
    private readonly path = '/participants/',
  ) {}

  async listAll(
    id: string | null,
    limit?: number,
    page?: number,
    search?: string | null,
  ): Promise<IPageResponse<IParticipants> | IParticipants[]> {
    let url = `championships/${id}${this.path}${limit && page && `?limit=${limit}&page=${page}`}`;

    if (search) url = `${url}&name=${search}`;

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

  async edit({
    id,
    affiliation,
    city,
    identificationCode,
    name,
    tShirtSize,
  }: IParticipant): Promise<IParticipant> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'put',
      url: this.path,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        id,
        affiliation,
        city,
        identificationCode,
        name,
        tShirtSize,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IParticipant;
      default:
        throw new Error();
    }
  }
}
