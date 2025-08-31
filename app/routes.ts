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
      ...prefix("car", [
        index("./routes/car/index.tsx"),
        route(":type/create", "./routes/car/create.tsx"),
        route(":type/edit/:id", "./routes/car/edit.tsx"),
        route(":type/detail/:id", "./routes/car/detail.tsx"),
        route(":type", "./routes/car/list.tsx"),
      ]),
      ...prefix("request", [
        route("selling/:type", "./routes/request/selling.tsx"),
        route("estimate", "./routes/request/estimate/list.tsx"),
        route("estimate/:id", "./routes/request/estimate/detail.tsx"),
      ]),
    ]),
  ]),

  // Catch-all route for unknown URLs
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;
