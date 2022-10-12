import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { AuthenticatedUser } from '@/data/interfaces/user';

interface AuthenticationUserDTO {
  email: string;
  password: string;
}

export class AuthenticateService {
  constructor(
    private readonly httpClient: HttpClient<AuthenticatedUser>,
    private readonly path = '/auth/',
  ) {}

  async login({ email, password }: AuthenticationUserDTO): Promise<AuthenticatedUser> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: { email, password },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body!;
      default:
        throw new Error();
    }
  }
}
