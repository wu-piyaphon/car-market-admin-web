import type { Option, OptionWithImage, Pagination } from "~/types/common";
import type { CarEngineType, CarTransmission } from "../constants/car-options";

export type Car = {
  id: string;
  model: string;
  subModel: string;
  modelYear: number;
  color: string;
  engineType: CarEngineType;
  engineCapacity: number;
  mileage: number | null;
  price: string;
  images: string[];
  previousLicensePlate: string | null;
  newLicensePlate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  brand: OptionWithImage;
  type: OptionWithImage;
  transmission: CarTransmission;
  category: Option | null;
};

export type CarListItem = {
  id: string;
  brand: string;
  type: string;
  transmission: CarTransmission;
  category: string | null;
  thumbnail: string;
  model: string;
  subModel: string;
  modelYear: number;
  price: string;
  previousLicensePlate: string | null;
  newLicensePlate: string;
  isActive: boolean;
  slug: string;
};

export type CarPagination = Pagination<CarListItem>;

export type CarListSearchQuery = {
  keyword?: string;
};

export type CarSalesType = "OWNER" | "CONSIGNMENT";
