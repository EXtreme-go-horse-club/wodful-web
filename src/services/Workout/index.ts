import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { IWorkout, IWorkoutDTO } from '@/data/interfaces/workout';

export class WorkoutService {
  constructor(
    private readonly httpClient: HttpClient<IPageResponse<IWorkout> | IWorkout[] | IWorkout>,
    private readonly path = '/workouts',
  ) {}

  async create({
    name,
    description,
    workoutType,
    championshipId,
    categoryId,
  }: IWorkoutDTO): Promise<IWorkout> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: { name, description, workoutType, championshipId, categoryId },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as IWorkout;
      default:
        throw new Error();
    }
  }

  async listByChampionship(
    id: string,
    limit?: number,
    page?: number,
  ): Promise<IPageResponse<IWorkout> | IWorkout[]> {
    let url = `championships/${id}${this.path}`;

    if (limit !== undefined && page !== undefined) url = `${url}?limit=${limit}&page=${page}`;

    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<IWorkout> | IWorkout[];
      default:
        throw new Error();
    }
  }

  async listByCategory(
    id: string,
    limit?: number,
    page?: number,
  ): Promise<IPageResponse<IWorkout> | IWorkout[]> {
    let url = `categories/${id}${this.path}`;

    if (limit && page) url = `${url}?limit=${limit}&page=${page}`;

    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<IWorkout> | IWorkout[];
      default:
        throw new Error();
    }
  }

  async delete(id: string): Promise<IWorkout> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'delete',
      url: `${this.path}/${id}`,
    });

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return body! as IWorkout;
      default:
        throw new Error();
    }
  }
}
