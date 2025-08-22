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
    consignment: "/dashboard/request/consignment",
    sell: "/dashboard/request/sell",
    estimate: "/dashboard/request/estimate",
  },
} as const;
