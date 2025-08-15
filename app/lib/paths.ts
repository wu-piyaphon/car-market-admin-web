export const paths = {
  cars: {
    list: {
      owner: "/dashboard/cars/list-owner",
      consignment: "/dashboard/cars/list-consignment",
    },
    create: "/dashboard/cars/create",
    detail: (id: string) => `/dashboard/cars/detail/${id}`,
    edit: (id: string) => `/dashboard/cars/edit/${id}`,
  },
} as const;
