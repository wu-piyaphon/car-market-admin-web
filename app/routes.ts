import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
  layout("./components/layout/auth-layout.tsx", [index("./routes/login.tsx")]),
] satisfies RouteConfig;
