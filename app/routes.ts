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
        index("./routes/car/index.tsx"),
        route(":type/create", "./routes/car/create.tsx"),
        route(":type/edit/:id", "./routes/car/edit.tsx"),
        route(":type/detail/:id", "./routes/car/detail.tsx"),
        route(":type", "./routes/car/list.tsx"),
      ]),
    ]),
  ]),

  // Catch-all route for unknown URLs
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;
