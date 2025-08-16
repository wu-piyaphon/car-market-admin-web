export type Pagination<T> = {
  total: number;
  page: number;
  pageSize: number;
  items: T[];
};

export type Option = {
  id: string;
  name: string;
};

export type OptionWithImage = Option & {
  image: string;
};
