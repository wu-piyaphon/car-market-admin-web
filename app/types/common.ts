export type Pagination<T> = {
  total: number;
  page: number;
  pageSize: number;
  items: T[];
};
