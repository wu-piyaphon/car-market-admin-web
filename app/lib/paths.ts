export const paths = {
  car: {
    list: "/car",
    detail: (id: string) => `/car/${id}`,
    edit: (id: string) => `/car/${id}/edit`,
  },
} as const;
