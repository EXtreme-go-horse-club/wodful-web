import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ICreateResultRequestDTO, IResult } from '@/data/interfaces/result';

export class ResultService {
  constructor(
    private readonly httpClient: HttpClient<IPageResponse<IResult> | IResult[] | IResult>,
    private readonly path = '/results',
  ) {}

  async create({ workoutId, subscriptionId, result }: ICreateResultRequestDTO): Promise<IResult> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: {
        workoutId,
        subscriptionId,
        result,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as IResult;
      default:
        throw new Error();
    }
  }
}
