import { IConfiguration, ICreateConfigurationRequestDTO } from '@/data/interfaces/configuration';
import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';

export class ConfigurationService {
  constructor(
    private readonly httpClient: HttpClient<IConfiguration>,
    private readonly path = '/configurations',
  ) {}

  async get(id: string): Promise<IConfiguration> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: `${this.path}/${id}`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as unknown as IConfiguration;
      default:
        throw new Error();
    }
  }

  async create(
    idChamp: string,
    { hasNameInTshirt, hasTshirt, tShirtSizes }: ICreateConfigurationRequestDTO,
  ): Promise<IConfiguration> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: `${this.path}/${idChamp}`,
      body: {
        hasNameInTshirt,
        hasTshirt,
        tShirtSizes,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as IConfiguration;
      default:
        throw new Error();
    }
  }
}
