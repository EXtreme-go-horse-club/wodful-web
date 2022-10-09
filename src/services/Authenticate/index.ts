import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';

export class AuthenticateService {
  constructor(
    private readonly httpClient: HttpClient<any>,
    private readonly url = `${import.meta.env.VITE_BASE_API_URL}`,
  ) {}

  async login(email: string, password: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('@Wodful:tkn')}`,
    };

    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: `${this.url}/auth/`,
      headers,
      body: { email, password },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body;
      default:
        throw new Error();
    }
  }
}