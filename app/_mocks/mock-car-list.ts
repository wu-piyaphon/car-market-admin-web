import {
  CarEngineType,
  CarTransmission,
} from "~/features/car/constants/car-options";
import type { Car } from "~/features/car/types/car.types";

export const CAR_LIST: Car[] = [
  {
    id: "78d442f1-ac51-4419-8d40-581ca796d8fa",
    brand: {
      id: "f66fa281-4f02-412d-98a4-36190a209c93",
      name: "BMW",
      image:
        "https://good-car-market-ap-southeast-7.s3.ap-southeast-7.amazonaws.com/car-brands/2025-07-28/d1e056ed-00a2-4fc0-b7b8-b610fe63ee32-bmw.png",
    },
    type: {
      id: "342308d7-e988-46fe-be47-e182867b4786",
      name: "SUV",
      image:
        "https://good-car-market-ap-southeast-7.s3.ap-southeast-7.amazonaws.com/car-types/2025-07-28/13e0e4bb-8cb0-41dc-8986-654823f19a55-suv.png",
    },
    transmission: CarTransmission.AUTOMATIC,
    category: null,
    images: [
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
    ],
    model: "W-Model",
    subModel: "MW25",
    modelYear: 2025,
    price: "4000000.00",
    previousLicensePlate: "กข 0001",
    newLicensePlate: "ขค 0001",
    isActive: true,
    color: "RED",
    createdAt: "2025-07-28T12:00:00Z",
    updatedAt: "2025-07-28T12:00:00Z",
    engineCapacity: 500,
    engineType: CarEngineType.DIESEL,
    mileage: 10000,
  },
  {
    id: "18d442f1-ac51-4419-8d40-581ca796d8ft",
    brand: {
      id: "f66fa281-4f02-412d-98a4-36190a209c93",
      name: "BMW",
      image:
        "https://good-car-market-ap-southeast-7.s3.ap-southeast-7.amazonaws.com/car-brands/2025-07-28/d1e056ed-00a2-4fc0-b7b8-b610fe63ee32-bmw.png",
    },
    type: {
      id: "342308d7-e988-46fe-be47-e182867b4786",
      name: "SUV",
      image:
        "https://good-car-market-ap-southeast-7.s3.ap-southeast-7.amazonaws.com/car-types/2025-07-28/13e0e4bb-8cb0-41dc-8986-654823f19a55-suv.png",
    },
    transmission: CarTransmission.AUTOMATIC,
    category: null,
    images: [
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
    ],
    model: "W-Model",
    subModel: "MW25",
    modelYear: 2025,
    price: "4000000.00",
    previousLicensePlate: "กข 0001",
    newLicensePlate: "ขค 0001",
    isActive: true,
    color: "SILVER",
    createdAt: "2025-07-28T12:00:00Z",
    updatedAt: "2025-07-28T12:00:00Z",
    engineCapacity: 250,
    engineType: CarEngineType.ELECTRIC,
    mileage: 10000,
  },
  {
    id: "21d442f1-ac51-4419-8d40-581ca796d8md",
    brand: {
      id: "278659b2-95bb-4d7c-8fe9-2df53c9a0b82",
      name: "Honda",
      image:
        "https://good-car-market-ap-southeast-7.s3.ap-southeast-7.amazonaws.com/car-brands/2025-07-28/42ab8b92-c920-45d3-b3ab-0f7cf380cc9c-honda.png",
    },
    type: {
      id: "342308d7-e988-46fe-be47-e182867b4786",
      name: "SUV",
      image:
        "https://good-car-market-ap-southeast-7.s3.ap-southeast-7.amazonaws.com/car-types/2025-07-28/13e0e4bb-8cb0-41dc-8986-654823f19a55-suv.png",
    },
    transmission: CarTransmission.AUTOMATIC,
    category: null,
    images: [
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
    ],
    model: "W-Model",
    subModel: "MW25",
    modelYear: 2025,
    price: "4000000.00",
    previousLicensePlate: "กข 0001",
    newLicensePlate: "ขค 0001",
    isActive: true,
    color: "SILVER",
    createdAt: "2025-07-28T12:00:00Z",
    updatedAt: "2025-07-28T12:00:00Z",
    engineCapacity: 250,
    engineType: CarEngineType.ELECTRIC,
    mileage: 10000,
  },
  {
    id: "67d442f1-ac51-4419-8d40-581ca796d8bs",
    brand: {
      id: "f66fa281-4f02-412d-98a4-36190a209c93",
      name: "BMW",
      image:
        "https://good-car-market-ap-southeast-7.s3.ap-southeast-7.amazonaws.com/car-brands/2025-07-28/d1e056ed-00a2-4fc0-b7b8-b610fe63ee32-bmw.png",
    },
    type: {
      id: "342308d7-e988-46fe-be47-e182867b4786",
      name: "SUV",
      image:
        "https://good-car-market-ap-southeast-7.s3.ap-southeast-7.amazonaws.com/car-types/2025-07-28/13e0e4bb-8cb0-41dc-8986-654823f19a55-suv.png",
    },
    transmission: CarTransmission.AUTOMATIC,
    category: null,
    images: [
      "https://media.ed.edmunds-media.com/mercedes-benz/s-class/2025/oem/2025_mercedes-benz_s-class_sedan_amg-s-63-e-performance_fq_oem_1_815.jpg",
    ],
    model: "W-Model",
    subModel: "MW25",
    modelYear: 2025,
    price: "4000000.00",
    previousLicensePlate: "กข 0001",
    newLicensePlate: "ขค 0001",
    isActive: true,
    color: "SILVER",
    createdAt: "2025-07-28T12:00:00Z",
    updatedAt: "2025-07-28T12:00:00Z",
    engineCapacity: 250,
    engineType: CarEngineType.ELECTRIC,
    mileage: 10000,
  },
];
