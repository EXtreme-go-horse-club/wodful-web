import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { PublicUser } from '@/data/interfaces/user';

export class PublicAccessService {
  constructor(
    private readonly httpClient: HttpClient<PublicUser>,
    private readonly path = '/public',
  ) {}

  async access(accessCode: string): Promise<PublicUser> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: `${this.path}/access-code`,
      body: { accessCode },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body!;
      default:
        throw new Error();
    }
  }
}
