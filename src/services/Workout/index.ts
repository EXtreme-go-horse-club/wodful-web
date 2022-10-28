import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IWorkout, IWorkoutDTO } from '@/data/interfaces/workout';

export class WorkoutService {
  constructor(
    private readonly httpClient: HttpClient<IWorkout[] | IWorkout>,
    private readonly path = '/workouts/',
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

  async listByChampionship(id: string): Promise<IWorkout[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: `championships/${id}/workouts`,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IWorkout[];
      default:
        throw new Error();
    }
  }
}
