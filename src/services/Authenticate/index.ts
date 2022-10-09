import { HttpClient, HttpStatusCode } from '../../data/interfaces/http';

export class AuthenticateService {
  constructor(
    private readonly httpClient: HttpClient<any>,
    private readonly url = `http://localhost:3333/auth/`,
  ) {}

  async login(username: string, password: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('@Wodful:token')}`,
    };

    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: `${this.url}`,
      headers,
      body: { username, password },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body;
      default:
        throw new Error();
    }
  }
}
