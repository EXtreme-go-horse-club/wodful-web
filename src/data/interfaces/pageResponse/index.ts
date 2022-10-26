export interface IPageResponse<T> {
  results: T[];
  previous?: {
    page: number;
    limit: number;
  };
  next?: {
    page: number;
    limit: number;
  };
  count?: number;
}
