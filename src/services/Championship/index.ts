import {
  ChampionshipDTO,
  IChampionship,
  IChampionshipEditDTO,
} from '@/data/interfaces/championship';
import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';

export class ChampionshipService {
  constructor(
    private readonly httpClient: HttpClient<IChampionship | IChampionship[]>,
    private readonly path = '/championships',
  ) {}

  async create({
    name,
    startDate,
    endDate,
    accessCode,
    banner,
    resultType,
    address,
    description,
  }: ChampionshipDTO): Promise<IChampionship> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: {
        name,
        startDate,
        endDate,
        accessCode,
        banner,
        resultType,
        address,
        description,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as IChampionship;
      default:
        throw new Error();
    }
  }

  async edit({
    championshipId,
    name,
    startDate,
    endDate,
    accessCode,
    address,
    description,
  }: IChampionshipEditDTO): Promise<IChampionship> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'put',
      url: this.path,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        championshipId,
        name,
        startDate,
        endDate,
        accessCode: accessCode.toUpperCase(),
        address,
        description,
      },
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IChampionship;
      default:
        throw new Error();
    }
  }

  async delete(id: string): Promise<IChampionship> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'delete',
      url: `${this.path}/${id}`,
    });

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return body! as IChampionship;
      default:
        throw new Error();
    }
  }

  async activate(id: string): Promise<IChampionship> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'patch',
      url: `${this.path}/${id}/activate`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IChampionship;
      default:
        throw new Error();
    }
  }

  async deactivate(id: string): Promise<IChampionship> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'patch',
      url: `${this.path}/${id}/deactivate`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IChampionship;
      default:
        throw new Error();
    }
  }

  async listAll(
    limit?: number,
    page?: number,
  ): Promise<IPageResponse<IChampionship> | IChampionship[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: `${this.path}/${limit && page && `?limit=${limit}&page=${page}`}`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<IChampionship> | IChampionship[];
      default:
        throw new Error();
    }
  }
}
