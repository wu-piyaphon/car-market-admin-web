import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/layout/auth-layout.tsx", [index("./routes/login.tsx")]),

  ...prefix("dashboard", [
    layout("./components/layout/dashboard-layout.tsx", [
      ...prefix("cars", [
        ...prefix("owner", [
          index("./routes/owner/car-list.tsx"),
          route("create", "./routes/owner/car-create.tsx"),
          route("detail", "./routes/owner/car-detail.tsx"),
        ]),
        ...prefix("consignment", [
          index("./routes/consignment/car-list.tsx"),
          route("create", "./routes/consignment/car-create.tsx"),
          route("detail", "./routes/consignment/car-detail.tsx"),
        ]),
      ]),
    ]),
  ]),

  // Catch-all route for unknown URLs
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;
