export const endpoints = {
  auth: {
    login: "/auth/sign-in",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  car: {
    list: "/cars",
    detail: (id: string) => `/cars/${id}`,
    update: (id: string) => `/cars/${id}`,
    delete: (id: string) => `/cars/${id}`,
    activate: (id: string) => `/cars/${id}/activate`,
    disable: (id: string) => `/cars/${id}/disable`,
    create: "/cars",
    brands: "/car-brands",
    categories: "/car-categories",
    types: "/car-types",
  },
  sellingRequest: {
    list: "/selling-requests",
    update: (id: string) => `/selling-requests/${id}`,
  },
};
