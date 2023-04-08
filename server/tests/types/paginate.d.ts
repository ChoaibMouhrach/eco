export type Paginate<T> = {
  data: T[];
  limit: number;
  skip: number;
  count: number;
  page: number;
};
