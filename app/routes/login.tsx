import LoginForm from "~/features/auth/components/login-form";

export function meta() {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  return <LoginForm />;
}
