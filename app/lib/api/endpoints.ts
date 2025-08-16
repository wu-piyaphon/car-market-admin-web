export const endpoints = {
  auth: {
    login: "/auth/sign-in",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  car: {
    list: "/cars",
    detail: (id: string) => `/cars/${id}`,
    create: "/cars",
    brands: "/car-brands",
    categories: "/car-categories",
    types: "/car-types",
  },
};
