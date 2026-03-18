import { HttpClient, HttpStatusCode } from '@/data/interfaces/http';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { CouponDTO, ICoupon } from '@/data/interfaces/coupon';

export class CouponService {
  constructor(
    private readonly httpClient: HttpClient<IPageResponse<ICoupon> | ICoupon[]>,
    private readonly path = '/coupons',
  ) {}

  async listByChampionship(
    championshipId: string,
    limit?: number,
    page?: number,
  ): Promise<IPageResponse<ICoupon> | ICoupon[]> {
    let url = `${this.path}/championships/${championshipId}`;
    if (limit != null && page != null) {
      url = `${url}?limit=${limit}&page=${page}`;
    }

    const { statusCode, body } = await this.httpClient.request({
      method: 'get',
      url,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as IPageResponse<ICoupon> | ICoupon[];
      default:
        throw new Error();
    }
  }

  async create(data: CouponDTO): Promise<ICoupon> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
      url: this.path,
      body: data,
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body! as ICoupon;
      default:
        throw new Error();
    }
  }

  async update(id: string, data: Partial<CouponDTO>): Promise<ICoupon> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'put',
      url: `${this.path}/${id}`,
      body: data,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body! as ICoupon;
      default:
        throw new Error();
    }
  }

  async delete(id: string): Promise<void> {
    const { statusCode } = await this.httpClient.request({
      method: 'delete',
      url: `${this.path}/${id}`,
    });

    switch (statusCode) {
      case HttpStatusCode.noContent:
        return;
      default:
        throw new Error();
    }
  }
}

