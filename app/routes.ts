import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./components/layout/auth-layout.tsx", [index("./routes/login.tsx")]),
  // Catch-all route for unknown URLs
  route("*", "./routes/not-found.tsx"),
] satisfies RouteConfig;
