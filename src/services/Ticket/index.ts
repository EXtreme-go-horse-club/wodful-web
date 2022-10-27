import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { ITicket, TicketDTO } from '@/data/interfaces/ticket';

export class TicketService {
  constructor(
    private readonly httpClient: HttpClient<IPageResponse<ITicket> | ITicket[] | ITicket>,
    private readonly path = '/tickets/',
  ) {}

  async create({
    name,
    description,
    startDate,
    endDate,
    price,
    quantity,
    categoryId,
  }: TicketDTO): Promise<ITicket> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: { name, description, startDate, endDate, price, quantity, categoryId },
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as ITicket;
      default:
        throw new Error();
    }
  }

  async listAll(id: string): Promise<IPageResponse<ITicket> | ITicket[]> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url: this.path + id,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<ITicket> | ITicket[];
      default:
        throw new Error();
    }
  }
}
