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
      index("./routes/owner-car-list.tsx"),
    ]),
  ]),

  // Catch-all route for unknown URLs
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;
