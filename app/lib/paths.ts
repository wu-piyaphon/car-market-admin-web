export const paths = {
  cars: {
    owner: {
      list: "/dashboard/car/owner",
      create: "/dashboard/car/owner/create",
      detail: (id: string) => `/dashboard/car/owner/detail/${id}`,
      edit: (id: string) => `/dashboard/car/owner/edit/${id}`,
    },
    consignment: {
      list: "/dashboard/car/consignment",
      create: "/dashboard/car/consignment/create",
      detail: (id: string) => `/dashboard/car/consignment/detail/${id}`,
      edit: (id: string) => `/dashboard/car/consignment/edit/${id}`,
    },
  },
  requests: {
    selling: {
      owner: "/dashboard/request/selling/owner",
      consignment: "/dashboard/request/selling/consignment",
    },
    estimate: "/dashboard/request/estimate",
  },
} as const;
