export const paths = {
  cars: {
    owner: {
      list: "/dashboard/cars/owner",
      create: "/dashboard/cars/owner/create",
      detail: (id: string) => `/dashboard/cars/owner/detail/${id}`,
      edit: (id: string) => `/dashboard/cars/owner/edit/${id}`,
    },
    consignment: {
      list: "/dashboard/cars/consignment",
      create: "/dashboard/cars/consignment/create",
      detail: (id: string) => `/dashboard/cars/consignment/detail/${id}`,
      edit: (id: string) => `/dashboard/cars/consignment/edit/${id}`,
    },
  },
} as const;
