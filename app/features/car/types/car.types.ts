import type { Pagination } from "~/types/common";

export type Car = {
  id: string;
  brand: string;
  type: string;
  transmission: string;
  category: string | null;
  thumbnail: string;
  model: string;
  subModel: string;
  modelYear: number;
  price: string;
  previousLicensePlate: string;
  currentLicensePlate: string;
  isActive: boolean;
  slug: string;
};

export type CarPagination = Pagination<Car>;
