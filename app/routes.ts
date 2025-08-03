import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("./auth/layout.tsx", [index("./auth/login.tsx")]),
] satisfies RouteConfig;
